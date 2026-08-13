import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const researchAreas = [
  {
    number: "01",
    title: "Genomic Intelligence",
    description:
      "Decoding complex biological systems to reveal patterns that can guide the next generation of therapies.",
  },
  {
    number: "02",
    title: "Cellular Engineering",
    description:
      "Designing programmable cellular systems capable of responding to biological signals with precision.",
  },
  {
    number: "03",
    title: "Precision Therapeutics",
    description:
      "Transforming biological insight into targeted approaches designed around individual cellular behaviour.",
  },
];

function Research() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = document.querySelector(".research-track");

      if (!track) {
        return;
      }

      const isMobile = window.matchMedia("(max-width: 768px)").matches;

      if (!isMobile) {
        const travelDistance = Math.max(track.scrollWidth - window.innerWidth + 260, 600);

        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: ".research",
            start: "top top",
            end: () => `+=${travelDistance}`,
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        });
      }

      gsap.to(".research-header", {
        y: -90,
        opacity: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: ".research",
          start: "top 14%",
          end: "bottom 26%",
          scrub: 1.4,
        },
      });

      gsap.to(".research-track", {
        y: -8,
        opacity: 0.92,
        ease: "none",
        scrollTrigger: {
          trigger: ".research",
          start: "top 22%",
          end: "bottom 18%",
          scrub: 1.4,
        },
      });

      gsap.from(".research-card", {
        opacity: 0.2,
        y: 36,
        stagger: 0.18,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".research",
          start: "top 82%",
          end: "bottom 16%",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="research" id="research">
      <div className="research-header">
        <p className="section-label">02 / RESEARCH</p>

        <h2>
          Science that
          <span>moves forward.</span>
        </h2>
      </div>

      <div className="research-track">
        {researchAreas.map((area) => (
          <article className="research-card" key={area.number}>
            <span>{area.number}</span>

            <div>
              <h3>{area.title}</h3>

              <p>{area.description}</p>
            </div>

            <div className="card-arrow">↗</div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Research;