console.log("hello snake");
//consts

let highScore = 0, currentScore = 0;
let snake = [{ x: 10, y: 10 }];
let dir = "right"
let hasGameStarted = false
let gridsize = 20;
let gameInteral;
let gameSpeedDelay = 500;

//html elements

const logoel = document.getElementById("logo")
const instrutionel = document.getElementById("instruction__text");
const boardEle = document.getElementById("box")
const currentScoreel = document.getElementById("currentScore")
const highScoreel = document.getElementById("highScore")
currentScoreel.innerHTML = currentScore.toString().padStart(3, "0");;
//methods
const setPosition = (pixel, el) => {
    el.style.gridRow = pixel.x;
    el.style.gridColumn = pixel.y;
}
const createGameElement = (tag, className) => {
    let el = document.createElement(tag);
    el.className = className;
    return el;
}
const generateFood = () => {
    x = Math.floor(Math.random() * gridsize + 1); // 0,1
    y = Math.floor(Math.random() * gridsize + 1);
    console.log("mainchek", x, y);

    return { x, y };
}
let food = generateFood()
const drawfood = () => {
    let foodSquare = createGameElement("div", "food")
    setPosition(food, foodSquare);
    boardEle.appendChild(foodSquare);
}
const drawSnake = () => {

    snake.map((pixel, index) => {
        // console.log("pixel", pixel);
        let snakeSquare = createGameElement("div", "snake");
        // console.log(snakeSquare, "snakeSquare");
        setPosition(pixel, snakeSquare)
        boardEle.appendChild(snakeSquare)
    })
};
const move = () => {
    let snakeHead = { x: snake[0].x, y: snake[0].y }
    // one step move
    //whatever is the dir value based on that i will be moving


    switch (dir) {
        case "up": snakeHead.x--;
            break;
        case "down": snakeHead.x++;
            break;
        case "left": snakeHead.y--;
            break;
        case "right": snakeHead.y++;
            break;
        default:
            break;
    }
    snake.unshift(snakeHead);
    if (food.x === snakeHead.x && food.y === snakeHead.y) {
        //just add new head to snake

        food = generateFood();
        currentScore = snake.length - 1;
        console.log("food", currentScore);

        currentScoreel.innerHTML = currentScore.toString().padStart(3, "0");;
        clearInterval(gameInterval); // clear past interval
        gameInterval = setInterval(() => {
            move();
            checkCollision();
            draw();
        }, gameSpeedDelay);
    } else {
        //add snake head and remove tail
        snake.pop();
    }


};
const removeElementsByClass = (className) => {
    const elements = document.querySelectorAll(`.${className}`);
    elements.forEach(element => {
        if (boardEle.contains(element)) {
            boardEle.removeChild(element);  // Removes the child from boardEle
        }
    });
};
const resetGame = () => {
    updateScore()
    clearInterval(gameInteral)
    // boardEle.innerHTML=""
    hasGameStarted = false;
    logoel.style.display = "block"
    instrutionel.style.display = "block"
    // boardEle.removeElementsByClass('snake')
    // boardEle.removeElementsByClass('food')
    removeElementsByClass('snake');
    removeElementsByClass('food');

    dir = "right";
    snake = [{ x: 10, y: 10 }];
}
const updateScore = () => {
    console.log("checkscore");
    highScore = Math.max(highScore, currentScore)
    currentScore = 0;
    highScoreel.style.display = "block";
    highScoreel.innerHTML = highScore.toString().padStart(3, "0");
}
const checkCollision = () => {
    if (snake[0].x === 0 ||
        snake[0].x === gridsize + 1 ||
        snake[0].y === 0 ||
        snake[0].y === gridsize + 1
    ) {
        //reset the game
        resetGame();

    }
    for (let i = 1; i < snake.length; i++) {
        let head = snake[0]
        if (head.x == snake[i].x && head.y == snake[i].y) {
            resetGame()
        }
    }

}
const draw = () => {
    drawSnake();
    drawfood();
    //update score

}
const startGame = () => {

    logoel.style.display = "none";
    instrutionel.style.display = "none";
    snake = [{ x: 10, y: 10 }];
    gameInteral = setInterval(() => {

        move();
        boardEle.innerHTML = "";
        checkCollision();
        draw();

    }, gameSpeedDelay)
}



//events
const handleKeyPress = (e) => {
    // e.preventDefault();
    if (e.key === " " || e.key === "Space") {
        hasGameStarted = true;
        startGame();
    } else {
        switch (e.key) {
            case "ArrowUp":
                dir = "up";
                break;
            case "ArrowDown":
                dir = "down";
                break;
            case "ArrowLeft":
                dir = "left";
                break;
            case "ArrowRight":
                dir = "right";
                break;
            default:
                break;
        }
    }
}


document.addEventListener("keyup", handleKeyPress)