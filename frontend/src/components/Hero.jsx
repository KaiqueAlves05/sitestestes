import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import Starfield from "./Starfield";
import { Bow, HeartShape, Sparkle, KittyFace } from "./Art";
import { pop } from "@/lib/sounds";
import { scrollToSection } from "@/lib/scroll";

const lineAnim = {
  hidden: { y: "115%" },
  show: (i) => ({
    y: 0,
    transition: { delay: 0.25 + i * 0.18, duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yStars = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const yDeco = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(my, { stiffness: 60, damping: 14 });
  const ry = useSpring(mx, { stiffness: 60, damping: 14 });

  const onMouseMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 10);
    my.set(((e.clientY - r.top) / r.height - 0.5) * -10);
  };

  return (
    <section
      ref={ref}
      onMouseMove={onMouseMove}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-cosmic"
      data-testid="hero-section"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_20%,rgba(236,72,153,0.22),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_85%,rgba(251,191,36,0.08),transparent_50%)]" />
      <motion.div style={{ y: yStars }} className="absolute inset-0">
        <Starfield density={110} />
      </motion.div>

      <motion.div style={{ y: yDeco }} className="pointer-events-none absolute inset-0 hidden md:block">
        <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute left-[8%] top-[22%]">
          <HeartShape className="h-8 w-8 opacity-50" fill="#F9A8C9" />
        </motion.div>
        <motion.div animate={{ y: [0, 12, 0], rotate: [0, 8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute right-[38%] top-[16%]">
          <Bow className="h-10 w-14 opacity-60" />
        </motion.div>
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute bottom-[24%] left-[30%]">
          <Sparkle className="h-6 w-6 opacity-70" />
        </motion.div>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.4 }} className="absolute bottom-[18%] right-[8%]">
          <HeartShape className="h-10 w-10 opacity-40" fill="#EC4899" />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 pb-24 pt-32 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6"
      >
        <div className="text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="font-mono text-[11px] font-bold uppercase tracking-[0.32em] text-candy-soft sm:text-xs"
          >
            ✦ um mini universo feito só pra você ✦
          </motion.p>

          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.04] tracking-tight text-candy-pale sm:text-7xl lg:text-[5.4rem]">
            <span className="block overflow-hidden pb-1">
              <motion.span custom={0} variants={lineAnim} initial="hidden" animate="show" className="block">
                Fiz uma
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-1 pl-1 lg:pl-10">
              <motion.span custom={1} variants={lineAnim} initial="hidden" animate="show" className="relative block text-candy-soft">
                coisinha
                <svg viewBox="0 0 220 22" className="absolute -bottom-1 left-2 h-4 w-[70%] max-w-[340px]" fill="none">
                  <path d="M4 16 C 60 4, 150 4, 216 12" stroke="#FBBF24" strokeWidth="6" strokeLinecap="round" />
                </svg>
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-2 pl-1 lg:pl-20">
              <motion.span custom={2} variants={lineAnim} initial="hidden" animate="show" className="block">
                pra você... <span aria-hidden="true">🎀</span>
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-7 max-w-md text-base leading-relaxed text-candy-pale/85 sm:text-lg lg:mx-0"
          >
            Talvez seja um pouquinho exagerado criar um site inteiro pra alguém, mas você tem um
            jeitinho que me deu vontade de fazer isso. Então... seja bem-vinda ao seu próprio
            mundinho! 💗
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.25, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-col items-center gap-4 lg:items-start"
          >
            <motion.button
              data-testid="hero-cta-button"
              onClick={() => {
                pop();
                scrollToSection("multiverso");
              }}
              whileHover={{ scale: 1.05, rotate: -1 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full bg-candy px-8 py-4 font-display text-lg font-semibold text-white shadow-glow transition-colors hover:bg-candy-deep"
            >
              Tá curiosa? Clica aqui 👀
            </motion.button>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-candy-pale/50">
              role devagar — tem mistério aqui embaixo
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
          className="relative mx-auto hidden h-72 w-72 sm:block lg:h-96 lg:w-96"
        >
          <div className="absolute inset-0 rounded-full bg-candy/20 blur-3xl" />
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative flex h-full items-center justify-center"
          >
            <KittyFace className="h-full w-full drop-shadow-[0_18px_40px_rgba(236,72,153,0.35)]" />
          </motion.div>
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 16, repeat: Infinity, ease: "linear" }} className="absolute inset-[-6%]">
            <Sparkle className="absolute left-1/2 top-0 h-6 w-6 -translate-x-1/2" />
            <Sparkle className="absolute bottom-2 left-2 h-4 w-4" fill="#F9A8C9" />
            <HeartShape className="absolute right-2 top-1/3 h-5 w-5" fill="#FBBF24" />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
      >
        <button
          data-testid="hero-scroll-hint"
          onClick={() => {
            pop();
            scrollToSection("multiverso");
          }}
          aria-label="Descer para o próximo cantinho"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-candy/40 text-candy-soft transition hover:bg-candy/20"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M12 4 v14 M5 13 l7 7 7-7" />
          </svg>
        </button>
      </motion.div>
    </section>
  );
}
