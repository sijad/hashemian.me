import "./style.scss";

let anim: Animation | null = null;

function handleToggleTheme(el: HTMLElement) {
  localStorage.theme = localStorage.theme === "light" ? "dark" : "light";

  const { top, width, left } = el.getBoundingClientRect();

  const ww = window.innerWidth;
  const wh = window.innerHeight;

  const w = width / 2;

  if (anim) {
    anim.pause();
    anim.reverse();
    anim.play();
    return;
  }

  const currentPath =
    anim && window.getComputedStyle(document.body, "::after").clipPath;

  const clipPath = [
    currentPath || `circle(0px at ${left + w}px ${top + w}px)`,
    `circle(${ww > wh ? ww : wh}px at ${left + w}px ${top + w}px)`,
  ];

  anim = document.body.animate(
    {
      clipPath,
    },
    {
      duration: 650,
      easing: "ease-in-out",
      direction: localStorage.theme === "light" ? "normal" : "reverse",
      pseudoElement: "::after",
    }
  );

  anim.addEventListener("finish", function () {
    if (anim && anim === this) {
      (window as any).applyTheme();

      anim = null;
    }
  });
}

const toggleButton = document.querySelector("button");

toggleButton?.addEventListener("click", (e) => {
  handleToggleTheme(e.currentTarget as HTMLElement);
});

function revealWords() {
  const h1 = document.querySelector("h1");
  const p = document.querySelector("p");

  if (!h1 || !p) {
    return;
  }

  split(h1);
  split(p);

  const spans = document.querySelectorAll("h1 > span, p > span");

  spans.forEach((span, i) => {
    const inner = span.firstElementChild;

    inner?.animate(
      {
        transform: ["translateY(150%)", "translateY(0%)"],
      },
      {
        delay: 250 + i * 80,
        duration: 400,
        fill: "forwards",
        easing: "cubic-bezier(0.65, 0, 0.35, 1)",
      }
    );
  });

  function split(el: HTMLElement) {
    const orig = el.innerText;
    el.innerHTML = orig
      .split(" ")
      .map((w) => `<span><span>${w}</span></span>`)
      .join(" ");
    el.style.opacity = "1";
    return orig;
  }
}

revealWords();
