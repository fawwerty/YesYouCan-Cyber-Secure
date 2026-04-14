import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../lib/api";

interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  avatar?: string;
  department?: string;
  tenant_id: any;
}

interface Tenant {
  _id: string;
  name: string;
  slug: string;
  industry: string;
  settings: any;
}

interface AuthState {
  user: User | null;
  tenant: Tenant | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
  setTokens: (access: string, refresh: string) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      tenant: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const { data } = await api.post("/auth/login", { email, password });
          const { user, tenant, accessToken, refreshToken } = data.data;
          set({ user, tenant, accessToken, refreshToken, isAuthenticated: true, isLoading: false });
          api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        } catch (err: any) {
          set({ isLoading: false });
          throw err;
        }
      },

      register: async (formData) => {
        set({ isLoading: true });
        try {
          const { data } = await api.post("/auth/register", formData);
          const { user, tenant, accessToken, refreshToken } = data.data;
          set({ user, tenant, accessToken, refreshToken, isAuthenticated: true, isLoading: false });
          api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        } catch (err: any) {
          set({ isLoading: false });
          throw err;
        }
      },

      logout: async () => {
        try {
          const { refreshToken } = get();
          await api.post("/auth/logout", { refreshToken });
        } catch {}
        delete api.defaults.headers.common["Authorization"];
        set({ user: null, tenant: null, accessToken: null, refreshToken: null, isAuthenticated: false });
      },

      refreshAuth: async () => {
        const { refreshToken } = get();
        if (!refreshToken) throw new Error("No refresh token");
        const { data } = await api.post("/auth/refresh", { refreshToken });
        const { accessToken, refreshToken: newRefresh } = data.data;
        set({ accessToken, refreshToken: newRefresh });
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      },

      setTokens: (accessToken, refreshToken) => {
        set({ accessToken, refreshToken });
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      },
    }),
    {
      name: "yyc-auth",
      partialize: (state) => ({
        user: state.user,
        tenant: state.tenant,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
