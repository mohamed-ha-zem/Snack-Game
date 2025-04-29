let size = 30;
let gameBoard = document.querySelector("#gameBoard");

// Build the game board
for (let i = 0; i < size * size; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    gameBoard.appendChild(cell);
}

// Snake, food, and game state
let snake = [{ x: 9, y: 9 }];
let food = { x: Math.floor(Math.random() * size), y: Math.floor(Math.random() * size) };
let direction = { x: 1, y: 0 };
let score = 0;
let gameloop;

// Keyboard controls
document.addEventListener("keydown", createDirection);
function createDirection(event) {
    if (event.keyCode === 37 && direction.x === 0) { // Left
        direction = { x: -1, y: 0 };
    } else if (event.keyCode === 38 && direction.y === 0) { // Up
        direction = { x: 0, y: -1 };
    } else if (event.keyCode === 39 && direction.x === 0) { // Right
        direction = { x: 1, y: 0 };
    } else if (event.keyCode === 40 && direction.y === 0) { // Down
        direction = { x: 0, y: 1 };
    }
}

// Touch controls
document.getElementById("up").addEventListener("click", () => {
    if (direction.y === 0) direction = { x: 0, y: -1 };
});
document.getElementById("left").addEventListener("click", () => {
    if (direction.x === 0) direction = { x: -1, y: 0 };
});
document.getElementById("right").addEventListener("click", () => {
    if (direction.x === 0) direction = { x: 1, y: 0 };
});
document.getElementById("down").addEventListener("click", () => {
    if (direction.y === 0) direction = { x: 0, y: 1 };
});

// Game loop
function game() {
    let head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // Check boundaries and collisions
    if (head.x < 0 || head.x >= size || head.y < 0 || head.y >= size || collision(head)) {
        alert("Game Over Score: " + score);
        clearInterval(gameloop);
        return;
    }

    // Update snake
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        score++;
        createFood();
    } else {
        snake.pop();
    }

    // Clear board
    document.querySelectorAll(".cell").forEach(cell => cell.classList.remove("snake", "food"));

    // Draw snake
    snake.forEach(segment => {
        let index = segment.y * size + segment.x;
        document.querySelectorAll('.cell')[index].classList.add("snake");
    });

    // Draw food
    let indexFood = food.y * size + food.x;
    document.querySelectorAll(".cell")[indexFood].classList.add("food");
}

// Create food
function createFood() {
    let newFood;
    do {
        newFood = {
            x: Math.floor(Math.random() * size),
            y: Math.floor(Math.random() * size)
        };
    } while (
        snake.some(segment => segment.x === newFood.x && segment.y === newFood.y) ||
        document.querySelectorAll('.cell')[newFood.y * size + newFood.x].style.backgroundColor === "blue"
    );
    food = newFood;
}

// Check collisions
function collision(head) {
    for (let i = 0; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    let index = head.y * size + head.x;
    if (document.querySelectorAll('.cell')[index].style.backgroundColor === "blue") {
        return true;
    }
    return false;
}

// Speed controls
let speed1 = document.querySelector(".s1");
let speed2 = document.querySelector(".s2");
let speed3 = document.querySelector(".s3");
let speed4 = document.querySelector(".s4");

speed1.addEventListener("click", function () {
    if (gameloop) clearInterval(gameloop);
    gameloop = setInterval(game, 400);
});
speed2.addEventListener("click", function () {
    if (gameloop) clearInterval(gameloop);
    gameloop = setInterval(game, 200);
});
speed3.addEventListener("click", function () {
    if (gameloop) clearInterval(gameloop);
    gameloop = setInterval(game, 100);
});
speed4.addEventListener("click", function () {
    if (gameloop) clearInterval(gameloop);
    gameloop = setInterval(game, 50);
});

// Obstacle controls
let obstacles1 = document.querySelector(".z1");
let obstacles2 = document.querySelector(".z2");
let obstacles3 = document.querySelector(".z3");
let obstacles4 = document.querySelector(".z4");

function addObstacles(count) {
    for (let i = 0; i < count; i++) {
        let cellIndex;
        let cell;
        do {
            cellIndex = Math.floor(Math.random() * size * size);
            cell = document.querySelectorAll('.cell')[cellIndex];
        } while (
            cell.classList.contains("snake") ||
            cell.classList.contains("food") ||
            cell.style.backgroundColor === "blue"
        );
        cell.style.backgroundColor = "blue";
    }
}

obstacles1.addEventListener("click", () => addObstacles(1));
obstacles2.addEventListener("click", () => addObstacles(2));
obstacles3.addEventListener("click", () => addObstacles(3));
obstacles4.addEventListener("click", () => addObstacles(4));