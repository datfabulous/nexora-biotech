import gsap from "gsap";

export function animateHero() {
  const timeline = gsap.timeline();

  timeline
    .from(".logo", {
      y: -20,
      opacity: 0,
      duration: 0.8,
    })
    .from(".eyebrow", {
      y: 20,
      opacity: 0,
      duration: 0.6,
    })
    .from("h1", {
      y: 80,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
    })
    .from(".hero-description", {
      y: 30,
      opacity: 0,
      duration: 0.7,
    })
    .from(".hero-content a", {
      y: 20,
      opacity: 0,
      duration: 0.5,
    });

  return timeline;
}