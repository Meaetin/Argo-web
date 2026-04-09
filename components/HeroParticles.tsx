"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

function createParticle(w: number, h: number): Particle {
  return {
    x: Math.random() * Math.max(1, w),
    y: Math.random() * Math.max(1, h),
    size: Math.max(0.5, Math.random() * 2 + 0.5),
    speedX: (Math.random() - 0.5) * 0.3,
    speedY: Math.max(0.1, Math.random() * 0.5 + 0.1),
    opacity: Math.max(0.1, Math.random() * 0.5 + 0.2),
  };
}

export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);
  const colorRef = useRef({ r: "232", g: "180", b: "140" });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function updateColor() {
      const s = getComputedStyle(document.documentElement);
      colorRef.current = {
        r: s.getPropertyValue("--particle-r").trim(),
        g: s.getPropertyValue("--particle-g").trim(),
        b: s.getPropertyValue("--particle-b").trim(),
      };
    }

    function resize() {
      if (!canvas) return;
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
      particlesRef.current = [];
      const count = window.innerWidth < 768 ? 20 : 45;
      for (let i = 0; i < count; i++) {
        particlesRef.current.push(
          createParticle(canvas.width, canvas.height)
        );
      }
    }

    function animate() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = Math.max(1, canvas.width);
      const h = Math.max(1, canvas.height);
      const c = colorRef.current;

      for (const p of particlesRef.current) {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y > h) {
          p.y = 0;
          p.x = Math.random() * w;
        }
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, p.size), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${Math.max(0, Math.min(1, p.opacity)).toFixed(3)})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(animate);
    }

    updateColor();
    resize();
    animate();

    const observer = new MutationObserver(updateColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    window.addEventListener("resize", resize);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="hero-particle-canvas pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
