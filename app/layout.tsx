"use client";
import "./globals.css";
import { M_PLUS_1 } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { Provider } from "react-redux";
import store from "@/store";

const m_plus = M_PLUS_1({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Sistema de Comandas</title>
      </head>
      <body className={`${m_plus.className} antialiased bg-bgPages text-white`}>
        <Provider store={store}>
          <main>{children}</main>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
