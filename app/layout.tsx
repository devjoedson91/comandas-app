"use client";
import "./globals.css";
import { M_PLUS_1 } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/hooks/cart";
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
        <title>Sistema de Tickets</title>
      </head>
      <body className={`${m_plus.className} antialiased bg-bgPages text-white`}>
        <Provider store={store}>
          <CartProvider>
            <main>{children}</main>
            <Toaster />
          </CartProvider>
        </Provider>
      </body>
    </html>
  );
}
