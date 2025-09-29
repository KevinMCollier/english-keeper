import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Timeline() {
  const { t } = useTranslation('timeline');

  const raw = t('items', { returnObjects: true });
  const items = Array.isArray(raw) ? raw : Object.values(raw ?? []);
  const hasItems = items.length > 0;

  // Hover-only (no click-to-lock)
  const [hover, setHover] = useState(null);

  const lineGray      = '#E5E7EB';
  const orange        = '#ea6f29';

  const rowHeight   = 80;   // room for year labels above the rail
  const elbowDrop   = 28;
  const elbowRun    = 20;
  const panelW      = 300;  // slightly narrower text

  // Marker sizes
  const markerBtn   = 34;   // hitbox
  const markerBox   = 24;   // orange square
  const fromBottomOffset = markerBox / 2;

  // Rail sizing
  const railThickness = 3;
  const sidePad       = 80;
  const endPad        = 120;
  const minInnerW     = Math.max(items.length * 180, 640);

  // Extra space below
  const reserveBelow = 100;

  if (!hasItems) return null;

  return (
    <section id="timeline" className="bg-white text-blue py-10">
      <div className="container mx-auto px-5 max-w-5xl">
        <h2 className="text-midnight-navy font-display font-extrabold text-lg lg:text-xl tracking-tight mb-6 ml-6">
          {t('heading') || 'Career Timeline'}
        </h2>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent" />

          <div className="rail-hide-scroll relative overflow-x-auto overflow-y-hidden">
            <div
              className="relative"
              style={{ minWidth: `${minInnerW}px`, paddingLeft: sidePad, paddingRight: endPad }}
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
                      <div key={`${it.year}-${i}`} className="relative flex-1">
                        {/* year label */}
                        <span
                          className={[
                            'absolute bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2',
                            'text-base sm:text-lg font-medium select-none pointer-events-none',
                            shown ? 'text-slate-900' : 'text-slate-500',
                          ].join(' ')}
                        >
                          {it.year}
                        </span>

                        {/* orange marker (square inside centered button) */}
                        <button
                          type="button"
                          onMouseEnter={() => setHover(i)}
                          onMouseLeave={() => setHover(null)}
                          onFocus={() => setHover(i)}
                          onBlur={() => setHover(null)}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center"
                          style={{ height: markerBtn, width: markerBtn }}
                          aria-label={`Timeline ${it.year}`}
                        >
                          <span
                            className="block border"
                            style={{
                              height: markerBox,
                              width : markerBox,
                              borderRadius  : 0,
                              backgroundColor: orange,
                              borderColor    : orange,
                              boxShadow      : '0 1px 0 rgba(0,0,0,0.1)',
                            }}
                          />
                        </button>

                        {/* connector + blurb */}
                        {shown && (
                          <>
                            <div
                              className="absolute"
                              style={{
                                left: '50%',
                                top : '50%',
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
                                top : '50%',
                                transform: `translateY(${fromBottomOffset + elbowDrop}px) ${isLast ? 'translateX(-100%)' : ''}`,
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
                                top : '50%',
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
                                {it.title}
                                {it.body ? ` — ${it.body}` : ''}
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* reserve space */}
              <div style={{ height: reserveBelow }} />
            </div>
          </div>

          {/* scrollbar + keyframes */}
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
    </section>
  );
}
