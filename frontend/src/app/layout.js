import { Inter } from 'next/font/google';
import './globals.css';
const inter = Inter({ subsets: ['latin'] });
import { MantineProvider } from '@mantine/core';

export const metadata = {
  title: 'BE PROJECT 2023',
  description: 'Group ID 2 : AI Chatbot',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
