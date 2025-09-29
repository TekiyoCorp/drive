import Providers from "@/components/global/providers";
import { base, heading } from "@/constants/fonts";
import { cn } from "@/lib/utils";
import { generateMetadata } from "@/lib/metadata";
import "@/styles/globals.css";

export const metadata = generateMetadata({
  title: "DRIVE",
  description:
    "Drive - La plateforme de vente et d'achat de véhicules entre particuliers et professionnels",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/images/main/hero.svg"
          as="image"
          type="image/svg+xml"
        />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="//fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-[#181818] text-foreground font-base antialiased dark",
          base.variable,
          heading.variable
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
