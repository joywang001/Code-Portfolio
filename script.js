// Use the mouse to move the paddle from left to right. Keep the ball in the air. If it touches the ground, you lose.

/* VARIABLES */
let paddle, ball, collect, collect1, collect2;
let score = 0;
let instructions;
let gameStarted = false, gameOver = false;

/* PRELOAD LOADS FILES */
function preload() {
    seed = loadImage("assets/seed.png");
    waterDrop = loadImage("assets/waterDrop.png");
    trees = loadImage("assets/trees.png");
    trees2 = loadImage("assets/trees2.png");
    trees3 = loadImage("assets/trees3.png");
    trees4 = loadImage("assets/trees4.png");
    trees5 = loadImage("assets/trees5.png");
    fertilizer = loadImage("assets/fertilizer.png");
    birds = loadImage("assets/birds.png")
    sun = loadImage("assets/sun.png");
}

/* SETUP RUNS ONCE */
function setup() {
    createCanvas(600, 400);
    background("#d1cf97");
    // Create paddle
    paddle = new Sprite(300, 380, 100, 20);
    paddle.color = color(95, 158, 160);
    paddle.rotationLock = true;

    collectables = new Group();
    collectables.rotationLock = true;
    collectables.collider = 'k';
    
    waterDrop.resize(40, 40);
    collect = new collectables.Sprite(waterDrop, random(10, 550), random(40, 350));

    fertilizer.resize(35, 35);
    collect1 = new collectables.Sprite(fertilizer, random(40, 550), random(40, 350));

    sun.resize(50, 50)
    collect2 = new collectables.Sprite(sun, random(10, 580), random(40, 350), 15, 15);

    // Create ball
    seed.resize(90, 50);
    ball = new Sprite(seed, random(10, 500), 30, 20);
    ball.direction = 'down';
    ball.speed = 3;
    ball.bounciness = 1;
    ball.friction = 0;

    // Create walls
    walls = new Group();
    walls.w = 10;
    walls.h = 400;
    walls.collider = "static";
    walls.visible = false;

    // Left and right walls
    new walls.Sprite(0, height / 2);
    new walls.Sprite(width, height / 2);

    // Top wall
    let wallTop = new walls.Sprite(width / 2, 0);
    wallTop.h = 600;
    wallTop.rotation = 90;

    startScreen();
}

function startScreen() {
    paddle.x = -100;
    ball.y = 60;
    ball.visible = false;
    collect.x = -100;
    collect1.x = -100;
    collect2.x = -100;
    
    background("#99d68b");
    
    textFont("NATURE green");
    textAlign(CENTER);
    textSize(30);
    fill(0);
    text('Click the screen to start', width / 2, height / 2 -20);
    image(trees5, (width - trees.width) / 2, 150); 
}

/* DRAW LOOP REPEATS */
function draw() {
    background("#d1cf97");

    if (!gameStarted) {
        startScreen();
        return;
    }

    ball.visible = true;
    
    if (gameOver) {
        ball.visible = false;
        if (score > 45) {
            background("#99d68b")
            fill(0);
            textAlign(CENTER, CENTER);
            textSize(50);
            text('You Win!', width / 2, height / 2 - 50);
            image(birds, -20, -50);
            image(trees2, -50, 250);
        } else {
            background("#d1cf97");
            fill(0);
            textAlign(CENTER, CENTER);
            textSize(50);
            text('You lose!', width / 2, height / 2 - 50);
            textSize(36);
            text('Try Again!', width / 2, height / 2 + 20);
            trees3.resize(200, 200)
            image(trees3, 0, 250);
            image(trees4, 50, 200);
            
        }
        return;
    }

    // Change font to a space theme
    textFont('Nature Violces');

    // Display game instructions in the upper left corner
    fill(0);
    textSize(30);
    textAlign(LEFT);
    fill("#25084a");
    instructions = 'Use the paddle \nto hit the ball \nand boxes.';
    text(instructions, 420, 60);

    // Move the paddle
    paddle.moveTowards(mouse.x, 380, 1);

    // When ball collides with paddle bounce off and increase score
    if (ball.collides(paddle)) {
        score++;
        if (score > 15) {
          ball.speed = 12;
        } else if (score > 25) {
          ball.speed = 16; 
        } else if (score > 30) {
          ball.speed = 20;
        } else {
          ball.speed = 8;
        }
        ball.direction = ball.direction + random(-20, 20);
    }

    // Collect points
    if (ball.collides(collectables)) {
        score += Math.floor(random(1, 7));
        collect.position = { x: random(10, 500), y: random(40, 300) };
        collect1.position = { x: random(10, 500), y: random(40, 300) };
        collect2.position = { x: random(10, 500), y: random(40, 300) };
    }

    // Win & lose conditions
    if (score > 45) {
        finished();
    }
    if (ball.y > 390) {
        finished();
    }

    // Draw the score
    fill("#25084a");
    textAlign(LEFT);
    textSize(40);
    text('Score = ' + score, 20, 40);
}





// FUNCTIONS
function resetGame() {
    score = 0;
    ball.position = { x: random(10, 580), y: 0 };
    ball.speed = 8;
    ball.direction = 'down';
    
    paddle.position = { x: 300, y: 380 };
    
    collect.position = { x: random(10, 580), y: random(30, 360) };
    collect1.position = { x: random(10, 580), y: random(30, 360) };
    collect2.position = { x: random(10, 580), y: random(30, 360) };
    gameOver = false;
    
}

// Finished function
function finished() {
    // Move the ball and paddle off the screen
    ball.y = 30;
    ball.visible = false;
    ball.speed = 0;
    collect.x = -500;
    collect1.x = -500;
    collect2.x = -500;
    paddle.x = -600;

    let resetButton = createButton('Reset Game');
    resetButton.position(width / 2 - 40, height + 20);
    resetButton.mousePressed(() => {
        resetGame();
        resetButton.hide();
    });
    gameOver = true;
}

function mousePressed() {
    if (!gameStarted) {
        gameStarted = true;
        paddle.x = 300;
        ball.y = 30;
        ball.x = random(10, 550)
        collect.x = random(10, 550);
        collect1.x = random(40, 550);
        collect2.x = random(10, 580);
    }
}