export default function Head() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL || 'https://admin.toutefois.arianeguay.ca/wp-json';
  const adminHost = (() => {
    try {
      const u = new URL(adminUrl);
      return `${u.protocol}//${u.hostname}`;
    } catch {
      return 'https://admin.toutefois.arianeguay.ca';
    }
  })();

  return (
    <>
      {/* Preconnect to the image origin to speed up LCP image fetches */}
      <link rel="preconnect" href={adminHost} crossOrigin="anonymous" />
      <link rel="dns-prefetch" href={adminHost} />

      {/* If external webfont is kept, preconnect to reduce handshake time */}
      <link rel="preconnect" href="https://db.onlinewebfonts.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://db.onlinewebfonts.com" />

      {/* Preload local Special Elite font to reduce critical path delay */}
      <link
        rel="preload"
        href="/fonts/SpecialElite.ttf"
        as="font"
        type="font/ttf"
        crossOrigin="anonymous"
      />
    </>
  );
}
