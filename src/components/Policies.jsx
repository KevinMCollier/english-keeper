import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useLangLink from '../hooks/useLangLink';

export default function PoliciesAccordion({ policies }) {
  const { t: tPricing } = useTranslation('pricing');
  const { t: tFooter } = useTranslation('footer');
  const langLink = useLangLink();

  const sections = policies.sections || [];

  // helper to start all panels closed
  const makeClosedMap = (arr) =>
    arr.reduce((acc, _sec, i) => ((acc[i] = false), acc), {});

  const [open, setOpen] = useState(() => makeClosedMap(sections));

  useEffect(() => {
    setOpen(makeClosedMap(sections));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(sections)]);

  const toggle = (idx) => setOpen((o) => ({ ...o, [idx]: !o[idx] }));

  // ✅ language-aware disclosure link
  const disclosureHref = langLink('/commerce-disclosure');
  const disclosureLabel = tFooter('links.disclosure', 'Commercial Disclosure');

  return (
    <div className="mt-6 rounded-xl bg-white text-midnight-navy shadow-sm border border-gray-200">
      <div className="p-5">
        <div className="font-semibold text-base sm:text-lg">
          {policies.heading || tPricing('policies.heading', 'Policies & Notes')}
        </div>

        <div className="mt-3 divide-y divide-gray-200/70">
          {sections.map((sec, idx) => {
            const isOpen = !!open[idx];
            return (
              <section key={idx} className="py-2">
                <h4>
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    aria-expanded={isOpen}
                    aria-controls={`policies-panel-${idx}`}
                    className="w-full flex items-center justify-between gap-3 text-left"
                  >
                    <span className="text-graphite/90 text-sm font-semibold">
                      {sec.title || '—'}
                    </span>
                    <Chevron isOpen={isOpen} />
                  </button>
                </h4>

                <div
                  id={`policies-panel-${idx}`}
                  role="region"
                  className={`overflow-hidden transition-all duration-200 ease-out ${
                    isOpen ? 'max-h-[1000px] mt-1' : 'max-h-0'
                  }`}
                >
                  <ul className="list-disc pl-5 text-sm text-graphite leading-relaxed space-y-1">
                    {(sec.items || []).map((line, i) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: line }} />
                    ))}
                  </ul>
                </div>
              </section>
            );
          })}
        </div>

        {/* —— Legal / Commercial Disclosure link —— */}
        <div className="mt-4 pt-3 border-t border-gray-200/70">
          <p className="text-xs sm:text-sm text-graphite/70">
            <Link to={disclosureHref} className="hover:underline underline-offset-4">
              {disclosureLabel}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

PoliciesAccordion.propTypes = {
  policies: PropTypes.shape({
    heading: PropTypes.string,
    sections: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        items: PropTypes.arrayOf(PropTypes.string),
      })
    ),
  }).isRequired,
};

function Chevron({ isOpen }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 transition-transform ${
        isOpen ? 'rotate-180' : 'rotate-0'
      }`}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M6 8l4 4 4-4" />
    </svg>
  );
}

Chevron.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};
