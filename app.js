const nameArray = [];

document.getElementById("pick").addEventListener("click", () => {
  // Get the input value
  const names = document.getElementById("names").value;

  // Separate the names and push them into the array
  const nameArray = names.split("/");

  // Get a random name, the winner
  let winner = nameArray[Math.floor(Math.random() * nameArray.length)];

  winner = `🎉 ${winner} 🎉`;

  // Display winner
  document.getElementById("world").classList.add("open");
  document.getElementById("winner").classList.add("open");
  document.getElementById("close").classList.add("open");
  document.getElementById("winner").textContent = winner;
});

document.getElementById("close").addEventListener("click", () => {
  document.getElementById("world").classList.remove("open");
  document.getElementById("winner").classList.remove("open");
  document.getElementById("close").classList.remove("open");
});

// Confetti
(() => {
  const NUM_CONFETTI = 350;
  const COLORS = [
    [85, 71, 106],
    [174, 61, 99],
    [219, 56, 83],
    [244, 92, 68],
    [248, 182, 70],
  ];

  const PI_2 = Math.PI * 2;

  const canvas = document.getElementById("world");
  const context = canvas.getContext("2d");

  let w = 0;
  let h = 0;

  const resizeWindow = () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  };

  window.addEventListener("resize", resizeWindow, false);
  window.onload = () => setTimeout(resizeWindow, 0);

  const range = (a, b) => (b - a) * Math.random() + a;

  const drawCircle = (x, y, r, style) => {
    context.beginPath();
    context.arc(x, y, r, 0, PI_2, false);
    context.fillStyle = style;
    context.fill();
  };

  let xpos = 0.5;
  document.onmousemove = (e) => {
    xpos = e.pageX / w;
  };

  const Confetti = class {
    constructor() {
      this.style = COLORS[Math.floor(range(0, COLORS.length))];
      this.rgb = `rgba(${this.style.join(",")}`;
      this.r = Math.floor(range(2, 6));
      this.r2 = this.r * 2;
      this.replace();
    }

    replace() {
      this.opacity = 0;
      this.dop = 0.03 * range(1, 4);
      this.x = range(-this.r2, w - this.r2);
      this.y = range(-20, h - this.r2);
      this.xmax = w - this.r;
      this.ymax = h - this.r;
      this.vx = range(0, 2) + 8 * xpos - 5;
      this.vy = 0.7 * this.r + range(-1, 1);
    }

    draw() {
      this.x += this.vx;
      this.y += this.vy;
      this.opacity += this.dop;

      if (this.opacity > 1) {
        this.opacity = 1;
        this.dop *= -1;
      }

      if (this.opacity < 0 || this.y > this.ymax) {
        this.replace();
      }

      if (this.x < 0 || this.x > this.xmax) {
        this.x = (this.x + this.xmax) % this.xmax;
      }

      drawCircle(
        Math.floor(this.x),
        Math.floor(this.y),
        this.r,
        `${this.rgb},${this.opacity})`
      );
    }
  };

  const confetti = Array.from({ length: NUM_CONFETTI }, () => new Confetti());

  const step = () => {
    context.clearRect(0, 0, w, h);
    confetti.forEach((c) => c.draw());
    requestAnimationFrame(step);
  };

  step();
})();
