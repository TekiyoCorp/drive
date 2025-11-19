import KeyFigures from "./key-figures";

export default async function KeyFiguresWrapper() {
  let title: string | undefined;
  let keyFigures: Array<{ number: string; description: string }>| undefined;
  let benefits: Array<{ title: string; description: string }>| undefined;

  try {
    const baseURL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
    const apiToken = process.env.STRAPI_API_TOKEN || process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

    if (!apiToken) {
      throw new Error('Missing Strapi API token');
    }

    const response = await fetch(`${baseURL}/api/key-figures`, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch key-figures: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    const node = result?.data;
    const data = node ? (node.attributes ?? node) : null;

    if (data) {
      // Flexible mapping: accept either arrays of objects or JSON strings
      title = data.title;

      const parsedKeyFigures = Array.isArray(data.keyFigures)
        ? data.keyFigures
        : (typeof data.keyFigures === 'string' ? JSON.parse(data.keyFigures) : undefined);

      const parsedBenefits = Array.isArray(data.benefits)
        ? data.benefits
        : (typeof data.benefits === 'string' ? JSON.parse(data.benefits) : undefined);

      interface KeyFigureItem {
        number?: string | number;
        description?: string;
      }

      interface BenefitItem {
        title?: string;
        description?: string;
      }

      keyFigures = parsedKeyFigures?.map((item: KeyFigureItem) => ({
        number: String(item.number ?? ''),
        description: String(item.description ?? ''),
      })).filter((i: { number: string; description: string }): i is { number: string; description: string } => Boolean(i.number || i.description));

      benefits = parsedBenefits?.map((item: BenefitItem) => ({
        title: String(item.title ?? ''),
        description: String(item.description ?? ''),
      })).filter((i: { title: string; description: string }): i is { title: string; description: string } => Boolean(i.title || i.description));
    }
  } catch (err) {
    console.error('Error fetching key-figures section:', err);
  }

  return (
    <KeyFigures
      title={title}
      keyFigures={keyFigures}
      benefits={benefits}
    />
  );
}



