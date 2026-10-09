const items = [
  "✨ mundinho de fofura",
  "🎀 você é demais",
  "🪐 sorte neste multiverso",
  "🐱 carinho infinito",
  "💌 carta digital",
  "💗 obrigado pela companhia",
];

export default function Marquee() {
  return (
    <section
      data-testid="marquee-band"
      aria-label="Faixa de recadinhos"
      className="relative z-20 -my-4 -rotate-[1.4deg] scale-[1.03] overflow-hidden border-y-4 border-ink bg-gold py-3"
    >
      <div className="flex w-max animate-marquee">
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
            {items.map((t, i) => (
              <span
                key={i}
                className="mx-7 whitespace-nowrap font-mono text-xs font-bold uppercase tracking-[0.25em] text-ink sm:text-sm"
              >
                {t}
                <span className="ml-14 text-ink/50">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
