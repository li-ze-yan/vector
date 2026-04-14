import { darkModeScript, inter, plexMono, source, ubuntuMono } from "@/lib";
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
