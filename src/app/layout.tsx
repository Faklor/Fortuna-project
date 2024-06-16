import type { Metadata } from "next"
import { Inter } from "next/font/google"
import './global2.css'
//-----------redux----------------
import StoreProvider from "@/store/StoreProvider"



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en">
      <StoreProvider>
      <body className={inter.className}>
        {children}
      </body>
      </StoreProvider>
    </html>
    
    
  );
}
