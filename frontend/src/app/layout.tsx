import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "YesYouCan Cyber Secure — GRC & Sustainability MIS",
  description: "Enterprise-grade Governance, Risk, Compliance & ESG Intelligence Platform",
  keywords: "GRC, ESG, Cybersecurity, Sustainability, Risk Management, Compliance",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} dark`}>
      <body>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#0a0a0a",
              color: "#F0F4FF",
              border: "1px solid rgba(255,255,255,0.08)",
              fontFamily: "var(--font-body)",
              fontSize: "14px",
              borderRadius: "8px",
            },
            success: { iconTheme: { primary: "#10b981", secondary: "#000000" } },
            error: { iconTheme: { primary: "#f87171", secondary: "#000000" } },
          }}
        />
      </body>
    </html>
  );
}
