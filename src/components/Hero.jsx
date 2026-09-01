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

      gsap.to(".dna-background", {
        scale: 1.2,
        opacity: 0.7,
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
    </section>
  );
}

export default Hero;
