import type { Metadata, Viewport } from "next"
import Head from 'next/head'
import { Inter } from "next/font/google"
import './global2.css'
//-----------redux----------------
import StoreProvider from "@/store/StoreProvider"


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Фортуна",
  description: "Create by ALex Romanov-falokfy"
  
};

// export const viewport: Viewport = {
//   initialScale: 1,
//   width: 'device-width'
// }

export default function RootLayout({
  
  children,
  
}: Readonly<{
  data:any,
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en">
      <Head>
        
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href='/favicon.ico'/>
      </Head>
      <StoreProvider>
      <body className={inter.className}>
        {children}
        
      </body>
      </StoreProvider>
    </html>
    
    
  );
}
