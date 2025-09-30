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
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/images/main/hero.svg"
          as="image"
          type="image/svg+xml"
        />
        {/* Preconnect to OpenStreetMap origins for map tiles */}
        <link rel="preconnect" href="https://openstreetmap.org" />
        <link rel="preconnect" href="https://a.tile.openstreetmap.org" />
        <link rel="preconnect" href="https://b.tile.openstreetmap.org" />
        <link rel="preconnect" href="https://c.tile.openstreetmap.org" />
        <link rel="preconnect" href="https://nominatim.openstreetmap.org" />
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
