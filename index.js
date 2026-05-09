
// https://gsap.com/docs/v3/Plugins/SplitText/
// we have to register SplitText so we can split the title into characters
gsap.registerPlugin(SplitText);

// we split the title
let split = SplitText.create(".split", { type: "words, chars" });

// we animate each character in with a stagger
gsap.from(split.chars, {
  duration: 1,
  y: 100,
  autoAlpha: 0,
  stagger: 0.05
});

//------

const zone     = document.querySelector(".zone");
const btn      = document.querySelector(".btn-start");
const strength = 0.4;

// https://demos.gsap.com/demo/magnetic-button-overwrite-modes/

// wiggle loop — button rocks back and forth
gsap.to(btn, {
  rotation: 12,
  duration: 0.15,
  repeat: -1,
  yoyo: true,
  // got sine.inOut from//
  // https://gsap.com/docs/v3/Eases/
  ease: "sine.inOut"
});

// magnetic pull — button follows the mouse inside the zone
zone.addEventListener("mousemove", (e) => {
  const rect = zone.getBoundingClientRect();
  const x = gsap.utils.mapRange(rect.left, rect.right, -rect.width  / 2, rect.width  / 2, e.clientX);
  const y = gsap.utils.mapRange(rect.top,  rect.bottom,-rect.height / 2, rect.height / 2, e.clientY);

  gsap.to(btn, {
    x: x * strength,
    y: y * strength,
    duration: 0.4,
    ease: "power2.out",
    overwrite: "auto"
  });
});

// snap back when mouse leaves
zone.addEventListener("mouseleave", () => {
  gsap.to(btn, {
    x: 0,
    y: 0,
    duration: 0.7,
    ease: "elastic.out(1, 0.4)",
    overwrite: "auto"
  });
});