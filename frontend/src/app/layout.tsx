import type { Metadata } from "next";
import { Inter, DM_Mono } from "next/font/google";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";

import ThemeRegistry from "../components/ThemeRegistry";

// Inter — all weights for both display and body (Kudi-style unified font)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "YesYouCan Cyber Secure — GRC & Sustainability MIS",
  description: "Enterprise-grade Governance, Risk, Compliance & ESG Intelligence Platform",
  keywords: "GRC, ESG, Cybersecurity, Sustainability, Risk Management, Compliance",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${dmMono.variable}`}>
      <body style={{ fontFamily: "var(--font-display)" }}>
        <ThemeRegistry>
          {children}
        </ThemeRegistry>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#0a0a0a",
              color: "#FFFFFF",
              border: "1px solid rgba(255,255,255,0.08)",
              fontFamily: "var(--font-display)",
              fontSize: "13px",
              borderRadius: "8px",
            },
            success: { iconTheme: { primary: "#22c55e", secondary: "#000000" } },
            error:   { iconTheme: { primary: "#ef4444", secondary: "#000000" } },
          }}
        />
      </body>
    </html>
  );
}
