import React from 'react';

interface JsonLdProps<T extends object> {
  schema: T;
}

/**
 * Drop-in JSON-LD script tag. Use with Schema.org objects (Article, Product, BreadcrumbList, FAQPage, etc.)
 * Example:
 * <JsonLd schema={{ "@context": "https://schema.org", "@type": "Organization", name: "Toutefois" }} />
 */
export default function JsonLd<T extends object>({ schema }: JsonLdProps<T>) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
