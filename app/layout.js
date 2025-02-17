import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hugot mo to",
  description: "Generated by create next app",
};

import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner";

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChangey
          >
            <Toaster richColors duration={1500} position="bottom-left" />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}

