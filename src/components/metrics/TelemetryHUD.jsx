import React, { useEffect, useRef, useState } from 'react';
import { useInView, animate } from 'framer-motion';
import { telemetryMetrics } from '../../data/portfolioData';

/** Counts the first number in a string up from 0 when scrolled into view. */
function CountUp({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const match = value.match(/^([^\d]*)([\d,]*\.?\d+)(.*)$/);
  const [display, setDisplay] = useState(match ? `${match[1]}0${match[3]}` : value);

  useEffect(() => {
    if (!inView || !match) return;
    const [, pre, num, post] = match;
    const target = parseFloat(num.replace(/,/g, ''));
    const decimals = (num.split('.')[1] || '').length;
    const useComma = num.includes(',');
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        let s = v.toFixed(decimals);
        if (useComma) s = Number(s).toLocaleString('en-US');
        setDisplay(`${pre}${s}${post}`);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return <span ref={ref}>{display}</span>;
}

export default function TelemetryHUD() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-ink-800 lg:divide-x">
      {telemetryMetrics.map((m) => (
        <div key={m.id} className="px-5 py-6 first:pl-0">
          <div className="font-display text-3xl font-semibold text-white tracking-tight tabular-nums">
            <CountUp value={m.value} />
          </div>
          <div className="mt-2 text-sm text-slate-300">{m.label}</div>
          <div className="mt-1 text-xs text-slate-500 leading-snug">{m.subtext}</div>
        </div>
      ))}
    </div>
  );
}
