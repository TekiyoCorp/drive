import WhyDrive from "./why-drive";

export default async function WhyDriveWrapper() {
  let title: string | undefined;
  let items: string[] | undefined;

  try {
    const baseURL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
    const apiToken = process.env.STRAPI_API_TOKEN || process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

    if (!apiToken) {
      throw new Error('Missing Strapi API token');
    }

    const response = await fetch(`${baseURL}/api/why-drive`, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch why-drive: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    const node = result?.data;
    const data = node ? (node.attributes ?? node) : null;

    if (data) {
      title = data.title;

      // Handle items: can be array of strings or JSON string
      if (Array.isArray(data.items)) {
        items = data.items.map((item: any) => 
          typeof item === 'string' ? item : String(item.text || item)
        ).filter(Boolean);
      } else if (typeof data.items === 'string') {
        try {
          const parsed = JSON.parse(data.items);
          items = Array.isArray(parsed) 
            ? parsed.map((item: any) => typeof item === 'string' ? item : String(item.text || item)).filter(Boolean)
            : undefined;
        } catch {
          // If parsing fails, ignore
        }
      }
    }
  } catch (err) {
    console.error('Error fetching why-drive section:', err);
  }

  return (
    <WhyDrive
      title={title}
      items={items}
    />
  );
}

