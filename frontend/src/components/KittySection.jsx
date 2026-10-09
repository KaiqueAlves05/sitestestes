import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Reveal, { Eyebrow } from "./Reveal";
import { Bow, HeartShape, KittyFace } from "./Art";
import { flip, sparkleSfx } from "@/lib/sounds";

const notes = [
  "Feito de laços, corações e um pouquinho de saudade antecipada das suas mensagens. 🎀",
  "Recadinho secreto: o mundo ficou mais interessante desde que você chegou nele. 💗",
  "Dizem que laços dão sorte. Esse aqui é seu — use com sorrisos. ✨",
];

function FlipCard({ note, idx }) {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    flip();
    setOpen((o) => {
      if (!o) sparkleSfx();
      return !o;
    });
  };

  return (
    <button
      data-testid={`hello-kitty-card-${idx}`}
      onClick={toggle}
      className="group h-56 w-full [perspective:1000px]"
    >
      <motion.div
        animate={{ rotateY: open ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative h-full w-full [transform-style:preserve-3d]"
      >
        <div className="backface-hidden absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-3xl border-2 border-candy-soft bg-white/80 p-6 shadow-card transition-transform group-hover:-translate-y-1">
          <Bow className="h-10 w-14" />
          <p className="font-display text-lg font-semibold text-ink">recadinho escondido</p>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-candy-deep">
            clique para revelar
          </p>
        </div>
        <div className="backface-hidden absolute inset-0 flex items-center justify-center rounded-3xl border-2 border-candy bg-candy-pale p-6 [transform:rotateY(180deg)]">
          <p className="text-center font-hand text-2xl font-semibold leading-snug text-ink">
            {note}
          </p>
        </div>
      </motion.div>
    </button>
  );
}

export default function KittySection() {
  return (
    <section id="kitty" className="relative overflow-hidden bg-paper py-24 sm:py-32" data-testid="hello-kitty-section">
      <div className="dots-bg absolute inset-0 opacity-60" />
      <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-candy-pale blur-3xl" />
      <div className="absolute -right-24 bottom-24 h-72 w-72 rounded-full bg-candy-pale blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <Reveal className="text-center">
          <Eyebrow>cantinho hello kitty</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Um cantinho que é a sua carinha 🎀
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink/75 sm:text-lg">
            Descobri que você gosta dessas coisinhas fofas, então tentei fazer um lugar que
            combinasse um pouquinho com você.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="relative mx-auto mt-12 flex max-w-md justify-center">
          <div className="absolute inset-0 m-auto h-40 w-40 rounded-full bg-candy/15 blur-2xl" />
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [-2, 0, -2] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <KittyFace className="h-40 w-44 sm:h-48 sm:w-52 drop-shadow-[0_16px_32px_rgba(236,72,153,0.25)]" />
          </motion.div>
          <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 0.6 }} className="absolute -left-6 top-0 sm:-left-16">
            <Bow className="h-10 w-14 opacity-80" />
          </motion.div>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 4.6, delay: 1 }} className="absolute -right-4 bottom-2 sm:-right-14">
            <HeartShape className="h-9 w-9 opacity-70" />
          </motion.div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {notes.map((n, i) => (
            <Reveal key={i} delay={0.1 + i * 0.12} className="h-full">
              <FlipCard note={n} idx={i} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-10 text-center">
          <button
            data-testid="hello-kitty-reveal-all"
            onClick={() => {
              sparkleSfx();
              toast("Três recadinhos esperando por você nos laços 🎀", {
                description: "Clique em cada cartão para revelar a mensagem escondida.",
              });
            }}
            className="font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-candy-deep underline decoration-candy-soft decoration-2 underline-offset-4 transition hover:text-ink"
          >
            psst — tem mensagens escondidas por aqui
          </button>
        </Reveal>
      </div>
    </section>
  );
}
