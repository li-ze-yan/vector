import { Header, ThemeToggle } from "@/components";

export default function Home() {
  return (
    <div className="max-w-screen overflow-x-hidden">
      <div className="fixed inset-x-0 top-0 z-10 border-b border-black/5 dark:border-white/10">
        <Header />
      </div>
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-5xl font-extrabold italic">Vector Lab</h1>
          <p className="text-2xl font-sans">Inter (font-sans)</p>
          <p className="text-2xl font-source">Source Sans Pro (font-source)</p>
          <p className="text-2xl font-mono">IBM Plex Mono (font-mono)</p>
          <p className="text-2xl" style={{ fontFamily: "var(--font-ubuntu-mono)" }}>
            Ubuntu Mono
          </p>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
