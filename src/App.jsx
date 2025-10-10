import { useEffect, useLayoutEffect } from 'react';
import { Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import Banner from "./components/Banner";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Footer from "./components/Footer";
import Intro from "./components/Intro";
import Sessions from "./components/Sessions";
import Approach from "./components/Approach";
import Pricing from "./components/Pricing";
import MadeFor from "./components/Madefor";
import WhyMe from "./components/WhyMe";
import CommerceDisclosure from "./CommerceDisclosure";
import Privacy from "./Privacy";
import LanguageDetector from './TheLanguageDetector';
// import NotFound from "./NotFound"; // (optional)

function useScrollToHash() {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [hash]);
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash) return; // hash scroller will handle it
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return null;
}

function Home() {
  useScrollToHash();
  return (
    <div className="App">
      <Navbar />
      <Banner />
      <Intro />
      <Sessions />
      <MadeFor />
      <WhyMe />
      <Pricing />
      <Approach />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

// Layout so LanguageDetector runs for every lang-prefixed route
function LangLayout() {
  return (
    <>
      <LanguageDetector />
      <Outlet />
    </>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Redirect root to default language */}
        <Route path="/" element={<Navigate to="/ja" replace />} />

        {/* Redirect legacy links for safety */}
        <Route path="/commerce-disclosure" element={<Navigate to="/ja/commerce-disclosure" replace />} />
        <Route path="/privacy" element={<Navigate to="/ja/privacy" replace />} />

        {/* Language-aware routes */}
        <Route path=":lng" element={<LangLayout />}>
          <Route index element={<Home />} />
          <Route path="commerce-disclosure" element={<CommerceDisclosure />} />
          <Route path="privacy" element={<Privacy />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Route>
      </Routes>
    </>
  );
}
