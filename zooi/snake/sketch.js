var s;
var fruit;
var snakeTails = [];
const scl = 20;
let score = 0;
let highscore = 0;

function setup() {
    createCanvas(600, 600);
    frameRate(10);
    s = new Snake();
    fruit = new Fruit(0, 0);
    spawnFruit();
    askName();
    highscore = 0;
}

function draw() {
    background(51);
    s.update();
    updateScore();
    s.die();
    fruit.show();
    s.show();
    fruit.collision(s);
}

function keyPressed() {
    //Change the direction the snake is moving in
    switch (key) {
        case 's':
            s.dir(0, 1);
            break;
        case 'a':
            s.dir(-1, 0);
            break;
        case 'd':
            s.dir(1, 0);
            break;
        case 'w':
            s.dir(0, -1);
            break;
    }
}

function spawnFruit() {
    cols = floor(width / scl);
    rows = floor(height / scl);
    fruit.x = floor(random(cols)) * scl;
    fruit.y = floor(random(rows)) * scl;
}

function updateScore() {
    if (score > highscore) {
        highscore = score;
    }
    document.getElementById("highscorenow").innerHTML = "Your highscore: " + highscore;
    document.getElementById("scorenow").innerHTML = "Your current score: " + score;
}


function askName() {
    let name = prompt("What's your name?", "Tom");
    document.getElementById("name").value = name;
}