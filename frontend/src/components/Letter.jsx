import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import Reveal, { Eyebrow } from "./Reveal";
import { chime, pop } from "@/lib/sounds";

const paragraphs = [
  "Talvez seja meio inesperado receber um site assim, mas achei que seria uma forma diferente de demonstrar que gosto de conhecer você.",
  "Fui juntando algumas coisas que você gosta e pensei: por que não transformar tudo isso em um pequeno universo só seu?",
  "Não sei exatamente onde nossas conversas vão nos levar, mas sei que estou gostando de descobrir mais sobre você.",
  "Espero que esse site consiga arrancar pelo menos um sorrisinho seu.",
  "E, se conseguir, já valeu cada detalhe. 💗",
];

export default function Letter() {
  const [opened, setOpened] = useState(false);

  return (
    <section id="carta" className="relative overflow-hidden bg-paper py-24 sm:py-32" data-testid="letter-section">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(251,191,36,0.08),transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-2xl px-6">
        <Reveal className="text-center">
          <Eyebrow>selada com carinho</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Chegou uma carta pra você 💌
          </h2>
        </Reveal>

        <div className="mt-12">
          <AnimatePresence mode="wait">
            {!opened ? (
              <motion.div
                key="envelope"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative mx-auto max-w-md"
              >
                <div className="rounded-3xl border-2 border-candy-deep/20 bg-candy-pale p-8 pb-12 shadow-card">
                  <div className="mx-auto flex h-56 w-full max-w-xs flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-candy-soft bg-paper">
                    <p className="font-hand text-3xl font-semibold text-ink">pra você,</p>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-candy-deep">
                      remetente: seu fã de conversas
                    </p>
                  </div>
                </div>
                <motion.button
                  data-testid="letter-envelope-toggle"
                  onClick={() => {
                    chime();
                    setOpened(true);
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Abrir a carta"
                  className="animate-pulse-ring absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-candy-deep text-white shadow-glow"
                >
                  <Heart className="h-7 w-7 fill-current" />
                </motion.button>
                <p className="mt-5 text-center font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-ink/50">
                  clique no selo para abrir
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="letter"
                initial={{ opacity: 0, y: 50, rotate: -3, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, rotate: -1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-3xl border border-ink/10 bg-cream p-8 shadow-card sm:p-12"
              >
                <div className="absolute left-1/2 top-0 h-8 w-28 -translate-x-1/2 -translate-y-1/2 rotate-2 rounded bg-candy-soft/70" />
                <p className="font-hand text-4xl font-bold leading-none text-ink sm:text-5xl">
                  Ei, você!
                </p>
                {paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="mt-6 font-hand text-2xl font-semibold leading-snug text-ink/90 sm:text-[1.7rem]"
                  >
                    {p}
                  </p>
                ))}
                <div className="mt-8 flex items-center justify-between">
                  <p className="font-hand text-2xl font-semibold text-candy-deep">— eu 💗</p>
                  <button
                    data-testid="letter-fold-back-button"
                    onClick={() => {
                      pop();
                      setOpened(false);
                    }}
                    className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-ink/40 underline underline-offset-4 transition hover:text-candy-deep"
                  >
                    dobrar e guardar
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
