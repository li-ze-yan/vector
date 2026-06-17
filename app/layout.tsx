import { ThemeProvider } from "@/components";
import { darkModeScript } from "@/lib/client-utils";
import { inter, plexMono, source, ubuntuMono } from "@/lib/constant";
import Script from "next/script";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plexMono.variable} ${source.variable} ${ubuntuMono.variable} antialiased dark:bg-gray-950`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{ __html: darkModeScript }}
        ></script>
        {/*
          We inject the script via the <Script/> tag again, since we found the regular `<script>`
          tag to not execute when rendering a not-found page.
         */}
        <Script src={`data:text/javascript;base64,${btoa(darkModeScript)}`} />
      </head>
      <body>
        <ThemeProvider>
          <div className="isolate">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
