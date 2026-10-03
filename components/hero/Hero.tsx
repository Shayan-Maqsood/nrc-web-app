"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const HEADLINE_LINES = ["BUILD.", "COMPETE.", "INNOVATE."];

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = hero.getBoundingClientRect();
      const x = ((e.clientX - left) / width - 0.5) * 30;
      const y = ((e.clientY - top) / height - 0.5) * 15;
      const visual = hero.querySelector<HTMLElement>(".hero-visual");
      if (visual) {
        visual.style.transform = `translate(${x * 0.8}px, ${y * 0.8}px)`;
      }
    };

    hero.addEventListener("mousemove", handleMouseMove);
    return () => hero.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#060810] pb-24"
      aria-label="Hero"
    >
      {/* Grid */}
      <div className="absolute inset-0 bg-grid opacity-[0.4] pointer-events-none" aria-hidden="true" />

      {/* Orange radial glow — right side */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[65vw] h-[90vh] pointer-events-none"
        aria-hidden="true"
        style={{
          background: "radial-gradient(ellipse 120% 100% at 90% 55%, rgba(232,79,14,0.13) 0%, rgba(193,18,31,0.07) 45%, transparent 72%)",
        }}
      />



      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-0 items-center pt-4">

          {/* Left — Text */}
          <div className="flex flex-col gap-y-3 items-start justify-center pt-4 xl:pt-0 min-w-0 overflow-visible">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="block w-8 h-px bg-[#E84F0E]" aria-hidden="true" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-[#E84F0E] uppercase">
                NUST Robotics Club
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="font-display font-black leading-[0.85] mb-6 tracking-tight overflow-visible">
              {HEADLINE_LINES.map((line, i) => (
                <motion.span
                  key={line}
                  className="block"
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.2 + i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{ fontSize: "clamp(3rem, 6.75vw, 6.75rem)" }}
                >
                  {i === 0 ? (
                    <span className="text-white">{line}</span>
                  ) : i === 1 ? (
                    <span
                      className="text-[#E84F0E]"
                      style={{ textShadow: "0 0 60px rgba(232,79,14,0.4)" }}
                    >
                      {line}
                    </span>
                  ) : (
                    <span
                      className="text-transparent"
                      style={{
                        WebkitTextStroke: "1.5px rgba(240,242,245,0.3)",
                      }}
                    >
                      {line}
                    </span>
                  )}
                </motion.span>
              ))}
            </h1>

            {/* Body */}
            <motion.p
              className="text-[#9AA0B2] text-sm leading-relaxed max-w-[38ch] mb-10"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
            >
              NUST&apos;s engineering society. We build robots that compete nationally.
            </motion.p>


            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.68 }}
            >
              <Link
                href="/#events"
                className="group inline-flex items-center gap-2 font-display text-sm tracking-[0.15em] text-white bg-[#E84F0E] px-6 py-3.5 rounded-full hover:bg-[#FF6B2B] hover:shadow-[0_0_20px_rgba(232,79,14,0.4)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
              >
                EXPLORE EVENTS
                <span aria-hidden="true" className="inline-block group-hover:translate-x-1.5 transition-transform duration-200">→</span>
              </Link>
              <Link
                href="/join"
                className="group inline-flex items-center gap-2 font-display text-sm tracking-[0.15em] text-white border border-white/30 px-6 py-3.5 rounded-full hover:border-white hover:bg-white/10 hover:shadow-[0_0_20px_rgba(232,79,14,0.15)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
              >
                JOIN NRC
              </Link>
            </motion.div>

            {/* Stat strip */}
            <motion.div
              className="mt-4 pt-4 md:mt-6 md:pt-6 border-t border-[rgba(255,255,255,0.08)] opacity-80 flex flex-wrap gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              {[
                { value: "10+", label: "Years Active" },
                { value: "50+", label: "Active Members" },
                { value: "National", label: "Competition Record" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display font-black text-xl text-white leading-none">
                    {stat.value}
                  </div>
                  <div className="font-mono text-[10px] tracking-[0.2em] text-[#3D4358] mt-1 uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Visual (hidden below xl) */}
          <motion.div
            className="hero-visual hidden lg:flex relative items-center justify-center pr-4 xl:pr-8 transition-transform duration-700 ease-out"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Geometric backdrop rings */}
            <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
              {[280, 360, 440].map((size, i) => (
                <div
                  key={size}
                  className="absolute border border-[rgba(232,79,14,0.06)] rounded-full animate-pulse-glow"
                  style={{
                    width: size,
                    height: size,
                    animationDelay: `${i * 0.5}s`,
                  }}
                />
              ))}
              {/* Crosshair lines */}
              <div className="absolute w-px h-32 bg-gradient-to-b from-transparent via-[rgba(232,79,14,0.2)] to-transparent" />
              <div className="absolute h-px w-32 bg-gradient-to-r from-transparent via-[rgba(232,79,14,0.2)] to-transparent" />
            </div>

            {/* Logo */}
            <div className="relative w-[40vw]! max-w-[36rem] lg:w-[32rem] lg:h-[32rem] mt-[-2rem] lg:mt-[-4rem]">
              <div
                className="absolute inset-0"
                style={{
                  background: "radial-gradient(circle, rgba(232,79,14,0.05) 0%, transparent 70%)",
                  filter: "blur(20px)",
                }}
                aria-hidden="true"
              />
              <Image
                src="/assets/nrc-logo.png"
                alt="NRC — NUST Robotics Club"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>

            {/* Corner bracket ornaments */}
            {[
              { pos: "top-4 left-4",    styles: { borderTop: "1px solid rgba(232,79,14,0.35)", borderLeft: "1px solid rgba(232,79,14,0.35)" } },
              { pos: "top-4 right-4",   styles: { borderTop: "1px solid rgba(232,79,14,0.35)", borderRight: "1px solid rgba(232,79,14,0.35)" } },
              { pos: "bottom-4 left-4", styles: { borderBottom: "1px solid rgba(232,79,14,0.35)", borderLeft: "1px solid rgba(232,79,14,0.35)" } },
              { pos: "bottom-4 right-4",styles: { borderBottom: "1px solid rgba(232,79,14,0.35)", borderRight: "1px solid rgba(232,79,14,0.35)" } },
            ].map((ornament) => (
              <div
                key={ornament.pos}
                className={`absolute ${ornament.pos} w-5 h-5`}
                aria-hidden="true"
                style={ornament.styles}
              />
            ))}

            {/* Label */}
            <div
              className="absolute bottom-0 right-0 font-mono text-[9px] tracking-[0.3em] text-[#6B7285] bg-[#060810]/80 px-2 py-1 border border-[rgba(232,79,14,0.1)]"
              aria-label="Visual placeholder — replace with 3D asset"
            >
              NRC — SYSTEM 01
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          aria-hidden="true"
        >
          <span className="font-mono text-[9px] tracking-[0.3em] text-[#6B7285]">SCROLL</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#E84F0E] to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
