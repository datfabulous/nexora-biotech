import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function CellExperience() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cell-copy",
        {
          opacity: 0,
          y: 18,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".research",
            start: "bottom 86%",
            end: "bottom 28%",
            scrub: 1.2,
          },
        }
      );

      gsap.fromTo(
        ".cell-visual",
        {
          opacity: 0,
          scale: 0.96,
          rotation: -6,
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".research",
            start: "bottom 90%",
            end: "bottom 18%",
            scrub: 1.3,
          },
        }
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".cell-experience",
          start: "top 18%",
          end: "+=1100",
          scrub: 1.5,
        },
      });

      tl.to(".cell-copy", {
        opacity: 0.98,
        y: 0,
        duration: 0.25,
      })
        .to(
          ".cell-visual",
          {
            scale: 1.04,
            duration: 1,
          },
          0
        )
        .to(
          ".cell-core",
          {
            scale: 1.18,
            duration: 1,
          },
          0
        )
        .to(
          ".cell-ring",
          {
            scale: 1.08,
            rotation: 90,
            duration: 1,
          },
          0
        )
        .to(
          ".cell-node",
          {
            scale: 1.08,
            duration: 1,
            stagger: 0.06,
          },
          0
        )
        .fromTo(
          ".cell-stage-two",
          {
            opacity: 0,
            y: 12,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
          },
          0.2
        );

      gsap.to(".signal", {
        opacity: 0.2,
        scaleX: 0.5,
        transformOrigin: "left center",
        duration: 1.2,
        stagger: 0.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="cell-experience">
      <div className="cell-copy">
        <p className="section-label">03 / BIOLOGICAL SYSTEMS</p>

        <h2 className="cell-title">
          Biology,
          <span>in motion.</span>
        </h2>

        <p className="cell-stage-two">
          We study how biological systems communicate,
          adapt and respond — then engineer new possibilities.
        </p>
      </div>

      <div className="cell-visual">
        <div className="cell-ring">
          <div className="cell-core"></div>

          <div className="cell-node node-one"></div>
          <div className="cell-node node-two"></div>
          <div className="cell-node node-three"></div>
          <div className="cell-node node-four"></div>
          <div className="signal signal-one"></div>
         <div className="signal signal-two"></div>
         <div className="signal signal-three"></div>
        </div>
      </div>
    </section>
  );
}

export default CellExperience;