const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d")!;

document.body.append(canvas);

let rects: {
  x: number;
  y: number;
  delay: number;
  duration: number;
  a: number;
  row: number;
  col: number;
}[] = [];
let SIZE = 0;
let SPACE = 0;
let width = 0;
let height = 0;
let columns = 0;
let rows = 0;
let mouseX = -1;
let mouseY = -1;
let smoothMouseX = 0;
let smoothMouseY = 0;
let img: ImageData;

function onMouseMove(e: MouseEvent) {
  mouseX = e.pageX;
  mouseY = e.pageY;
}

window.addEventListener(
  "mousemove",
  (e) => {
    onMouseMove(e);

    smoothMouseX = mouseX;
    smoothMouseY = mouseY;

    window.addEventListener("mousemove", onMouseMove);
  },
  { once: true }
);

function onResize() {
  rects = [];
  width = window.innerWidth;
  height = window.innerHeight;

  if (width < 768) {
    SIZE = 2;
    SPACE = 2;
  } else {
    SIZE = 3;
    SPACE = 2;
  }

  canvas.width = width;
  canvas.height = height;

  ctx.fillStyle = "#fff";

  columns = Math.ceil(width / SIZE / SPACE);
  rows = Math.ceil(height / SIZE / SPACE);

  for (let i = 0; i < columns * rows; i++) {
    const col = i % columns;
    const row = Math.floor(i / columns);

    rects.push({
      x: col * SPACE * SIZE,
      y: row * SPACE * SIZE,
      delay: Math.random() * 15000,
      duration: Math.random() * 5000 + 1000,
      a: 25,
      row,
      col,
    });
  }

  img = ctx.createImageData(width, height);
}

let then = performance.now() * -20;
function animate(now: number) {
  requestAnimationFrame(animate);

  const diff = now - then;
  then = now - diff;

  const data = img.data;

  if (mouseX !== -1) {
    smoothMouseX += (mouseX - smoothMouseX) * 0.13;
    smoothMouseY += (mouseY - smoothMouseY) * 0.13;
  }

  const dd = Math.min(
    Math.max(
      Math.hypot(smoothMouseX - mouseX, smoothMouseY - mouseY) * 0.7,
      25
    ),
    140
  );

  for (let i = 0; i < rects.length; i++) {
    const r = rects[i];
    const time = r.duration + r.delay;
    const delta = diff % time;
    const finished = delta > time;

    let alpha = delta > r.delay && !finished ? 50 : 25;

    if (mouseX != -1 && Math.random() > 0.9) {
      const d = Math.hypot(smoothMouseX - r.x, smoothMouseY - r.y);
      if (d < dd * Math.random()) {
        alpha = 100 * Math.random() + 25;
      }
    }

    if (r.a > 50) {
      r.a -= 1;
      alpha = r.a;
    }

    for (let j = 0; j <= SIZE; j++) {
      for (let k = 0; k <= SIZE; k++) {
        // const n = (r.x + j + (r.y + k + j) * width) * 4;
        const n = (r.x + j + (r.y + k) * width) * 4;
        data[n] = 255;
        data[n + 1] = 255;
        data[n + 2] = 255;
        data[n + 3] = alpha;
      }
    }

    r.a = alpha;
  }

  ctx.putImageData(img, 0, 0);
}

function start() {
  onResize();
  requestAnimationFrame(animate);
}

addEventListener("resize", onResize);
document.fonts.ready.then(start);
