// app/layout.tsx یا RootLayout.tsx
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css'; // حتما اضافه شود
import '@fontsource/vazirmatn';
import { MantineProvider, ColorSchemeScript, mantineHtmlProps } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { theme } from '../theme';

export const metadata = {
  title: 'Mantine Next.js template',
  description: 'I am using Mantine with Next.js!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme} >
          <ModalsProvider>
            <Notifications /> {/* این خط مهمه */}
            {children}
          </ModalsProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
