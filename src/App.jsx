import { useEffect, useLayoutEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'
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
import CommerceDisclosure from "./CommerceDisclosure"; // NEW
import Privacy from "./Privacy";
// import NotFound from "./NotFound"; // (optional)

function useScrollToHash() {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    // wait a frame so the sections exist
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [hash]);
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    // If there’s a hash (like /#pricing), let your hash scroller handle it.
    if (hash) return;
    // Otherwise, always reset to the top on route change.
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

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/commerce-disclosure" element={<CommerceDisclosure />} />
        <Route path="privacy" element={<Privacy />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
}
