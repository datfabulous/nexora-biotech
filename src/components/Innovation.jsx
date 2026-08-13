import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Innovation() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".innovation h2", {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".innovation",
          start: "top 75%",
        },
      });

      gsap.from(".innovation-copy", {
        y: 80,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".innovation-copy",
          start: "top 80%",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="innovation" id="innovation">
      <div className="innovation-intro">
        <p className="section-label">01 / INNOVATION</p>

        <h2>
          Biology is no longer
          <span>something we only observe.</span>
        </h2>
      </div>

      <div className="innovation-grid">
        <div className="innovation-number">
          01
        </div>

        <div className="innovation-copy">
          <p>
            NEXORA develops biological technologies that allow
            researchers to understand, engineer and improve
            complex cellular systems.
          </p>

          <p>
            From genomic intelligence to precision therapeutics,
            we turn biological insight into measurable impact.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Innovation;