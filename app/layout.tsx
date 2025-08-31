import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Умный Todo List',
  description: 'Todo List с серверным рендерингом и клиентским стейтом',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}