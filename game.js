const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 480;
canvas.height = 270;

let player = { x: 50, y: 200, w: 32, h: 32, color: "cyan", energy: 100 };
let enemies = [{ x: 300, y: 200, w: 32, h: 32, color: "red" }];
let bullets = [];
let keys = {};

document.addEventListener("keydown", e => keys[e.code] = true);
document.addEventListener("keyup", e => keys[e.code] = false);

function update() {
  // Di chuyển nhân vật
  if (keys["ArrowLeft"]) player.x -= 3;
  if (keys["ArrowRight"]) player.x += 3;

  // Skill 1: Đấm (chạm quái gần)
  if (keys["KeyA"]) {
    enemies.forEach(e => {
      if (Math.abs(player.x - e.x) < 40) e.color = "orange";
    });
  }

  // Skill 2: Bắn
  if (keys["KeyS"]) {
    if (player.energy >= 10) {
      bullets.push({ x: player.x + 30, y: player.y + 10, w: 8, h: 4, color: "yellow" });
      player.energy -= 10;
    }
  }

  // Skill 3: Hồi năng lượng
  if (keys["KeyD"]) {
    if (player.energy < 100) player.energy += 0.5;
  }

  // Cập nhật đạn
  bullets.forEach(b => b.x += 5);
  bullets = bullets.filter(b => b.x < canvas.width);

  // Va chạm đạn - quái
  bullets.forEach(b => {
    enemies.forEach(e => {
      if (b.x < e.x + e.w && b.x + b.w > e.x && b.y < e.y + e.h && b.y + b.h > e.y) {
        e.color = "gray";
      }
    });
  });
}

function draw() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.w, player.h);

  enemies.forEach(e => {
    ctx.fillStyle = e.color;
    ctx.fillRect(e.x, e.y, e.w, e.h);
  });

  bullets.forEach(b => {
    ctx.fillStyle = b.color;
    ctx.fillRect(b.x, b.y, b.w, b.h);
  });

  // Thanh năng lượng
  ctx.fillStyle = "lime";
  ctx.fillRect(10, 10, player.energy * 2, 10);
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
