import localFont from "next/font/local";

export const inter = localFont({
  src: [
    { path: "../../fonts/InterVariable.woff2", weight: "100 900", style: "normal" },
    {
      path: "../../fonts/InterVariable-Italic.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-inter",
});

export const source = localFont({
  src: [
    {
      path: "../../fonts/SourceSansPro-Regular.ttf.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-source-sans-pro",
});

export const plexMono = localFont({
  src: [
    {
      path: "../../fonts/IBMPlexMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/IBMPlexMono-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../fonts/IBMPlexMono-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../fonts/IBMPlexMono-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../fonts/IBMPlexMono-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../fonts/IBMPlexMono-SemiBoldItalic.woff2",
      weight: "600",
      style: "italic",
    },
  ],
  variable: "--font-plex-mono",
});

export const ubuntuMono = localFont({
  src: [
    {
      path: "../../fonts/Ubuntu-Mono-bold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-ubuntu-mono",
});
