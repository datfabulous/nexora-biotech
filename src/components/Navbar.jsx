function Navbar() {
  return (
    <nav className="hero-nav" aria-label="Main navigation">
      <a href="#top" className="logo" aria-label="NEXORA home">
        NEXORA
      </a>

      <div className="nav-links" aria-label="Main section links">
        <a href="#innovation">Innovation</a>
        <a href="#research">Research</a>
        <a href="#capabilities">Capabilities</a>
        <a href="#impact">Impact</a>
      </div>

      <a href="#innovation" className="nav-cta">
        Explore
      </a>
    </nav>
  );
}

export default Navbar;