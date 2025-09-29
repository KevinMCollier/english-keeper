// src/components/Timeline.jsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Timeline() {
  const { t } = useTranslation('timeline');

  // Hover state (desktop only, but must always be declared)
  const [hover, setHover] = useState(null);

  const raw = t('items', { returnObjects: true });
  const items = Array.isArray(raw) ? raw : Object.values(raw ?? []);
  const hasItems = items.length > 0;

  // Colors
  const lineGray = '#E5E7EB';
  const orange   = '#ea6f29';

  // Desktop sizing
  const rowHeight   = 80;
  const elbowDrop   = 28;
  const elbowRun    = 20;
  const panelW      = 300;

  const markerBtn   = 34;
  const markerBox   = 24;
  const fromBottomOffset = markerBox / 2;

  const railThickness = 3;
  const sidePad       = 80;
  const endPad        = 120;
  const minInnerW     = Math.max(items.length * 180, 640);
  const reserveBelow  = 100;

  if (!hasItems) return null;

  return (
    <section id="timeline" className="bg-white text-blue py-10">
      <div className="container mx-auto px-6 sm:px-8 max-w-5xl">
        <h2 className="text-midnight-navy font-display font-extrabold text-lg lg:text-xl tracking-tight mb-6 sm:ml-2">
          {t('heading') || 'Career Timeline'}
        </h2>

        {/* ---------- MOBILE (vertical list) ---------- */}
        <ol className="md:hidden relative pl-5">
          <span
            aria-hidden="true"
            className="absolute left-0 top-0 bottom-0 w-px bg-slate-200"
          />
          {items.map((it, i) => (
            <li key={`${it?.year ?? i}-${i}`} className="relative pb-6">
              <span
                aria-hidden="true"
                className="absolute -left-[9px] top-[6px] h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: orange }}
              />
              <div className="rounded-xl border border-slate-200/70 bg-white shadow-sm px-4 py-3">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span
                    className="inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium"
                    style={{ borderColor: orange, color: orange }}
                  >
                    {it?.year}
                  </span>
                  <h3 className="text-slate-900 font-semibold text-sm break-words">
                    {it?.title}
                  </h3>
                </div>
                {it?.body && (
                  <p className="mt-1 text-[13px] leading-relaxed text-slate-700 break-words">
                    {it.body}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>

        {/* ---------- DESKTOP (horizontal rail) ---------- */}
        <div className="hidden md:block">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent" />

            <div className="rail-hide-scroll relative overflow-x-auto overflow-y-hidden">
              <div
                className="relative"
                style={{
                  minWidth: `${minInnerW}px`,
                  paddingLeft: sidePad,
                  paddingRight: endPad,
                }}
              >
                {/* rail line */}
                <div className="relative" style={{ height: rowHeight }}>
                  <div
                    className="absolute left-0 right-0 top-1/2 -translate-y-1/2 rounded"
                    style={{ height: railThickness, backgroundColor: lineGray }}
                  />

                  {/* items */}
                  <div className="absolute inset-0 flex items-center justify-between">
                    {items.map((it, i) => {
                      const isLast = i === items.length - 1;
                      const shown  = hover === i;

                      return (
                        <div key={`${it?.year ?? i}-${i}`} className="relative flex-1">
                          <span
                            className={[
                              'absolute bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2',
                              'text-base sm:text-lg font-medium select-none pointer-events-none',
                              shown ? 'text-slate-900' : 'text-slate-500',
                            ].join(' ')}
                          >
                            {it?.year}
                          </span>

                          <button
                            type="button"
                            onMouseEnter={() => setHover(i)}
                            onMouseLeave={() => setHover(null)}
                            onFocus={() => setHover(i)}
                            onBlur={() => setHover(null)}
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center"
                            style={{ height: markerBtn, width: markerBtn }}
                            aria-label={`Timeline ${it?.year}`}
                          >
                            <span
                              className="block border"
                              style={{
                                height: markerBox,
                                width: markerBox,
                                borderRadius: 0,
                                backgroundColor: orange,
                                borderColor: orange,
                                boxShadow: '0 1px 0 rgba(0,0,0,0.1)',
                              }}
                            />
                          </button>

                          {shown && (
                            <>
                              <div
                                className="absolute"
                                style={{
                                  left: '50%',
                                  top: '50%',
                                  transform: `translateX(-50%) translateY(${fromBottomOffset}px)`,
                                  width: 1,
                                  height: 0,
                                  backgroundColor: lineGray,
                                  animation: `drawY 180ms ease-out forwards`,
                                }}
                              />
                              <div
                                className="absolute"
                                style={{
                                  left: '50%',
                                  top: '50%',
                                  transform: `translateY(${fromBottomOffset + elbowDrop}px) ${
                                    isLast ? 'translateX(-100%)' : ''
                                  }`,
                                  width: 0,
                                  height: 1,
                                  backgroundColor: lineGray,
                                  animation: `drawX 160ms 120ms ease-out forwards`,
                                }}
                              />
                              <div
                                className="absolute"
                                style={{
                                  left: '50%',
                                  top: '50%',
                                  transform: isLast
                                    ? `translateY(${fromBottomOffset + elbowDrop - 6}px) translateX(calc(-100% - ${elbowRun}px - 6px))`
                                    : `translateY(${fromBottomOffset + elbowDrop - 6}px) translateX(${elbowRun + 6}px)`,
                                  width: panelW,
                                  opacity: 0,
                                  animation: `fadeIn 220ms 160ms ease-out forwards`,
                                  pointerEvents: 'none',
                                }}
                              >
                                <p className="text-slate-700 text-xs md:text-sm leading-relaxed">
                                  {it?.title}
                                  {it?.body ? ` — ${it.body}` : ''}
                                </p>
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div style={{ height: reserveBelow }} />
              </div>
            </div>

            <style>{`
              .rail-hide-scroll {
                scrollbar-width: none;
                -ms-overflow-style: none;
              }
              .rail-hide-scroll::-webkit-scrollbar { display: none; }

              @keyframes drawY {
                from { height: 0; }
                to   { height: ${elbowDrop}px; }
              }
              @keyframes drawX {
                from { width: 0; }
                to   { width: ${elbowRun}px; }
              }
              @keyframes fadeIn {
                from { opacity: 0; }
                to   { opacity: 1; }
              }
            `}</style>
          </div>
        </div>
      </div>
    </section>
  );
}
