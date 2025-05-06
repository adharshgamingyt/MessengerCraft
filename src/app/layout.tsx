import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { Poppins, Ubuntu } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";

import "./globals.css";
import { siteConfig } from "@/src/config/siteconfig";
import type { layout } from "@/src/types/types";
import { auth } from "@/auth";
import { Loader } from "@/src/components/my ui/global/loader";
import { Toaster } from "@/src/components/ui/sonner";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-Poppins",
});

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-Ubuntu",
});

export const metadata: Metadata = {
  // Todo: Update the informations
  title: {
    default: siteConfig.name,
    template: `%s ︱ ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: [{ url: "/logo-no-bg.png", href: "/logo-no-bg.png" }],
  authors: [
    {
      name: "Adharsh",
      url: "https://github.com/adharshgamingyt",
    },
  ],
};
export default async function RootLayout({ children }: layout) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body
          className={`${ubuntu.variable} ${ubuntu.className} ${poppins.variable} ${poppins.className} font-poppins from-p1 to-p2 bg-radial antialiased`}
        >
          <NextTopLoader color="#1b1a55" />
          <Suspense fallback={<Loader />}>
            {children}
            <Toaster richColors />
          </Suspense>
        </body>
      </html>
    </SessionProvider>
  );
}
