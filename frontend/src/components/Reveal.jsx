import { motion } from "framer-motion";

export default function Reveal({ children, delay = 0, y = 30, className = "", ...rest }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children, tone = "text-candy-deep" }) {
  return (
    <p className={`font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.3em] ${tone}`}>
      ✦ {children} ✦
    </p>
  );
}
