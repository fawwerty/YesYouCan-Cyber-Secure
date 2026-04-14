import type { Metadata } from "next";
import { Syne, JetBrains_Mono } from "next/font/google";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "YesYouCan Cyber Secure — GRC & Sustainability MIS",
  description: "Enterprise-grade Governance, Risk, Compliance & ESG Intelligence Platform",
  keywords: "GRC, ESG, Cybersecurity, Sustainability, Risk Management, Compliance",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${jetbrainsMono.variable} dark`}>
      <body className="noise-overlay">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#1e2a40",
              color: "#F0F4FF",
              border: "1px solid #2a3a54",
              fontFamily: "var(--font-body)",
              fontSize: "14px",
            },
            success: { iconTheme: { primary: "#00FF94", secondary: "#0A0F1E" } },
            error: { iconTheme: { primary: "#f87171", secondary: "#0A0F1E" } },
          }}
        />
      </body>
    </html>
  );
}
