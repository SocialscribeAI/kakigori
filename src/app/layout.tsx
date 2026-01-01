import type { Metadata } from 'next';
import './globals.css';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Kakigōri | Premium Japanese Shaved Ice Catering in Israel',
  description: 'Elevate your event with an unforgettable Japanese dessert experience. Authentic Kakigōri catering for weddings, bar mitzvahs, and corporate events in Israel.',
  keywords: ['kakigori', 'shaved ice', 'catering', 'Israel', 'events', 'wedding dessert', 'bar mitzvah', 'corporate catering'],
  openGraph: {
    title: 'Kakigōri | Premium Japanese Shaved Ice Catering',
    description: 'Elevate your event with an unforgettable Japanese dessert experience.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Navigation />
        <main className="relative">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
