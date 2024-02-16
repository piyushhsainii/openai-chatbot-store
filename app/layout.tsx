import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CHAT from "./Chat/page";
import { ThemeProvider } from "./theme-provider";
import Provider from "@/components/ui/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Modern Book Store",
  description: "Modern Book Store with OPEN AI Chatbot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <CHAT />
            {children}
          </ThemeProvider>
        </body>
      </Provider>
    </html>
  );
}
