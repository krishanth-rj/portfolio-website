// light mode theme toggle
document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("light");
});

// hamburger menu
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  nav.style.display = nav.style.display === "flex" ? "none" : "flex";
});

// ripple effect
document.querySelectorAll(".ripple").forEach(btn => {
  btn.addEventListener("click", function (e) {
    const span = document.createElement("span");
    const rect = this.getBoundingClientRect();
    span.style.left = e.clientX - rect.left + "px";
    span.style.top = e.clientY - rect.top + "px";
    this.appendChild(span);
    setTimeout(() => span.remove(), 600);
  });
});

// asteroid animation
const canvas = document.getElementById("asteroidCanvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

let asteroids = [];

function createAsteroid() {
  return {
    x: Math.random() * canvas.width + 300,
    y: Math.random() * -canvas.height,
    speed: Math.random() * 4 + 3,
    size: Math.random() * 2 + 2,
  };
}

for (let i = 0; i < 80; i++) asteroids.push(createAsteroid());

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  asteroids.forEach(a => {
    ctx.strokeStyle = "rgba(255,140,122,0.45)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(a.x + a.speed * 7, a.y - a.speed * 7);
    ctx.stroke();

    ctx.fillStyle = "#ff8c7a";
    ctx.beginPath();
    ctx.arc(a.x, a.y, a.size, 0, Math.PI * 2);
    ctx.fill();

    a.x -= a.speed;
    a.y += a.speed;

    if (a.y > canvas.height || a.x < -100) {
      Object.assign(a, createAsteroid());
    }
  });

  requestAnimationFrame(animate);
}

animate();

