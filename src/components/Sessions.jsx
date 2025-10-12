import { useTranslation } from 'react-i18next';
import CalendlyButton from './CalendlyButton';
import SessionFlow from './SessionFlow';
import Modules from './Modules';

export default function Sessions() {
  const { t } = useTranslation(['pricing', 'sessions']);

  // Pull Calendly URLs from pricing.json items
  const items = t('items', { ns: 'pricing', returnObjects: true });
  const arr = Array.isArray(items) ? items : [];
  const byKey = Object.fromEntries(arr.map((i) => [i.key, i.url]));
  const urlOnline = byKey['online50'] || '';
  const urlInPerson = byKey['inperson'] || '';
  // const urlGroup = byKey['group80'] || '';

  // Lesson flow stages from i18n
  const stages = t('flow.stages', { ns: 'sessions', returnObjects: true });
  const stageList = Array.isArray(stages) ? stages : [];

  // Modules from i18n
  const moduleGroups = t('modules.groups', { ns: 'sessions', returnObjects: true });
  const modules = Array.isArray(moduleGroups) ? moduleGroups : [];

  return (
    <section id="sessions" className="border-t border-white/10 bg-white text-midnight-navy font-body">
      <div className="container mx-auto max-w-6xl px-6 sm:px-8 py-16 sm:py-20 space-y-12">

        {/* Header */}
        <div className="max-w-3xl">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight mb-2">
            {t('title', { ns: 'sessions' })}
          </h2>
          <p className="text-lg text-graphite">
            {t('subtitle', { ns: 'sessions' })}
          </p>
        </div>

        {/* Lesson Flow (interactive) */}
        <SessionFlow stages={stageList} />
        <Modules modules={modules} />

        {/* Lesson Format & Booking */}
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h3 className="font-display font-bold text-2xl">{t('format.title', { ns: 'sessions' })}</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* 1:1 Private */}
            <div className="rounded-xl bg-white p-5 ring-1 ring-black/5 space-y-3">
              <h4 className="font-semibold text-lg">{t('format.oneToOne.title', { ns: 'sessions' })}</h4>
              <p className="text-graphite">{t('format.oneToOne.blurb', { ns: 'sessions' })}</p>
              <div className="flex flex-wrap gap-3 pt-1">
                {urlInPerson ? (
                  <CalendlyButton
                    url={urlInPerson}
                    label={t('buttons.bookInPerson', { ns: 'pricing', defaultValue: 'Book 1:1 In-Person' })}
                    color="caramel"
                    className="whitespace-nowrap text-sm py-2"
                  />
                ) : null}
                {urlOnline ? (
                  <CalendlyButton
                    url={urlOnline}
                    label={t('buttons.bookOnline', { ns: 'pricing', defaultValue: 'Book 1:1 Online' })}
                    color="caramel"
                    className="whitespace-nowrap text-sm py-2"
                  />
                ) : null}
              </div>
            </div>

            {/* Group */}
            <div className="rounded-xl bg-white p-5 ring-1 ring-black/5 space-y-3">
              <h4 className="font-semibold text-lg">{t('format.group.title', { ns: 'sessions' })}</h4>
              <p className="text-graphite">{t('format.group.blurb', { ns: 'sessions' })}</p>
              <div className="flex gap-3 pt-1">
                <CalendlyButton
                  url="#"
                  label={t('format.group.comingSoon', { ns: 'sessions' })}
                  disabled
                  disabledClassName="bg-[#E2B985] hover:bg-[#E2B985] text-white"
                  className="whitespace-nowrap text-sm py-2"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
