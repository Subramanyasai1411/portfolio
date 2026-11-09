import React, { useEffect, useRef } from 'react';

/**
 * Ambient background: a few faint, slowly drifting "time-series" lines
 * plus a soft warm light source. Deliberately quiet so content leads.
 */
export default function NeuralCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width, height, dpr, raf;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    // Each series: baseline y (fraction), amplitude, frequencies, color, speed
    const series = [
      { y: 0.30, amp: 34, f1: 0.0042, f2: 0.011, color: '61,220,255', alpha: 0.28, speed: 0.10, width: 1.4 }, // cyan
      { y: 0.52, amp: 26, f1: 0.0031, f2: 0.017, color: '167,139,250', alpha: 0.24, speed: 0.07, width: 1.1 }, // violet
      { y: 0.72, amp: 40, f1: 0.0024, f2: 0.009, color: '255,92,170', alpha: 0.16, speed: 0.05, width: 1.1 }, // magenta
    ];

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      series.forEach((s) => {
        const baseY = s.y * height;
        ctx.beginPath();
        for (let x = 0; x <= width; x += 6) {
          const xx = x + t * s.speed * 60;
          // trend + two seasonal components + small "noise"
          const y =
            baseY -
            Math.sin(xx * s.f1) * s.amp -
            Math.sin(xx * s.f2) * (s.amp * 0.35) -
            Math.sin(xx * 0.05) * 2;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        // fade at the edges
        const grad = ctx.createLinearGradient(0, 0, width, 0);
        grad.addColorStop(0, `rgba(${s.color},0)`);
        grad.addColorStop(0.2, `rgba(${s.color},${s.alpha})`);
        grad.addColorStop(0.8, `rgba(${s.color},${s.alpha})`);
        grad.addColorStop(1, `rgba(${s.color},0)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = s.width;
        ctx.stroke();
      });

      t += 0.016;
      if (!reduceMotion) raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Aurora light: three drifting colour blobs */}
      <div aria-hidden className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="aurora-blob" style={{ width: '48vw', height: '48vw', top: '-18vw', right: '-8vw', background: '#3DDCFF', opacity: 0.22, animation: 'aurora-drift-a 22s ease-in-out infinite' }} />
        <div className="aurora-blob" style={{ width: '44vw', height: '44vw', top: '30vh', left: '-16vw', background: '#7C3AED', opacity: 0.28, animation: 'aurora-drift-b 26s ease-in-out infinite' }} />
        <div className="aurora-blob" style={{ width: '36vw', height: '36vw', bottom: '-14vw', right: '10vw', background: '#FF5CAA', opacity: 0.14, animation: 'aurora-drift-a 30s ease-in-out infinite' }} />
      </div>
      <canvas ref={canvasRef} aria-hidden className="fixed inset-0 pointer-events-none z-0" />
    </>
  );
}
