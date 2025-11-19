import { Metadata } from "next";

export const generateMetadata = ({
  title = `${process.env.NEXT_PUBLIC_APP_NAME} `,
  description = ``,
  icons = {
    icon: [{ url: "/favicon.png", sizes: "40x40", type: "image/png" }],
    apple: [{ url: "/favicon.png", sizes: "180x180", type: "image/png" }],
  },
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string | null;
  icons?: Metadata["icons"];
  noIndex?: boolean;
} = {}): Metadata => ({
  title,
  description,
  icons,
  ...(noIndex && { robots: { index: false, follow: false } }),
});
