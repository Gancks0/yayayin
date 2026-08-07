const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const fontSize = 25;
const cols = 10;
const spacing = canvas.width / cols;
const drops = Array.from({ length: cols }, () => Math.random() * canvas.height / fontSize);
let heartbeat = 0;
let hearts = [];

function draw() {
  ctx.fillStyle = "rgb(243, 178, 41)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00569D";
  ctx.font = fontSize + "px monospace";
  ctx.textAlign = "left";

  for (let i = 0; i < cols; i++) {
    const x = i * spacing + spacing / 40;  // corregido para centrar cada columna
    const y = drops[i] * fontSize;

    // Mostrar una cadena de "Te amo" continua por columna
    for (let j = 0; j < 30; j++) {
      const yy = y - j * fontSize;
      if (yy > 0 && yy < canvas.height) {
        ctx.fillText("", x, yy);
      }
    }

    drops[i] += 1;

    if (y > canvas.height + fontSize * 30) {
      drops[i] = 0;
    }
  }
// Estrellas
hearts.forEach((heart, i) => {
  ctx.save();
  ctx.globalAlpha = 1 - heart.life / 30;
  ctx.font = "160px serif";
  ctx.fillStyle = "#003366";      // Dorado
  ctx.shadowColor = "#003366";    // Brillo amarillo
  ctx.shadowBlur = 10;
  ctx.textAlign = "center";
  ctx.fillText("★", heart.x, heart.y);
  ctx.restore();

  heart.x += heart.vx;
  heart.y += heart.vy;
  heart.life++;

  if (heart.life > 30) hearts.splice(i, 1);
});
}

canvas.addEventListener("click", e => {
  hearts.push({
    x: e.clientX,
    y: e.clientY,
    vx: (Math.random() - 0.5) * 4,
    vy: (Math.random() - 0.5) * 4,
    life: 0
  });
});

setInterval(draw, 50);

window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});