var s;
var fruit;
var snakeTails = [];
const scl = 20;

function setup() {
    createCanvas(600, 600);
    frameRate(8);
    s = new Snake();
    fruit = new Fruit(0, 0);
    spawnFruit();
}

function draw() {
    background(51);
    s.update();
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

function gameOver() {
    s.dir(0, 0);
}

function spawnFruit() {
    cols = floor(width / scl);
    rows = floor(height / scl);
    fruit.x = floor(random(cols)) * scl;
    fruit.y = floor(random(rows)) * scl;
}