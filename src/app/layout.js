
import { Playfair_Display, Cinzel, DM_Mono } from "next/font/google";
import { ThemeProvider } from "./themeProvider"; 
import "./globals.css";

const playfair = Playfair_Display({
  subsets:  ["latin"],
  weight:   ["700"],
  variable: "--font-playfair",
  display:  "swap",
});

const cinzel = Cinzel({
  subsets:  ["latin"],
  weight:   ["700"],
  variable: "--font-cinzel",
  display:  "swap",
});

const dmMono = DM_Mono({
  subsets:  ["latin"],
  weight:   ["400", "500"],
  style:    ["normal", "italic"],
  variable: "--font-dm-mono",
  display:  "swap",
});

export const metadata = {
  title: "Portfolio",
  description: "My portfolio",
};

export default function RootLayout({
  children,
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cinzel.variable} ${dmMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}