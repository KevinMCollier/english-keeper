// import { useEffect, useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import LanguageToggle from './LanguageToggle';

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const { t } = useTranslation('navbar');

//   // Optional: lock body scroll when the mobile menu is open
//   useEffect(() => {
//     const original = document.body.style.overflow;
//     if (open) document.body.style.overflow = 'hidden';
//     else document.body.style.overflow = original || '';
//     return () => (document.body.style.overflow = original || '');
//   }, [open]);

//   const closeMenu = () => setOpen(false);

//   return (
//     <header className="bg-orange sticky top-0 z-20 w-full font-body">
//       {/* Inner bar */}
//       <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-5 h-14 flex items-center overflow-x-hidden">
//         {/* Brand + service tagline */}
//         <div className="shrink-0 flex items-center gap-2 whitespace-nowrap">
//           <a
//             href="#banner"
//             className="font-brand text-off-white text-2xl sm:text-3xl leading-tight tracking-wide hover:opacity-90 transition"
//           >
//             {t('brand')}
//           </a>
//           <span className="hidden sm:inline text-off-white/80 text-xs sm:text-sm leading-tight">
//             | {t('serviceTag')}
//           </span>
//         </div>


//         {/* Divider */}
//         <span className="hidden sm:inline-block h-4 w-px bg-off-white/25 mx-4 sm:mx-6" />

//         {/* Desktop links */}
//         <nav className="hidden md:flex items-center gap-6 text-off-white">
//           <a href="#sessions" className="hover:underline underline-offset-4">
//             {t('sessions')}
//           </a>
//           <a href="#about" className="hover:underline underline-offset-4">
//             {t('about')}
//           </a>
//           <a href="#contact" className="hover:underline underline-offset-4">
//             {t('contact')}
//           </a>
//         </nav>

//         <div className="flex-1" />

//         {/* Language toggle (desktop) */}
//         <div className="hidden sm:block">
//           <LanguageToggle />
//         </div>

//         {/* Desktop CTA */}
//         <a
//           href="#pricing"
//           className="ml-3 hidden md:inline-block inline-flex items-center justify-center rounded-full text-sm font-semibold transition px-4 py-1.5 text-off-white border-2 border-off-white/70 hover:bg-off-white hover:text-black"
//         >
//           {t('contact:cta.call')}
//         </a>

//         {/* Hamburger */}
//         <button
//           className="md:hidden ml-3 text-off-white hover:opacity-90 transition"
//           onClick={() => setOpen((v) => !v)}
//           aria-label="Toggle menu"
//           aria-expanded={open}
//           aria-controls="mobile-menu"
//         >
//           <span className="block text-2xl leading-none select-none">☰</span>
//         </button>
//       </div>

//       {/* Mobile dropdown */}
//       {open && (
//         <nav
//           id="mobile-menu"
//           className="md:hidden bg-orange text-off-white font-body border-t border-white/15"
//         >
//           <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-5 py-4 space-y-4">
//             <a
//               href="#sessions"
//               onClick={closeMenu}
//               className="block w-full text-lg hover:underline underline-offset-4"
//             >
//               {t('sessions')}
//             </a>
//             <a
//               href="#about"
//               onClick={closeMenu}
//               className="block w-full text-lg hover:underline underline-offset-4"
//             >
//               {t('about')}
//             </a>
//             <a
//               href="#contact"
//               onClick={closeMenu}
//               className="block w-full text-lg hover:underline underline-offset-4"
//             >
//               {t('contact')}
//             </a>

//             {/* Mobile language toggle */}
//             <div className="pt-1">
//               <LanguageToggle />
//             </div>

//             {/* Mobile CTA (full-width button; closes menu first) */}
//             <a
//               href="#pricing"
//               className="ml-3 hidden md:inline-block inline-flex items-center justify-center rounded-full text-sm font-semibold transition px-4 py-1.5 text-off-white border-2 border-off-white/70 hover:bg-off-white hover:text-black"
//             >
//               {t('contact:cta.call')}
//             </a>
//           </div>
//         </nav>
//       )}
//     </header>
//   );
// }



import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import LanguageToggle from './LanguageToggle';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation('navbar');
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  useEffect(() => {
    const original = document.body.style.overflow;
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = original || '';
    return () => (document.body.style.overflow = original || '');
  }, [open]);

  const closeMenu = () => setOpen(false);

  // helper to build links that work from any route
  const link = (hash) => (isHome ? hash : `/${hash}`);

  return (
    <header className="bg-orange sticky top-0 z-20 w-full font-body">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-5 h-14 flex items-center overflow-x-hidden">
        <div className="shrink-0 flex items-center gap-2 whitespace-nowrap">
          <a
            href={isHome ? '#banner' : '/#banner'}
            className="font-brand text-off-white text-2xl sm:text-3xl leading-tight tracking-wide hover:opacity-90 transition"
          >
            {t('brand')}
          </a>
          <span className="hidden sm:inline text-off-white/80 text-xs sm:text-sm leading-tight">
            | {t('serviceTag')}
          </span>
        </div>

        <span className="hidden sm:inline-block h-4 w-px bg-off-white/25 mx-4 sm:mx-6" />

        <nav className="hidden md:flex items-center gap-6 text-off-white">
          <a href={link('#sessions')} className="hover:underline underline-offset-4">
            {t('sessions')}
          </a>
          <a href={link('#about')} className="hover:underline underline-offset-4">
            {t('about')}
          </a>
          <a href={link('#contact')} className="hover:underline underline-offset-4">
            {t('contact')}
          </a>
        </nav>

        <div className="flex-1" />

        <div className="hidden sm:block">
          <LanguageToggle />
        </div>

        <a
          href={link('#pricing')}
          className="ml-3 hidden md:inline-block inline-flex items-center justify-center rounded-full text-sm font-semibold transition px-4 py-1.5 text-off-white border-2 border-off-white/70 hover:bg-off-white hover:text-black"
        >
          {t('contact:cta.call')}
        </a>

        <button
          className="md:hidden ml-3 text-off-white hover:opacity-90 transition"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <span className="block text-2xl leading-none select-none">☰</span>
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" className="md:hidden bg-orange text-off-white font-body border-t border-white/15">
          <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-5 py-4 space-y-4">
            <a href={link('#sessions')} onClick={closeMenu} className="block w-full text-lg hover:underline underline-offset-4">
              {t('sessions')}
            </a>
            <a href={link('#about')} onClick={closeMenu} className="block w-full text-lg hover:underline underline-offset-4">
              {t('about')}
            </a>
            <a href={link('#contact')} onClick={closeMenu} className="block w-full text-lg hover:underline underline-offset-4">
              {t('contact')}
            </a>
            <div className="pt-1">
              <LanguageToggle />
            </div>
            {/* Optional: show CTA in mobile menu too */}
            <a href={link('#pricing')} onClick={closeMenu} className="block w-full text-lg underline underline-offset-4">
              {t('contact:cta.call')}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
