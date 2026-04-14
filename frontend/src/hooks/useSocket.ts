"use client";
import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import useAuthStore from "../store/authStore";

let socket: Socket | null = null;

export function useSocket() {
  const { tenant, isAuthenticated } = useAuthStore();
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!isAuthenticated || !tenant) return;

    if (!socket) {
      socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000", {
        transports: ["websocket"],
        autoConnect: true,
      });
    }

    socketRef.current = socket;

    socket.on("connect", () => {
      socket?.emit("join-tenant", tenant._id);
    });

    if (socket.connected) {
      socket.emit("join-tenant", tenant._id);
    }

    return () => {
      // Don't disconnect on unmount — keep persistent connection
    };
  }, [isAuthenticated, tenant]);

  return socketRef.current;
}

export function getSocket() {
  return socket;
}
