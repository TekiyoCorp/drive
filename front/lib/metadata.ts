import { Metadata } from "next";

export const generateMetadata = ({
  title = `${process.env.NEXT_PUBLIC_APP_NAME} `,
  description = ``,
  icons = [
    {
      rel: "apple-touch-icon",
      sizes: "32x32",
      url: "/logo-small.svg",
    },
    {
      rel: "icon",
      sizes: "32x32",
      url: "/logo-small.svg",
    },
  ],
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
