import Hero from "./components/Hero";
import Innovation from "./components/Innovation";
import Research from "./components/Research";
import CellExperience from "./components/CellExperience";
import Capabilities from "./components/Capabilities";
import Impact from "./components/Impact";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import DNAHelix from "./components/DNAHelix";

function App() {
  return (
    <>
      <div className="dna-background" aria-hidden="true">
        <DNAHelix />
      </div>
      <main>
        <Hero />
        <Innovation />
        <Research />
        <CellExperience />
        <Capabilities />
        <Impact />
        <FinalCTA />
        <Footer />
      </main>
    </>
  );
}

export default App;