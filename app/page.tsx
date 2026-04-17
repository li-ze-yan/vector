import { ThemeToggle } from "@/components";

export default function Home() {
  return (
    <div className="w-screen h-screen bg-white/50 dark:bg-black/50 flex flex-col justify-center items-center gap-4 font-sans">
      <h1 className="text-5xl font-extrabold italic">Vector Lab</h1>
      <p className="text-2xl font-sans">Inter (font-sans)</p>
      <p className="text-2xl font-source">Source Sans Pro (font-source)</p>
      <p className="text-2xl font-mono">IBM Plex Mono (font-mono)</p>
      <p className="text-2xl" style={{ fontFamily: "var(--font-ubuntu-mono)" }}>
        Ubuntu Mono
      </p>
      <ThemeToggle />
    </div>
  );
}
