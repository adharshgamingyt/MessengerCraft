import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { Poppins, Ubuntu } from "next/font/google";

import "./globals.css";
import { siteConfig } from "@/config/siteconfig";

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
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: [{ url: "/logo.ico", href: "/logo.ico" }],
  authors: [
    {
      name: "Adharsh",
      url: "https://github.com/adharshgamingyt",
    },
  ],
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ubuntu.variable} ${ubuntu.className} ${poppins.variable} ${poppins.className} font-poppins bg-primary-background antialiased`}
      >
        <NextTopLoader color="#00A86B" />
        {children}
      </body>
    </html>
  );
}
