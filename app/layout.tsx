import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Argo — AI-Powered Travel Planning",
  icons: { icon: "/icon.svg" },
  description:
    "Paste any link from TikTok, YouTube, or a travel blog. Argo's AI extracts every location, organizes them into collections, and builds your itinerary automatically.",
  openGraph: {
    title: "Argo — AI-Powered Travel Planning",
    description:
      "Paste any link from TikTok, YouTube, or a travel blog. Argo's AI extracts every location and builds your itinerary automatically.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("argo-theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme:dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
