
const celebrateBtn = document.getElementById("celebrateBtn");
const surpriseBtn = document.getElementById("surpriseBtn");
const surprise = document.getElementById("surprise");

const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

let particles = [];
let animationId = null;

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;

  canvas.width = window.innerWidth * ratio;
  canvas.height = window.innerHeight * ratio;

  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";

  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function celebrate() {
  if (animationId !== null) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }

  particles = [];

  const colors = [
    "#ffc857",
    "#ffffff",
    "#e8a64b",
    "#8db8ff",
    "#ff8ba7"
  ];

  for (let i = 0; i < 160; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: -20 - Math.random() * window.innerHeight,
      size: Math.random() * 7 + 3,
      speed: Math.random() * 3 + 2,
      drift: (Math.random() - 0.5) * 2,
      rotation: Math.random() * 360,
      color: colors[
        Math.floor(Math.random() * colors.length)
      ]
    });
  }

  animateConfetti();
}

function animateConfetti() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  particles.forEach(p => {
    p.y += p.speed;
    p.x += p.drift;
    p.rotation += 3;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation * Math.PI / 180);

    ctx.fillStyle = p.color;
    ctx.fillRect(
      -p.size / 2,
      -p.size / 2,
      p.size,
      p.size * 0.65
    );

    ctx.restore();
  });

  particles = particles.filter(
    p => p.y < window.innerHeight + 30
  );

  if (particles.length > 0) {
    animationId = requestAnimationFrame(animateConfetti);
  } else {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    animationId = null;
  }
}

celebrateBtn.addEventListener("click", () => {
  celebrateBtn.textContent = "🎉 Happy Birthday, Baba!";
  celebrate();
});

surpriseBtn.addEventListener("click", () => {
  const isOpen = surprise.classList.toggle("show");

  surpriseBtn.textContent = isOpen
    ? "Close Surprise ✨"
    : "Open Your Special Surprise 🎁";

  if (isOpen) {
    celebrate();
  }
});
