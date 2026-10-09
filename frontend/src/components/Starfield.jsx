import { useEffect, useRef } from "react";

export default function Starfield({
  density = 90,
  className = "",
  colors = ["#FFE9F0", "#FBBF24", "#F9A8C9", "#ffffff"],
}) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const c2 = canvas.getContext("2d");
    let raf, stars = [], shoot = null, w = 0, h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const r = canvas.parentElement.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      c2.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = Array.from({ length: density }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.4 + Math.random() * 1.4,
        depth: 0.3 + Math.random() * 0.7,
        ph: Math.random() * Math.PI * 2,
        sp: 0.5 + Math.random() * 1.5,
        c: colors[(Math.random() * colors.length) | 0],
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    let last = performance.now();
    let t = 0;
    const draw = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      t += dt;
      const sy = window.scrollY;
      c2.clearRect(0, 0, w, h);
      for (const s of stars) {
        const a = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * s.sp + s.ph));
        c2.globalAlpha = a;
        c2.fillStyle = s.c;
        c2.beginPath();
        c2.arc(s.x, (((s.y - sy * s.depth * 0.22) % h) + h) % h, s.r, 0, 7);
        c2.fill();
      }
      if (!shoot && Math.random() < 0.005) {
        shoot = { x: w * 0.2 + Math.random() * w * 0.7, y: h * 0.3 * Math.random(), vx: -340, vy: 200, life: 0 };
      }
      if (shoot) {
        shoot.life += dt;
        shoot.x += shoot.vx * dt;
        shoot.y += shoot.vy * dt;
        c2.globalAlpha = Math.max(0, 1 - shoot.life);
        const grad = c2.createLinearGradient(shoot.x, shoot.y, shoot.x - shoot.vx * 0.22, shoot.y - shoot.vy * 0.22);
        grad.addColorStop(0, "#ffffff");
        grad.addColorStop(1, "rgba(255,255,255,0)");
        c2.strokeStyle = grad;
        c2.lineWidth = 2;
        c2.beginPath();
        c2.moveTo(shoot.x, shoot.y);
        c2.lineTo(shoot.x - shoot.vx * 0.22, shoot.y - shoot.vy * 0.22);
        c2.stroke();
        if (shoot.life > 1) shoot = null;
      }
      c2.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [density]);

  return <canvas ref={ref} className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true" />;
}
