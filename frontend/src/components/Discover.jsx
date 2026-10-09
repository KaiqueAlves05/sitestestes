import { motion } from "framer-motion";
import { Sparkles, Smile, Coffee, Music4, Compass } from "lucide-react";
import Reveal, { Eyebrow } from "./Reveal";
import { HeartShape } from "./Art";

const cards = [
  {
    text: "Você tem um gosto muito interessante.",
    icon: Sparkles,
    span: "md:col-span-3 md:row-span-2",
    big: true,
  },
  {
    text: "Gosto de descobrir suas manias.",
    icon: Smile,
    span: "md:col-span-3",
  },
  {
    text: "Conversar com você é uma das partes boas do meu dia.",
    icon: Coffee,
    span: "md:col-span-3",
  },
  {
    text: "Seu jeitinho me deixa curioso para conhecer cada vez mais.",
    icon: Music4,
    span: "md:col-span-2",
  },
  {
    text: "Acho engraçado como algumas pessoas conseguem chamar nossa atenção sem fazer esforço.",
    icon: Compass,
    span: "md:col-span-4",
  },
];

export default function Discover() {
  return (
    <section id="descobrindo" className="relative overflow-hidden bg-cream py-24 sm:py-32" data-testid="discover-section">
      <div className="dots-bg absolute inset-0 opacity-50" />
      <motion.div
        animate={{ rotate: [0, 10, 0], y: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[6%] top-16 hidden md:block"
      >
        <HeartShape className="h-10 w-10 opacity-20" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <Reveal>
          <Eyebrow>arquivo de descobertas · em atualização constante</Eyebrow>
          <h2 className="mt-5 max-w-3xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Coisas que estou descobrindo sobre você ✨
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-6 md:grid-rows-[auto_auto_auto]">
          {cards.map((card, i) => (
            <Reveal key={i} delay={0.08 + i * 0.08} className={`h-full ${card.span}`}>
              <motion.div
                data-testid={`bento-grid-card-${i}`}
                whileHover={{ y: -6, rotate: i % 2 === 0 ? -0.6 : 0.6 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className={`relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-ink/10 bg-white p-7 shadow-card ${
                  card.big ? "bg-gradient-to-br from-white via-candy-pale/60 to-white" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs font-bold tracking-[0.3em] text-candy-deep">
                    0{i + 1}
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-candy-pale text-candy-deep">
                    <card.icon className="h-5 w-5" />
                  </span>
                </div>
                <p
                  className={`mt-6 font-medium leading-snug text-ink ${
                    card.big ? "font-display text-2xl sm:text-3xl" : "text-lg sm:text-xl"
                  }`}
                >
                  {card.text}
                </p>
                {card.big && (
                  <p className="mt-4 font-hand text-xl font-semibold text-candy-deep">
                    — registro nº 1, o mais importante até agora
                  </p>
                )}
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
