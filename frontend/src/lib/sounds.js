let ctx = null;
let master = null;
let muted = false;
const listeners = new Set();

function ensure() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.9;
    master.connect(ctx.destination);
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

export function setMuted(v) {
  muted = v;
  listeners.forEach((cb) => cb(v));
}

export function onMuteChange(cb) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function tone({ type = "sine", from = 440, to = null, dur = 0.2, vol = 0.15, delay = 0 }) {
  const c = ensure();
  if (!c || muted) return;
  const t = c.currentTime + delay;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(from, t);
  if (to) o.frequency.exponentialRampToValueAtTime(Math.max(to, 1), t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g);
  g.connect(master);
  o.start(t);
  o.stop(t + dur + 0.05);
}

export const pop = () =>
  tone({ type: "triangle", from: 320, to: 90, dur: 0.14, vol: 0.2 });

export const flip = () => {
  tone({ type: "sine", from: 500, to: 700, dur: 0.12, vol: 0.1 });
  tone({ type: "sine", from: 700, to: 900, dur: 0.12, vol: 0.08, delay: 0.08 });
};

export const chime = () => {
  [784, 1046.5, 1318.5].forEach((f, i) =>
    tone({ type: "sine", from: f, dur: 0.55, vol: 0.11, delay: i * 0.09 })
  );
};

export const sparkleSfx = () => {
  [1318.5, 1568, 2093, 2637].forEach((f, i) =>
    tone({ type: "sine", from: f, dur: 0.3, vol: 0.06, delay: i * 0.05 })
  );
};

export const fanfare = () => {
  [523.25, 659.25, 783.99, 1046.5].forEach((f, i) =>
    tone({ type: "triangle", from: f, dur: 0.45, vol: 0.11, delay: i * 0.12 })
  );
  tone({ type: "sine", from: 1318.5, dur: 0.8, vol: 0.07, delay: 0.5 });
};

export function meow() {
  const c = ensure();
  if (!c || muted) return;
  const t = c.currentTime;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = "sine";
  o.frequency.setValueAtTime(500, t);
  o.frequency.exponentialRampToValueAtTime(900, t + 0.12);
  o.frequency.exponentialRampToValueAtTime(650, t + 0.3);
  o.frequency.exponentialRampToValueAtTime(430, t + 0.45);
  const lfo = c.createOscillator();
  const lg = c.createGain();
  lfo.frequency.value = 22;
  lg.gain.value = 12;
  lfo.connect(lg);
  lg.connect(o.frequency);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.15, t + 0.07);
  g.gain.setTargetAtTime(0.0001, t + 0.28, 0.09);
  o.connect(g);
  g.connect(master);
  o.start(t);
  lfo.start(t);
  o.stop(t + 0.55);
  lfo.stop(t + 0.55);
}

export function whoosh() {
  const c = ensure();
  if (!c || muted) return;
  const t = c.currentTime;
  const dur = 0.9;
  const buf = c.createBuffer(1, c.sampleRate * dur, c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  const src = c.createBufferSource();
  src.buffer = buf;
  const f = c.createBiquadFilter();
  f.type = "bandpass";
  f.Q.value = 1.2;
  f.frequency.setValueAtTime(180, t);
  f.frequency.exponentialRampToValueAtTime(2200, t + dur * 0.55);
  f.frequency.exponentialRampToValueAtTime(120, t + dur);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.22, t + 0.18);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(f);
  f.connect(g);
  g.connect(master);
  src.start(t);
  src.stop(t + dur);
}
