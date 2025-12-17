const currentUser = localStorage.getItem("currentUser");
if (!currentUser) location.href = "login.html";

let users = JSON.parse(localStorage.getItem("snake_users")) || {};
let bestScore = users[currentUser]?.bestScore || 0;

const BOARD_SIZE = 480;
const box = 20;

const startScreen = document.getElementById("start-screen");
const gameContainer = document.getElementById("game-container");

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const scoreEl = document.getElementById("score");
const bestEl = document.getElementById("best-score");

const pauseBtn = document.getElementById("pause-btn");

const gameOverModal = document.getElementById("game-over-modal");
const finalScoreText = document.getElementById("final-score");
const finalBestText = document.getElementById("final-best");

let snake = [];
let direction = "RIGHT";
let score = 0;
let paused = false;
let bonusTimer;
let gameLoop;

bestEl.innerText = bestScore;

let food, bonus = null, bomb = null;

function randomCell() {
    const cells = BOARD_SIZE / box;
    return {
        x: Math.floor(Math.random() * cells) * box,
        y: Math.floor(Math.random() * cells) * box
    };
}

function drawCircle(obj, color, glow) {
    ctx.shadowColor = color;
    ctx.shadowBlur = glow;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(obj.x + box / 2, obj.y + box / 2, box / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
}

function startGame() {
    snake = [{ x: 10 * box, y: 10 * box }];
    direction = "RIGHT";
    score = 0;
    paused = false;

    scoreEl.innerText = 0;
    pauseBtn.innerText = "⏸ توقف";

    food = randomCell();
    bonus = bomb = null;

    gameOverModal.style.display = "none";

    clearInterval(gameLoop);
    gameLoop = setInterval(drawGame, 110);
}

function drawGame() {
    if (paused) return;

    ctx.clearRect(0, 0, BOARD_SIZE, BOARD_SIZE);

    drawCircle(food, "red", 14);
    if (bonus) drawCircle(bonus, "yellow", 20);
    if (bomb) drawCircle(bomb, "black", 25);

    snake.forEach((s, i) => {
        ctx.fillStyle = i === 0 ? "#00eaff" : "#00aaff";
        ctx.fillRect(s.x, s.y, box, box);
    });

    let head = { ...snake[0] };

    if (direction === "LEFT") head.x -= box;
    if (direction === "RIGHT") head.x += box;
    if (direction === "UP") head.y -= box;
    if (direction === "DOWN") head.y += box;

    if (
        head.x < 0 || head.y < 0 ||
        head.x >= BOARD_SIZE || head.y >= BOARD_SIZE ||
        snake.some(s => s.x === head.x && s.y === head.y)
    ) return endGame();

    if (bomb && head.x === bomb.x && head.y === bomb.y)
        return endGame();

    if (head.x === food.x && head.y === food.y) {
        score++;
        updateBest();
        food = randomCell();

        if (score % 5 === 0) spawnBonus();
        if (score % 3 === 0) bomb = randomCell();
    }
    else if (bonus && head.x === bonus.x && head.y === bonus.y) {
        score += 2;
        snake.push({}, {});
        bonus = null;
        clearTimeout(bonusTimer);
        updateBest();
    }
    else {
        snake.pop();
    }

    scoreEl.innerText = score;
    snake.unshift(head);
}

function spawnBonus() {
    bonus = randomCell();
    clearTimeout(bonusTimer);
    bonusTimer = setTimeout(() => bonus = null, 5000);
}

function updateBest() {
    if (score > bestScore) {
        bestScore = score;
        bestEl.innerText = bestScore;

        users[currentUser].bestScore = bestScore;
        localStorage.setItem("snake_users", JSON.stringify(users));
    }
}

function endGame() {
    clearInterval(gameLoop);

    finalScoreText.innerText = score;
    finalBestText.innerText = bestScore;
    gameOverModal.style.display = "flex";
}

document.addEventListener("keydown", e => {
    if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(e.key)) {
        e.preventDefault();
    }

    if (e.key === "Escape") {
        paused = true;
        pauseBtn.innerText = "▶️ ادامه";
        return;
    }

    if (e.key === "Enter") {
        paused = false;
        pauseBtn.innerText = "⏸ توقف";
        return;
    }

    if (paused) return;

    if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

document.getElementById("start-btn").onclick = () => {
    startScreen.style.display = "none";
    gameContainer.style.display = "block";
    startGame();
};

document.getElementById("rules-btn").onclick =
    () => document.getElementById("rules-modal").style.display = "flex";

document.getElementById("rules-close").onclick =
    () => document.getElementById("rules-modal").style.display = "none";

document.getElementById("modal-restart").onclick = startGame;

document.getElementById("home-btn").onclick = () => location.reload();

pauseBtn.onclick = () => {
    paused = !paused;
    pauseBtn.innerText = paused ? "▶️ ادامه" : "⏸ توقف";
};

document.getElementById("logout-btn").onclick = () => {
    localStorage.removeItem("currentUser");
    location.href = "login.html";
};
