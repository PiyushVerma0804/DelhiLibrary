import { useState, useEffect } from 'react';

function Hero() {
  const [show, setShow] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [viewportH, setViewportH] = useState(window.innerHeight);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleResize = () => setViewportH(window.innerHeight);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const contentOpacity = Math.max(0, Math.min(1, 1 - scrollY / (viewportH * 0.8)));
  const contentOffset = scrollY * 0.15;

  const fadeStyle = (delay) => ({
    opacity: show ? 1 : 0,
    transform: show ? 'translateY(0)' : 'translateY(30px)',
    transition: `opacity 1000ms ease-out ${delay}ms, transform 1000ms ease-out ${delay}ms`,
  });

  return (
    <section
      id="hero"
      className="relative h-screen min-h-screen flex items-center overflow-hidden bg-[#1a1209] w-screen left-1/2 -translate-x-1/2"
    >
      {/* Background (matches HTML hero-bg) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1600&q=80') center/cover no-repeat",
          opacity: 0.22,
          transform: `translateY(${scrollY * 0.2}px)`,
          willChange: 'transform',
        }}
      />

      {/* Warm gradient overlay (CRUCIAL — matches HTML ::after) */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(184,134,11,0.18) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 20%, rgba(139,58,42,0.14) 0%, transparent 55%)
          `,
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 max-w-[700px] mx-auto px-6"
        style={{
          opacity: contentOpacity,
          transform: `translateY(${contentOffset}px)`,
          transition: 'opacity 100ms linear',
          willChange: 'transform, opacity',
        }}
      >
        {/* Eyebrow */}
        <p
          className="flex items-center gap-3 text-[0.75rem] tracking-[0.22em] uppercase font-semibold text-[#d4a017] mb-6"
          style={fadeStyle(0)}
        >
          <span className="w-8 h-[1px] bg-[#d4a017]" />
          Since Antiquity, Knowledge Endures
        </p>

        {/* Title */}
        <h1
          className="font-serif text-white font-light leading-[1.1] mb-5 text-[clamp(2.6rem,6vw,4.8rem)]"
          style={fadeStyle(250)}
        >
          Explore the Best<br />
          <em className="italic text-[#d4a017] font-light">
            Libraries in Delhi
          </em>
        </h1>

        {/* Subtitle */}
        <p
          className="text-[1.05rem] text-white/60 max-w-[480px] mb-10 leading-relaxed font-light"
          style={fadeStyle(500)}
        >
          Discover Delhi's most treasured repositories of knowledge — from grand colonial archives to modern learning hubs, each with a story to tell.
        </p>

        {/* Actions */}
        <div className="flex gap-4 flex-wrap items-center" style={fadeStyle(800)}>

          <button
            onClick={() => {
              document.getElementById("libraries-section")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
            className="flex items-center gap-2 px-7 py-3 rounded-full text-[0.88rem] font-semibold tracking-wide bg-[#b8860b] text-white transition-all duration-300 hover:bg-[#d4a017] hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(184,134,11,0.35)]"
          >
            <span>↓</span>
            Explore Libraries
          </button>

          <button
            onClick={() => {
              document.getElementById("about-section")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
            className="px-7 py-3 rounded-full text-[0.88rem] font-semibold tracking-wide border-2 border-white/30 text-white/75 transition-all duration-300 hover:bg-[#b8860b] hover:text-white hover:border-[#b8860b] hover:-translate-y-1"
          >
            Learn More
          </button>

        </div>
      </div>
    </section>
  );
}

export default Hero;
