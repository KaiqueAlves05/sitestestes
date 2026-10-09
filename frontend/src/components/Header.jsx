import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { setMuted, onMuteChange, pop } from "@/lib/sounds";
import { scrollToSection } from "@/lib/scroll";
import { Bow } from "./Art";

const links = [
  { id: "multiverso", label: "multiverso" },
  { id: "kitty", label: "hello kitty" },
  { id: "caso", label: "o caso" },
  { id: "gatinhos", label: "gatinhos" },
  { id: "carta", label: "carta" },
];

export default function Header() {
  const [muted, setM] = useState(false);
  useEffect(() => onMuteChange(setM), []);

  return (
    <header className="fixed inset-x-0 top-3 z-40 flex justify-center px-4">
      <div className="flex w-full max-w-3xl items-center justify-between gap-3 rounded-full border border-candy/25 bg-cosmic-night/70 py-2 pl-4 pr-2 shadow-[0_8px_32px_rgba(236,72,153,0.18)] backdrop-blur-xl">
        <button
          data-testid="header-logo"
          onClick={() => {
            pop();
            if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.4 });
            else window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2"
        >
          <Bow className="h-6 w-8" />
          <span className="font-display text-lg font-semibold tracking-tight text-candy-pale">
            mundinho
          </span>
        </button>

        <nav className="hidden items-center gap-5 md:flex">
          {links.map((l) => (
            <button
              key={l.id}
              data-testid={`header-link-${l.id}`}
              onClick={() => {
                pop();
                scrollToSection(l.id);
              }}
              className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-candy-pale/70 transition-colors hover:text-candy-soft"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <button
          data-testid="audio-toggle-button"
          onClick={() => {
            const v = !muted;
            setM(v);
            setMuted(v);
            if (!v) pop();
          }}
          aria-label={muted ? "Ativar sons fofos" : "Silenciar sons"}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-candy/25 text-candy-pale transition hover:bg-candy/45"
        >
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>
      </div>
    </header>
  );
}
