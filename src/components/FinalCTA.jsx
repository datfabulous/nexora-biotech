import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function FinalCTA() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".final-cta .cta-copy > *", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".final-cta",
          start: "top 75%",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="final-cta" id="final-cta" aria-labelledby="final-cta-heading">
      <div className="cta-copy">
        <p className="section-label">06 / COLLABORATION</p>
        <h2 id="final-cta-heading">Build what biology makes possible.</h2>
        <p className="cta-supporting">
          Partner with NEXORA to turn biological insight into measurable possibility.
        </p>

        <div className="cta-actions">
          <a href="#top" className="primary-cta">
            Start a conversation →
          </a>
          <a href="#research" className="secondary-cta">
            Explore research
          </a>
        </div>
      </div>
    </section>
  );
}

export default FinalCTA;