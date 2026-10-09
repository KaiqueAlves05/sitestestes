import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import Reveal, { Eyebrow } from "./Reveal";
import { CatAvatar, HeartShape } from "./Art";
import { meow, fanfare } from "@/lib/sounds";

const TOTAL = 9;

const cats = [
  {
    name: "pudim",
    body: "#F8DC9E",
    dark: "#E9B85C",
    inner: "#F9A8C9",
    bow: false,
    lines: [
      "Seu sorriso devia ser patrimônio do universo.",
      "Você parece daquelas pessoas que deixam o dia mais leve.",
      "Apostou que seu jeitinho é contagiante? Aposto que sim.",
    ],
  },
  {
    name: "miau estelar",
    body: "#C7CBE8",
    dark: "#9AA0CE",
    inner: "#C7A8E8",
    bow: false,
    lines: [
      "Conversar com você deve ser tipo viajar numa galáxia boa demais.",
      "Sua criatividade tem que vir de outro planeta, não tem explicação.",
      "Só de lembrar de você, o dia já melhora um pouquinho.",
    ],
  },
  {
    name: "frufru",
    body: "#FFFFFF",
    dark: "#E8D9E2",
    inner: "#F9A8C9",
    bow: true,
    lines: [
      "Você é fofa nos mínimos detalhes, sabia?",
      "Quem te conhece deve se sentir bem sortudo.",
      "Seu charminho não se ensina em lugar nenhum.",
    ],
  },
];

export default function CatsGame() {
  const [pets, setPets] = useState([0, 0, 0]);
  const [happy, setHappy] = useState(null);
  const [bursts, setBursts] = useState({});
  const total = pets.reduce((a, b) => a + b, 0);
  const complete = total >= TOTAL;

  const pet = (i) => {
    meow();
    setPets((p) => {
      const n = [...p];
      n[i] = Math.min(n[i] + 1, cats[i].lines.length);
      return n;
    });
    setHappy(i);
    setTimeout(() => setHappy((h) => (h === i ? null : h)), 900);

    const ids = Array.from({ length: 6 }, () => Math.random());
    setBursts((b) => ({ ...b, [i]: [...(b[i] || []), ...ids] }));
    setTimeout(
      () => setBursts((b) => ({ ...b, [i]: (b[i] || []).slice(ids.length) })),
      1100
    );

    const newTotal = total + 1;
    if (newTotal === TOTAL) {
      setTimeout(() => {
        fanfare();
        toast("🏅 Master do Carinho!", {
          description: "Título conquistado com louvor — e exclusivo pra você.",
        });
      }, 450);
    }
  };

  return (
    <section id="gatinhos" className="relative overflow-hidden bg-paper2 py-24 sm:py-32" data-testid="cats-section">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(236,72,153,0.08),transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <Reveal className="text-center">
          <Eyebrow>reforços fofinhos chegaram</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Cantinho dos Gatinhos 🐾
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink/75 sm:text-lg">
            Eu não sabia exatamente como chamar sua atenção, então trouxe reforços: gatinhos
            fofinhos. 🐱
          </p>
          <p className="mt-4 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-candy-deep">
            missão: faça carinho nos 3 e colete todos os elogios
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
          {cats.map((cat, i) => {
            const shown = pets[i] > 0 ? cats[i].lines[Math.min(pets[i], cats[i].lines.length) - 1] : null;
            return (
              <Reveal key={cat.name} delay={0.1 + i * 0.12} className="flex flex-col items-center">
                <div className="relative flex h-28 w-full items-end justify-center">
                  <AnimatePresence>
                    {shown && (
                      <motion.div
                        key={shown}
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="absolute -top-1 z-10 max-w-[240px] rounded-2xl rounded-b-none border-2 border-candy-soft bg-white px-4 py-2 text-center font-hand text-xl font-semibold leading-tight text-ink shadow-card"
                        data-testid={`cat-compliment-${i}`}
                      >
                        {shown}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {!shown && (
                    <span className="absolute -top-1 rounded-full bg-candy-pale px-4 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-candy-deep">
                      faz carinho em mim!
                    </span>
                  )}
                </div>

                <div className="relative">
                  <AnimatePresence>
                    {(bursts[i] || []).map((id) => (
                      <motion.div
                        key={id}
                        initial={{ opacity: 1, y: 0, x: (Math.random() - 0.5) * 40, scale: 0.5 + Math.random() * 0.5 }}
                        animate={{ opacity: 0, y: -70 - Math.random() * 40 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="pointer-events-none absolute left-1/2 top-4 z-20"
                      >
                        <HeartShape className="h-5 w-5" fill={i === 1 ? "#FBBF24" : "#EC4899"} />
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  <motion.button
                    data-testid={`cat-pet-button-${i}`}
                    onClick={() => pet(i)}
                    whileTap={{ scale: 0.88 }}
                    animate={happy === i ? { rotate: [0, -3, 3, 0], scale: [1, 1.08, 1] } : {}}
                    transition={{ duration: 0.5 }}
                    aria-label={`Fazer carinho no gatinho ${cat.name}`}
                    className="block cursor-pointer"
                  >
                    <CatAvatar
                      body={cat.body}
                      dark={cat.dark}
                      inner={cat.inner}
                      bow={cat.bow}
                      happy={happy === i}
                      className="h-36 w-36 drop-shadow-[0_14px_24px_rgba(74,31,61,0.15)] sm:h-40 sm:w-40"
                    />
                  </motion.button>
                </div>

                <p className="mt-3 rounded-full bg-white px-4 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink shadow-sm">
                  {cat.name} · {Math.min(pets[i], cats[i].lines.length)}/{cats[i].lines.length}
                </p>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.15} className="mx-auto mt-14 max-w-xl">
          <div className="flex items-center justify-between font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-ink/70">
            <span>fofurômetro</span>
            <span data-testid="fofumetro-counter">{total}/{TOTAL} carinhos</span>
          </div>
          <div className="mt-3 h-4 overflow-hidden rounded-full bg-white shadow-inner">
            <motion.div
              data-testid="fofumetro-progress-bar"
              className="h-full rounded-full bg-gradient-to-r from-candy-soft via-candy to-candy-deep"
              animate={{ width: `${(Math.min(total, TOTAL) / TOTAL) * 100}%` }}
              transition={{ type: "spring", stiffness: 80, damping: 18 }}
            />
          </div>

          <AnimatePresence>
            {complete && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 120, damping: 14 }}
                data-testid="fofumetro-badge"
                className="mt-6 rounded-3xl border-2 border-gold bg-white p-6 text-center shadow-card"
              >
                <p className="font-display text-xl font-semibold text-ink">
                  🏅 Master do Carinho — título concedido a você, e só a você.
                </p>
                <p className="mt-2 font-hand text-2xl font-semibold text-candy-deep">
                  Os gatinhos aprovam. Eu também. 💗
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
