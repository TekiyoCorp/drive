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
        {/* DNS prefetch only for origins we actually use */}
        <link rel="dns-prefetch" href="//localhost:3000" />

        {/* Preconnect only to origins that are actually used */}
        <link rel="preconnect" href="/" crossOrigin="" />

        {/* Preconnect to OpenStreetMap tile servers with proper optimization */}
        <link
          rel="preconnect"
          href="https://a.tile.openstreetmap.org"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://b.tile.openstreetmap.org"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://c.tile.openstreetmap.org"
          crossOrigin="anonymous"
        />

        {/* Add resource hints for better caching */}
        <meta
          httpEquiv="Cache-Control"
          content="public, max-age=31536000, immutable"
        />
        <meta name="format-detection" content="telephone=no" />

        {/* Resource hints for better caching */}
        <meta name="theme-color" content="#181818" />
        <meta name="color-scheme" content="dark" />

        {/* Critical viewport and charset */}
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />

        {/* Inline critical CSS to eliminate render-blocking */}
        <style
          data-critical="true"
          dangerouslySetInnerHTML={{
            __html: `
            /* Critical above-the-fold styles only - Optimized for LCP */
            *,*::before,*::after { box-sizing: border-box; }
            html { 
              -webkit-text-size-adjust: 100%; 
              font-feature-settings: 'kern' 1;
              text-rendering: optimizeLegibility;
              tab-size: 4;
            }
            body { 
              margin: 0; 
              padding: 0;
              background-color: #181818; 
              color: white; 
              font-family: var(--font-base, -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, Roboto, sans-serif);
              line-height: 1.5;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              font-display: swap;
              min-height: 100vh;
            }
            /* Hero container optimization */
            .hero-container { 
              position: relative; 
              width: 100%; 
              height: 100vh; 
              padding: 10px; 
              contain: layout style paint;
              border-radius: 24px;
              overflow: hidden;
            }
            /* Prevent layout shift */
            img, video { 
              max-width: 100%; 
              height: auto;
              font-display: swap;
            }
            [data-loading] { opacity: 0; }
            [data-loaded] { opacity: 1; transition: opacity 0.3s ease; }
            /* Preload critical fonts */
            @font-face {
              font-family: 'InterDisplay';
              font-style: normal;
              font-weight: 400;
              font-display: swap;
              src: url('/fonts/InterDisplay-Regular.ttf') format('truetype');
            }
            @font-face {
              font-family: 'InterDisplay';
              font-style: normal;
              font-weight: 600;
              font-display: swap;
              src: url('/fonts/InterDisplay-SemiBold.ttf') format('truetype');
            }
          `,
          }}
        />

        {/* Non-critical CSS will be loaded by Next.js automatically */}

        {/* Preload critical fonts with proper resource hints */}
        <link
          rel="preload"
          href="/fonts/InterDisplay-Regular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/InterDisplay-SemiBold.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />

        {/* Performance monitoring script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Basic performance monitoring
              window.addEventListener('load', () => {
                if ('performance' in window) {
                  const perfData = performance.getEntriesByType('navigation')[0];
                  if (perfData && perfData.loadEventEnd - perfData.fetchStart > 3000) {
                    console.warn('Slow page load detected:', perfData.loadEventEnd - perfData.fetchStart + 'ms');
                  }
                }
              });
            `,
          }}
        />

        {/* Favicon and manifest */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo.svg" />

        {/* Open Graph tags for social sharing */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="DRIVE" />
        <meta
          property="og:image"
          content="https://drive.example.com/og-image.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="DRIVE - Vente et achat de véhicules"
        />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@drive_official" />
        <meta name="twitter:creator" content="@drive_official" />

        {/* Additional meta tags for SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="language" content="French" />
        <meta name="revisit-after" content="7 days" />
        <meta name="author" content="DRIVE Team" />

        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "DRIVE",
              url: "https://drive.example.com",
              description:
                "Drive - La plateforme de vente et d'achat de véhicules entre particuliers et professionnels",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://drive.example.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* Additional JSON-LD for local business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "DRIVE",
              url: "https://drive.example.com",
              logo: "https://drive.example.com/logo.svg",
              sameAs: [
                "https://www.facebook.com/drive",
                "https://www.twitter.com/drive_official",
                "https://www.linkedin.com/company/drive",
              ],
            }),
          }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          base.variable,
          heading.variable
        )}
      >
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <div className="flex-1">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
