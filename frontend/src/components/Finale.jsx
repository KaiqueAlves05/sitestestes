import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal, { Eyebrow } from "./Reveal";
import Starfield from "./Starfield";
import { HeartShape, Sparkle, KittyFace, Bow } from "./Art";
import { pop, fanfare } from "@/lib/sounds";

const replies = {
  fofa: [
    "Sabia que você ia achar fofo... e agora sou eu que estou ficando sem jeito. 🙈💕",
    "Missão cumprida, então: um sorrisinho seu já valeu o site inteiro. 💗",
    "Fica registrado: você achou fofo. Vou lembrar disso por um bom tempo. 🎀",
  ],
  bobinha: [
    "Bobinho sim... mas é um bobinho que acertou em gostar de conhecer você. 😎💗",
    "KKKKK bobo é quem fez um site inteiro... e faria tudo de novo. 🤭",
    "Rir junto é oficialmente a melhor parte. Quer uma segunda dose? 🥹✨",
  ],
};

function Celebration({ show }) {
  if (!show) return null;
  const pieces = Array.from({ length: 44 }, (_, i) => {
    const kind = i % 8;
    return {
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 1.2,
      dur: 3 + Math.random() * 2.5,
      rot: Math.random() * 360,
      size: kind === 2 || kind === 5 ? 34 : 18 + Math.random() * 16,
    };
  });
  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden" data-testid="celebration-overlay">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: "-8vh", x: 0, rotate: p.rot, opacity: 0.95 }}
          animate={{ y: "110vh", x: (Math.random() - 0.5) * 120, rotate: p.rot + 240, opacity: [0.95, 0.95, 0.6] }}
          transition={{ duration: p.dur, delay: p.delay, ease: "easeIn" }}
          className="absolute top-0"
          style={{ left: `${p.x}%` }}
        >
          {p.id % 8 === 0 && <HeartShape style={{ width: p.size, height: p.size }} fill="#EC4899" />}
          {p.id % 8 === 1 && <Sparkle style={{ width: p.size, height: p.size }} fill="#FBBF24" />}
          {p.id % 8 === 2 && <KittyFace style={{ width: p.size + 14 }} />}
          {p.id % 8 === 3 && <HeartShape style={{ width: p.size, height: p.size }} fill="#F9A8C9" />}
          {p.id % 8 === 4 && <Sparkle style={{ width: p.size, height: p.size }} fill="#F9A8C9" />}
          {p.id % 8 === 5 && <Bow style={{ width: p.size + 12 }} />}
          {p.id % 8 === 6 && <HeartShape style={{ width: p.size, height: p.size }} fill="#DB2777" />}
          {p.id % 8 === 7 && <Sparkle style={{ width: p.size, height: p.size }} fill="#ffffff" />}
        </motion.div>
      ))}
    </div>
  );
}

export default function Finale() {
  const [stage, setStage] = useState("idle");
  const [particles, setParticles] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [idx, setIdx] = useState({ fofa: 0, bobinha: 0 });

  const surprise = () => {
    if (stage !== "idle") return;
    fanfare();
    setParticles(true);
    setStage("burst");
    setTimeout(() => setStage("done"), 900);
    setTimeout(() => setParticles(false), 7000);
  };

  const reply = (kind) => {
    pop();
    const i = idx[kind] % replies[kind].length;
    setFeedback(replies[kind][i]);
    setIdx((v) => ({ ...v, [kind]: v[kind] + 1 }));
  };

  return (
    <section id="final" className="relative overflow-hidden bg-cosmic py-24 sm:py-32" data-testid="finale-section">
      <Starfield density={90} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_110%,rgba(236,72,153,0.2),transparent_60%)]" />

      <Celebration show={particles} />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <Eyebrow tone="text-candy-soft">a última página do mundinho</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-candy-pale sm:text-4xl lg:text-5xl">
            Antes de você ir... 💌
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-candy-pale/80 sm:text-lg">
            Eu ainda tenho muita coisa pra descobrir sobre você. Mas, pelo que conheci até agora,
            já posso dizer que você é alguém que vale a pena conhecer melhor.
          </p>
          {stage === "idle" && (
            <motion.button
              data-testid="finale-surprise-button"
              onClick={surprise}
              whileHover={{ scale: 1.05, rotate: -1.5 }}
              whileTap={{ scale: 0.94 }}
              className="mt-10 rounded-full bg-candy px-9 py-4 font-display text-lg font-semibold text-white shadow-glow transition-colors hover:bg-candy-deep"
            >
              Uma última surpresa 🎁
            </motion.button>
          )}
        </Reveal>

        <AnimatePresence>
          {stage === "done" && (
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 rounded-3xl border border-candy/30 bg-cosmic-night/80 p-8 shadow-[0_0_60px_rgba(236,72,153,0.2)] backdrop-blur-xl sm:p-12"
              data-testid="finale-final-card"
            >
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="mx-auto w-fit"
              >
                <KittyFace className="h-24 w-26" />
              </motion.div>
              <p className="mt-6 font-display text-2xl font-medium leading-snug text-candy-pale sm:text-3xl">
                "Isso aqui é só um site... mas a vontade de te conhecer melhor é bem real. 💗"
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <motion.button
                  data-testid="reply-button-fofa"
                  onClick={() => reply("fofa")}
                  whileHover={{ scale: 1.05, rotate: -1 }}
                  whileTap={{ scale: 0.92 }}
                  className="rounded-full bg-candy px-7 py-3.5 font-display text-base font-semibold text-white shadow-glow transition-colors hover:bg-candy-deep"
                >
                  Achei fofo 🥹💕
                </motion.button>
                <motion.button
                  data-testid="reply-button-bobinha"
                  onClick={() => reply("bobinha")}
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  whileTap={{ scale: 0.92 }}
                  className="rounded-full border-2 border-candy-soft/60 px-7 py-3.5 font-display text-base font-semibold text-candy-soft transition-colors hover:bg-candy/15"
                >
                  Você é meio bobinho KKKKK 🤭
                </motion.button>
              </div>

              <div className="mt-6 flex min-h-16 items-center justify-center">
                <AnimatePresence mode="wait">
                  {feedback && (
                    <motion.p
                      key={feedback}
                      initial={{ opacity: 0, y: 12, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35 }}
                      data-testid="reply-feedback-message"
                      className="max-w-md font-hand text-2xl font-semibold leading-snug text-gold"
                    >
                      {feedback}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
