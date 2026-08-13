import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 85, suffix: "%", label: "Systems mapped" },
  { value: 24, suffix: "", label: "Active research programs" },
  { value: 12, suffix: "", label: "Global research partners" },
  { value: 4.8, suffix: "M", label: "Biological data points" },
];

function Impact() {
  const statsRef = useRef(null);

  useLayoutEffect(() => {
    const impactSection = statsRef.current;

    if (!impactSection) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      const counterEls = gsap.utils.toArray(impactSection.querySelectorAll(".impact-value"));
      const cardEls = gsap.utils.toArray(impactSection.querySelectorAll(".impact-card"));

      counterEls.forEach((el) => {
        const target = Number(el.dataset.value || 0);
        const decimals = target % 1 !== 0 ? 1 : 0;

        gsap.fromTo(
          el,
          { textContent: 0 },
          {
            textContent: target,
            duration: 1.5,
            ease: "power2.out",
            snap: { textContent: decimals ? 0.1 : 1 },
            scrollTrigger: {
              trigger: impactSection,
              start: "top 75%",
            },
            onUpdate() {
              const numeric = Number(el.textContent || 0);
              const suffix = el.dataset.suffix || "";
              el.textContent = `${numeric.toFixed(decimals)}${suffix}`;
            },
          }
        );
      });

      gsap.from(cardEls, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: impactSection,
          start: "top 70%",
        },
      });
    }, impactSection);

    return () => ctx.revert();
  }, []);

  return (
    <section className="impact" id="impact" ref={statsRef}>
      <div className="impact-header">
        <p className="section-label">05 / IMPACT</p>
        <h2>Measured in motion.</h2>
      </div>

      <div className="impact-grid">
        {stats.map((stat) => (
          <div className="impact-card" key={stat.label}>
            <div className="impact-value-wrap">
              <span
                className="impact-value"
                data-value={stat.value}
                data-suffix={stat.suffix}
              >
                0{stat.suffix}
              </span>
            </div>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Impact;