import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Reveal, { Eyebrow } from "./Reveal";
import { pop, flip, chime } from "@/lib/sounds";

const SCAN = [
  "> abrindo dossiê do caso nº 0231...",
  "> variáveis detectadas: sorriso, jeitinho, presença...",
  "> consultando registros do multiverso...",
  "> cruzando todas as dimensões possíveis...",
];

export default function DexterSection() {
  const [stage, setStage] = useState("idle");
  const [lineIdx, setLineIdx] = useState(0);

  useEffect(() => {
    if (stage !== "scan") return;
    if (lineIdx < SCAN.length) {
      const t = setTimeout(() => {
        setLineIdx((i) => i + 1);
        flip();
      }, 800);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setStage("done");
      chime();
    }, 650);
    return () => clearTimeout(t);
  }, [stage, lineIdx]);

  const investigate = () => {
    pop();
    setLineIdx(0);
    setStage("scan");
  };

  return (
    <section id="caso" className="relative overflow-hidden bg-cosmic-night py-24 sm:py-32" data-testid="dexter-section">
      <div className="grid-lab absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(16,185,129,0.12),transparent_55%)]" />

      <div className="relative z-10 mx-auto max-w-3xl px-6">
        <Reveal className="text-center">
          <Eyebrow tone="text-portal">laboratório do dexter · acesso liberado</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-candy-pale sm:text-4xl lg:text-5xl">
            Temos um caso para investigar... 🔎
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-12 overflow-hidden rounded-3xl border border-portal/30 bg-cosmic/80 shadow-[0_0_60px_rgba(16,185,129,0.12)] backdrop-blur">
            <div className="flex items-center gap-2 border-b border-portal/20 bg-cosmic/60 px-5 py-3">
              <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
              <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
              <span className="h-3 w-3 rounded-full bg-[#28C840]" />
              <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.25em] text-portal/70">
                dexterLab.exe — análise de evidências
              </span>
            </div>

            <div className="min-h-[300px] p-6 sm:p-10">
              <p className="font-hand text-3xl font-semibold text-candy-soft sm:text-4xl">
                Por que será que você chamou tanto minha atenção?
              </p>

              {stage === "idle" && (
                <motion.button
                  key="investigate"
                  data-testid="dexter-investigate-button"
                  onClick={investigate}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-8 rounded-full bg-portal px-7 py-3.5 font-display text-base font-semibold text-cosmic shadow-[0_10px_30px_rgba(16,185,129,0.35)] transition-colors hover:bg-[#34D399]"
                >
                  Investigar 🔎
                </motion.button>
              )}

              {stage === "scan" && (
                <div className="mt-8 space-y-3" data-testid="dexter-scanning-container">
                  {SCAN.slice(0, lineIdx).map((l, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="font-mono text-xs text-portal/90 sm:text-sm"
                    >
                      {l}
                    </motion.p>
                  ))}
                  <div className="h-2 w-full max-w-sm overflow-hidden rounded-full bg-portal/15">
                    <motion.div
                      className="h-full rounded-full bg-portal"
                      animate={{ width: `${(lineIdx / SCAN.length) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-candy-pale/40">
                    analisando... não mexa em nada 🧪
                  </p>
                </div>
              )}

              {stage === "done" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  data-testid="dexter-result-container"
                  className="mt-8 rounded-2xl border-2 border-portal/60 bg-portal/10 p-6 sm:p-8"
                >
                  <p className="inline-block -rotate-3 rounded border-2 border-portal px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-portal">
                    laudo oficial · caso arquivado*
                  </p>
                  <p className="mt-5 font-display text-xl font-medium leading-snug text-candy-pale sm:text-2xl">
                    "Investigação inconclusiva. A principal suspeita é esse seu jeitinho."
                  </p>
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-portal/60">
                    *dossiê disponível apenas para a principal suspeita
                  </p>
                  <button
                    data-testid="dexter-reopen-button"
                    onClick={() => {
                      pop();
                      setStage("idle");
                    }}
                    className="mt-6 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-candy-pale/50 underline underline-offset-4 transition hover:text-candy-soft"
                  >
                    ↺ reabrir o caso
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
