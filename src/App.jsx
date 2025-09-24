import Banner from "./components/Banner";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Footer from "./components/Footer";
import Intro from "./components/Intro"
import HowIHelp from "./components/Services";

function App() {

  return (
    <>
      <div className="App text-gray-800 bg-gray-200 body-font">
        <Navbar />
        <Banner />
        <Intro />
        <HowIHelp />
        <About />
        <Contact />
        <Footer />
      </div>
    </>
  )
}

export default App
