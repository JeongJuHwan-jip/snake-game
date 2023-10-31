class Snake {
    constructor(x, y, size) {
        this.dx = [1, 0, -1, 0]
        this.dy = [0, 1, 0, -1]
    
        this.x = x
        this.y = y
        this.size = size
        this.tail = [{x:this.x, y:this.y}]
        this.dir = 1
    }

    move() {
        var nx = this.tail[this.tail.length-1].x + this.size * this.dx[this.dir]
        var ny = this.tail[this.tail.length-1].y + this.size * this.dy[this.dir]

        for(var i=0; i<snake.tail.length-1; i++) {
            if(nx == snake.tail[i].x && ny == snake.tail[i].y) {
                isPlaying = false;
            }
        }

        var newRect = {
            x: nx,
            y: ny
        }

        this.tail.shift()
        this.tail.push(newRect)
    }
}

class Apple {
    constructor() {
        var isTouching;
        while(true) {
            isTouching = false;
            this.x = Math.floor(Math.random() * canvas.width / snake.size) * snake.size
            this.y = Math.floor(Math.random() * canvas.height / snake.size) * snake.size
            for(var i=0; i<snake.tail.length; i++) {
                if(this.x == snake.tail[i].x && this.y == snake.tail[i].y) {
                    isTouching = true
                }
            }
            if(!isTouching) {
                break;
            }
        }
        this.color = "red"
        this.size = snake.size
    }
}

var canvas = document.getElementById("canvas");

var snake = new Snake(20, 20, 20);

var apple = new Apple();

var canvasContext = canvas.getContext('2d');

var isPlaying = true;

window.onload = ()=>{
    gameLoop();
}

function gameLoop() {
    setInterval(show, 1000/15)
}

function show() {
    if(isPlaying) {
        update();
        draw();
    } else {
        gameover();
    }
}

function update() {
    canvasContext.clearRect(0,0, canvas.width, canvas.height)
    console.log('update')
    snake.move()
    eatApple()
    checkHitWall();
}

function checkHitWall() {
    var headTail = snake.tail.at(-1)
    if(headTail.x == -snake.size) {
        isPlaying = false;
    } else if(headTail.x == canvas.width) {
        isPlaying = false;
    } else if(headTail.y == -snake.size) {
        isPlaying = false;
    } else if(headTail.y == canvas.height) {
        isPlaying = false;
    }
}

function eatApple() {
    if(snake.tail[snake.tail.length - 1].x == apple.x && snake.tail[snake.tail.length - 1].y == apple.y) {
        snake.tail[snake.tail.length] = {x:apple.x, y:apple.y}
        apple = new Apple();
    }
}

function draw() {
    createRect(0, 0, canvas.width, canvas.height, "black")
    for(var i=0; i<snake.tail.length-1; i++) {
        createRect(snake.tail[i].x + 2.5, snake.tail[i].y + 2.5,
            snake.size - 5, snake.size - 5, 'white')
    }
    createRect(snake.tail.at(-1).x + 2.5, snake.tail.at(-1).y + 2.5,
        snake.size - 5, snake.size - 5, 'yellow')

    canvasContext.font = "20px Arial"
    canvasContext.fillStyle = "#00FF42"
    canvasContext.fillText("Score: "+(snake.tail.length-1), canvas.width - 120, 18);
    createRect(apple.x, apple.y, apple.size, apple.size, apple.color);
}

function createRect(x, y, width, height, color) {
    canvasContext.fillStyle = color
    canvasContext.fillRect(x,y,width,height)
}

window.addEventListener("keydown", (event)=>{
    setTimeout(()=>{
        if(event.keyCode == 37 && snake.dir != 0) {
            snake.dir = 2;
        } else if(event.keyCode == 38 && snake.dir != 1) {
            snake.dir = 3;
        } else if(event.keyCode == 39 && snake.dir != 2) {
            snake.dir = 0;
        } else if(event.keyCode == 40 && snake.dir != 3) {
            snake.dir = 1;
        }
    }, 1)
})

function gameover() {
    createRect(0, 0, canvas.width, canvas.height, "black")
    canvasContext.font = "20px Arial"
    canvasContext.fillStyle = "#00FF42"
    canvasContext.fillText("Score: "+(snake.tail.length-1)+"  Game Over", 100, 200);
}