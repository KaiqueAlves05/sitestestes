import { useEffect, Component } from "react";
import { Toaster } from "sonner";
import "@/App.css";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import RickSection from "@/components/RickSection";
import KittySection from "@/components/KittySection";
import DexterSection from "@/components/DexterSection";
import CatsGame from "@/components/CatsGame";
import Discover from "@/components/Discover";
import Letter from "@/components/Letter";
import Finale from "@/components/Finale";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { err: false };
  }
  static getDerivedStateFromError() {
    return { err: true };
  }
  componentDidCatch(e) {
    console.error(e);
  }
  render() {
    if (this.state.err) {
      return (
        <div style={{ padding: 48, textAlign: "center", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Ops! Alguém derrubou o portal... recarregue a página 🙈
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  useEffect(() => {
    let lenis = null;
    let raf = 0;
    let killed = false;
    (async () => {
      const Lenis = (await import("lenis")).default;
      if (killed) return;
      lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
      window.__lenis = lenis;
      const loop = (t) => {
        lenis.raf(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    })();
    return () => {
      killed = true;
      cancelAnimationFrame(raf);
      if (lenis) lenis.destroy();
    };
  }, []);

  return (
    <ErrorBoundary>
      <div className="min-h-screen overflow-x-clip bg-paper font-body text-ink">
        <div className="noise-overlay pointer-events-none fixed inset-0 z-[6] opacity-[0.035] mix-blend-overlay" />
        <Header />
        <main>
          <Hero />
          <Marquee />
          <RickSection />
          <KittySection />
          <DexterSection />
          <CatsGame />
          <Discover />
          <Letter />
          <Finale />
        </main>
        <footer className="bg-cosmic pb-10 pt-2 text-center font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-candy-soft/50">
          ✦ feito com carinho em algum canto do multiverso ✦
        </footer>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              borderRadius: "16px",
            },
          }}
        />
      </div>
    </ErrorBoundary>
  );
}
