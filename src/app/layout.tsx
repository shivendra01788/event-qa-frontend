import './globals.css';

export const metadata = {
  title: 'Live Event Console',
  description: 'Professional event moderation system.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-50 text-slate-900 min-h-screen font-sans selection:bg-blue-200">
        {children}
      </body>
    </html>
  );
}