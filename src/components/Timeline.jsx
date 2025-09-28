import { useTranslation } from 'react-i18next';

export default function Timeline() {
  const { t } = useTranslation('timeline');

  // i18next returns objects if returnObjects: true; make sure it's an array
  const raw = t('items', { returnObjects: true });
  const items = Array.isArray(raw) ? raw : Object.values(raw ?? []);

  return (
    <section id="timeline" className="bg-off-white text-blue py-16">
      <div className="container mx-auto px-5">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8">{t('heading')}</h2>

        <ol className="relative border-l border-slate-300 pl-6">
          {items.map((it, idx) => (
            <li key={idx} className="mb-10 ml-2">
              <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue text-white text-xs font-bold">
                {it.year}
              </span>
              <h3 className="text-lg sm:text-xl font-semibold">{it.title}</h3>
              {it.body && (
                <p className="mt-1 text-slate-700 leading-relaxed">
                  {it.body}
                </p>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
