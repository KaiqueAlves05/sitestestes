import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal, { Eyebrow } from "./Reveal";
import Starfield from "./Starfield";
import { Sparkle } from "./Art";
import { whoosh, pop } from "@/lib/sounds";
import { scrollToSection } from "@/lib/scroll";

export default function RickSection() {
  const [jumping, setJumping] = useState(false);

  const explore = () => {
    if (jumping) return;
    whoosh();
    setJumping(true);
    setTimeout(() => scrollToSection("kitty"), 850);
    setTimeout(() => setJumping(false), 1550);
  };

  return (
    <section id="multiverso" className="relative overflow-hidden bg-cosmic py-24 sm:py-32" data-testid="multiverse-section">
      <Starfield density={70} colors={["#6EE7B7", "#FBBF24", "#F9A8C9", "#ffffff"]} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_60%,rgba(16,185,129,0.14),transparent_55%)]" />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2">
        <Reveal>
          <Eyebrow tone="text-portal">multiverso de possibilidades</Eyebrow>
          <p className="mt-7 font-display text-2xl font-medium leading-snug text-candy-pale sm:text-3xl lg:text-4xl">
            Em um multiverso cheio de possibilidades, achei bem interessante que{" "}
            <span className="relative text-portal">
              justo nesse universo
              <svg viewBox="0 0 300 14" className="absolute -bottom-2 left-0 h-3 w-full" fill="none" preserveAspectRatio="none">
                <path d="M3 10 C 80 3, 220 3, 297 8" stroke="#10B981" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
              </svg>
            </span>{" "}
            eu tive a sorte de conhecer você.
          </p>
          <p className="mt-6 max-w-md text-base leading-relaxed text-candy-pale/70">
            Entre infinitas dimensões, infinitas versões de tudo... e ainda assim, foi nesta que
            nossas conversas aconteceram. Estatisticamente incrível. Pessoalmente, meu favorito.
          </p>
          <motion.button
            data-testid="multiverse-portal-button"
            onClick={explore}
            whileHover={{ scale: 1.05, rotate: 1 }}
            whileTap={{ scale: 0.95 }}
            className="mt-9 rounded-full bg-portal px-8 py-4 font-display text-lg font-semibold text-cosmic shadow-[0_10px_36px_rgba(16,185,129,0.4)] transition-colors hover:bg-[#34D399]"
          >
            Explorar outra dimensão 🪐
          </motion.button>
        </Reveal>

        <Reveal delay={0.15} className="relative mx-auto h-72 w-72 sm:h-96 sm:w-96 lg:h-[420px] lg:w-[420px]">
          <div className="absolute inset-0 rounded-full bg-portal/25 blur-3xl" />
          <div
            className="animate-spin-slow absolute inset-0 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, rgba(16,185,129,0.9), rgba(6,78,59,0.2), rgba(110,231,183,0.9), rgba(6,78,59,0.2), rgba(16,185,129,0.9))",
              mask: "radial-gradient(circle, transparent 34%, black 36%, black 98%, transparent 100%)",
              WebkitMask:
                "radial-gradient(circle, transparent 34%, black 36%, black 98%, transparent 100%)",
            }}
          />
          <div className="absolute inset-[26%] rounded-full border-2 border-dashed border-portal/50" />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[13%]"
          >
            <Sparkle className="absolute left-1/2 top-0 h-6 w-6 -translate-x-1/2" fill="#6EE7B7" />
            <Sparkle className="absolute bottom-0 right-4 h-4 w-4" />
          </motion.div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-0 top-2"
          >
            <div className="relative h-12 w-12 rounded-full bg-gold">
              <div className="absolute left-1/2 top-1/2 h-3 w-20 -translate-x-1/2 -translate-y-1/2 -rotate-12 rounded-[100%] border-2 border-gold/70" />
            </div>
          </motion.div>
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="max-w-[45%] text-center font-mono text-[10px] font-bold uppercase leading-relaxed tracking-[0.2em] text-portal/90">
              dimensão C-137-ish · habitantes: nós dois
            </p>
          </div>
        </Reveal>
      </div>

      <AnimatePresence>
        {jumping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 grid place-items-center bg-cosmic/85 backdrop-blur-sm"
            data-testid="portal-transition-overlay"
          >
            <motion.div
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: [0, 3.4], rotate: 220, opacity: [1, 1, 0] }}
              transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1], times: [0, 0.7, 1] }}
              className="h-64 w-64 rounded-full"
              style={{
                background:
                  "conic-gradient(#10B981, #064E3B, #6EE7B7, #065F46, #10B981)",
              }}
            >
              <div className="m-[18%] h-[64%] w-[64%] rounded-full bg-cosmic" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
