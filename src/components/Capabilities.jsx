import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const capabilityData = [
  {
    number: "01",
    title: "Genomic Intelligence",
    description:
      "Mapping biological complexity into actionable insight to guide translational decision-making.",
  },
  {
    number: "02",
    title: "Cellular Engineering",
    description:
      "Designing programmable cellular behaviour for resilient, responsive therapeutic systems.",
  },
  {
    number: "03",
    title: "Precision Therapeutics",
    description:
      "Turning biological targets into highly specific interventions with measurable clinical intent.",
  },
  {
    number: "04",
    title: "Biological Data Systems",
    description:
      "Connecting multi-omic datasets and experimental signal to create a living systems map.",
  },
];

function Capabilities() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".capability-card", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".capabilities",
          start: "top 75%",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="capabilities" id="capabilities">
      <div className="capabilities-header">
        <p className="section-label">04 / CAPABILITIES</p>
        <h2>Engineering biology with precision.</h2>
      </div>

      <div className="capability-grid">
        {capabilityData.map((capability) => (
          <article className="capability-card" key={capability.number}>
            <div className="capability-topline">
              <span className="capability-number">{capability.number}</span>
              <span className="capability-arrow" aria-hidden="true">
                ↗
              </span>
            </div>

            <div className="capability-body">
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Capabilities;