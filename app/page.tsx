"use client";

import { DotGrid, Header, ThemeContext } from "@/components";
import { Theme } from "@/components/ThemeToggle/type";
import { useContext, useEffect, useState, useSyncExternalStore } from "react";

const darkMQ = "(prefers-color-scheme: dark)";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(darkMQ);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const getSnapshot = () => window.matchMedia(darkMQ).matches;
const getServerSnapshot = () => true;

export default function Home() {
  const { theme } = useContext(ThemeContext);
  const systemIsDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [nowTheme, setNowTheme] = useState<Theme>();

  useEffect(() => {
    const handleChangeTheme = () => {
      setNowTheme(theme === "system" ? (systemIsDark ? "dark" : "light") : theme);
    };

    handleChangeTheme();
  }, [theme, systemIsDark]);

  return (
    <div className="max-w-screen overflow-x-hidden">
      <div className="fixed inset-x-0 top-0 z-10 border-b border-black/5 dark:border-white/10">
        <Header />
      </div>
      <div className="flex justify-center items-center h-screen relative z-0">
        <div className="flex flex-col items-center gap-2">
          <h1
            className="text-5xl xl:text-9xl font-extrabold italic"
            style={{ fontFamily: "var(--font-ubuntu-mono)" }}
          >
            Vector Lab
          </h1>
          {/* <p className="text-2xl font-sans">Inter (font-sans)</p>
          <p className="text-2xl font-source">Source Sans Pro (font-source)</p>
          <p className="text-2xl font-mono">IBM Plex Mono (font-mono)</p>
          <p className="text-2xl" style={{ fontFamily: "var(--font-ubuntu-mono)" }}>
            Ubuntu Mono
          </p> */}
        </div>
        <div className="absolute -z-10 inset-0">
          <DotGrid
            dotSize={5}
            gap={28}
            baseColor={nowTheme === "dark" ? "#2F293A" : "#ccc"}
            activeColor="#BC1013"
            proximity={120}
            shockRadius={250}
            shockStrength={5}
            resistance={750}
            returnDuration={1.5}
          />
        </div>
      </div>
    </div>
  );
}
