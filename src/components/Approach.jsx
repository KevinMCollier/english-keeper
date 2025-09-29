import { useTranslation } from 'react-i18next';
import { User, MessageSquare, Globe, Sparkles } from 'lucide-react';

export default function Approach() {
  const { t } = useTranslation('approach');

  const cards = [
    {
      key: 'learnerFirst',
      title: t('cards.learnerFirst.title'),
      body: t('cards.learnerFirst.body'),
      accent: '#0EA5A4',       // teal 500-ish
      accentSoft: '#CCFBF1',   // teal 100-ish
      Icon: User,
    },
    {
      key: 'outputFocused',
      title: t('cards.outputFocused.title'),
      body: t('cards.outputFocused.body'),
      accent: '#EA580C',       // orange 600
      accentSoft: '#FFEAD5',   // orange 100
      Icon: MessageSquare,
    },
    {
      key: 'contextDriven',
      title: t('cards.contextDriven.title'),
      body: t('cards.contextDriven.body'),
      accent: '#D97706',       // amber 600
      accentSoft: '#FEF3C7',   // amber 100
      Icon: Globe,
    },
    {
      key: 'lifeBeyond',
      title: t('cards.lifeBeyond.title'),
      body: t('cards.lifeBeyond.body'),
      accent: '#7C3AED',       // violet 600
      accentSoft: '#EDE9FE',   // violet 100
      Icon: Sparkles,
    },
  ];

  return (
    <section id="approach" className="bg-white text-blue py-14">
      <div className="container mx-auto px-5 max-w-6xl">
        {/* Tighter two-column layout */}
        <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8">
          {/* Header column (a bit wider, larger type) */}
          <div className="md:w-2/5">
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              {t('heading') || 'My Approach'}
            </h2>
            <p className="mt-3 text-slate-600 max-w-[36ch] text-base lg:text-lg">
              Built around your goals and learning style, with active conversation, real-world context and steady guidance.
            </p>
          </div>

          {/* Cards column */}
          <div className="md:w-3/5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
              {cards.map(({ key, title, body, accent, accentSoft, Icon }) => (
                <div
                  key={key}
                  className="group relative overflow-hidden rounded-2xl border bg-white/90 backdrop-blur-[2px]
                             transition-transform duration-150 ease-out hover:-translate-y-0.5 hover:scale-[1.03]
                             shadow-[0_6px_18px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)]"
                  style={{ borderColor: accentSoft }}
                >
                  {/* Left accent bar */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-1.5"
                    style={{ backgroundColor: accent }}
                  />

                  <div className="p-5 pl-6">
                    <div className="flex items-center gap-3">
                      <span
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full"
                        style={{ backgroundColor: accentSoft, color: accent }}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="text-xl lg:text-2xl font-bold tracking-tight">
                        {title}
                      </h3>
                    </div>

                    <p className="mt-3 text-slate-700 leading-relaxed text-base">
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
