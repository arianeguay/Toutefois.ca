import Footer from '@/layout/Footer';
import Header from '@/layout/Header';

export default function NotFound() {
  return (
    <>
      <Header />
      <div
        className="flex flex-col items-center justify-center min-h-screen py-12 px-4"
        style={{
          height: 'calc(100vh - 100px)',
          paddingBlock: 40,
          paddingInline: 40,
        }}
      >
        <h1 className="text-4xl font-bold mb-4">Page non trouvée</h1>
        <p className="mb-8 text-center">
          La page que vous cherchez n&apos;existe pas ou a été déplacée.
        </p>
        <a
          href="/"
          className="px-6 py-3 rounded-md bg-primary text-white hover:bg-primary/80 transition-colors"
        >
          Retour à l&apos;accueil
        </a>
      </div>
      <Footer />{' '}
    </>
  );
}
