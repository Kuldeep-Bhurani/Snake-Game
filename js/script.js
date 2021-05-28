// Game constant and variables
let SnakeVelocity = { x: 0, y: 0 };
const food_sound = new Audio('music/food.mp3');
const move_sound = new Audio('music/move.mp3');
const gameover_sound = new Audio('music/gameover.mp3');
const bg_music = new Audio('music/music.mp3');
let score = 0;
let highscore = localStorage.getItem("highscore");
let speed = 10;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
];
let food = { x: 6, y: 7 };

// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    for (let i = 1; i < snakeArr.length; i++) {
        // If snake bump in itself
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // if you bump into wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }

    return false;
}

function gameEngine() {
    // Part 1: Updating The Snake Array & Food
    if (isCollide(snakeArr)) {
        gameover_sound.play();
        bg_music.pause();
        SnakeVelocity = { x: 0, y: 0 };
        alert("Game over! Press space bar to continue and play again...");
        snakeArr = [
            { x: 13, y: 15 }
        ];
        bg_music.play();
        score = 0;
    }

    // If Player Has Eaten The Food
    // Incriment the score and regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        food_sound.play()
        score += 1
        if (score > highscore_val) {
            highscore_val = score;
            localStorage.setItem("highscore", JSON.stringify(highscore_val));
            HighscoreBox.innerHTML = "High Score: " + highscore_val;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + SnakeVelocity.x, y: snakeArr[0].y + SnakeVelocity.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    // Moving The Snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += SnakeVelocity.x;
    snakeArr[0].y += SnakeVelocity.y;

    // Part 2: Rendering & Display Snake And Food
    // Displaying The Snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Displaying The Food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

// High Score Functionality
if (highscore === null) {
    highscore_val = 0;
    localStorage.setItem("highscore", JSON.stringify(highscore_val));
}

else {
    highscore_val = JSON.parse(highscore)
    HighscoreBox.innerHTML = "High Score: " + highscore;
}

// Main Logic Starts Here
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    SnakeVelocity = { x: 0, y: 1 }; // Start The Game
    bg_music.play();
    move_sound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            SnakeVelocity.x = 0;
            SnakeVelocity.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown")
            SnakeVelocity.x = 0;
            SnakeVelocity.y = 1;
            break;

        case "ArrowRight":
            console.log("ArrowRight")
            SnakeVelocity.x = 1;
            SnakeVelocity.y = 0;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft")
            SnakeVelocity.x = -1;
            SnakeVelocity.y = 0;
            break;

        default:
            break;
    }
});