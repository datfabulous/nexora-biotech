import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./Navbar";

gsap.registerPlugin(ScrollTrigger);

function Hero() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      const molecule = document.querySelector(".molecule");

      const moveMolecule = (event) => {
        if (!molecule) return;

        const x = (event.clientX / window.innerWidth - 0.5) * 30;
        const y = (event.clientY / window.innerHeight - 0.5) * 30;

        gsap.to(molecule, {
          x,
          y,
          duration: 1,
          ease: "power3.out",
        });
      };

      window.addEventListener("mousemove", moveMolecule);

      tl.from(".logo", {
        y: -20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          ".eyebrow",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          "h1",
          {
            y: 80,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
          },
          "-=0.2"
        )
        .from(
          ".hero-description",
          {
            y: 30,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.5"
        )
        .from(
          ".hero-content a",
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.3"
        );

      gsap.to(".dna-strand", {
        rotation: "+=360",
        duration: 20,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".hero-content", {
        y: -120,
        opacity: 0,
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".molecule", {
        scale: 1.5,
        rotation: 90,
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      return () => {
        window.removeEventListener("mousemove", moveMolecule);
      };
    });

    return () => ctx.revert();
  }, []);

  const dnaPairs = Array.from({ length: 9 }, (_, index) => index);

  return (
    <section className="hero" id="top">
      <Navbar />

      <div className="hero-content">
        <p className="eyebrow">BIOSCIENCE / 01</p>

        <h1>
          Engineering
          <br />
          biology for
          <br />
          the next generation.
        </h1>

        <p className="hero-description">
          We engineer biological systems to create a healthier,
          more precise future.
        </p>

        <a href="#innovation">Explore our research →</a>
      </div>

      <div className="molecule" aria-hidden="true">
        <svg className="dna-strand" viewBox="0 0 260 620" role="presentation">
          <defs>
            <linearGradient id="strandA" x1="0%" x2="100%" y1="0%" y2="0%">
              <stop offset="0%" stopColor="#8fe9ff" />
              <stop offset="50%" stopColor="#7ef5d8" />
              <stop offset="100%" stopColor="#8fe9ff" />
            </linearGradient>
            <linearGradient id="strandB" x1="100%" x2="0%" y1="0%" y2="0%">
              <stop offset="0%" stopColor="#d9b8ff" />
              <stop offset="50%" stopColor="#b98cff" />
              <stop offset="100%" stopColor="#d9b8ff" />
            </linearGradient>
          </defs>

          <path
            className="dna-backbone dna-backbone-left"
            d="M 90 20 C 32 120, 38 210, 90 300 S 170 480, 94 600"
          />
          <path
            className="dna-backbone dna-backbone-right"
            d="M 170 20 C 228 120, 222 210, 170 300 S 90 480, 166 600"
          />

          {dnaPairs.map((pair) => {
            const y = 56 + pair * 58;
            const leftX = 90 + Math.sin(pair * 0.8) * 22;
            const rightX = 170 - Math.sin(pair * 0.8) * 22;
            const isAccent = pair % 2 === 0;

            return (
              <g key={pair} className="dna-pair-group">
                <line
                  className={`dna-rung ${isAccent ? "cyan" : "violet"}`}
                  x1={leftX}
                  y1={y}
                  x2={rightX}
                  y2={y + 12}
                />
                <circle className="dna-node dna-node-left" cx={leftX} cy={y} r="5.5" />
                <circle className="dna-node dna-node-right" cx={rightX} cy={y + 12} r="5.5" />
              </g>
            );
          })}
        </svg>
      </div>
    </section>
  );
}

export default Hero;
