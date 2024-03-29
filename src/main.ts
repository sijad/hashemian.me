import "@fontsource/londrina-solid/400.css";
import "@fontsource/londrina-sketch/400.css";
import "@fontsource/barlow-condensed/400.css";
import "./style.scss";
import "./bg";

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).applyTheme();

      anim = null;
    }
  });
}

const toggleButton = document.querySelector("button");

toggleButton?.addEventListener("click", (e) => {
  handleToggleTheme(e.currentTarget as HTMLElement);
});

document.fonts.ready.then(() => {
  requestAnimationFrame(() => {
    document.body.classList.add("fonts-loaded");
  });
});
