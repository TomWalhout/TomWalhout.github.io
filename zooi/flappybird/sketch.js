let bird;

function setup() {
    createCanvas(600, 600);
    bird = new Bird();
}

function draw() {
    background(51);
    bird.update();
}

function Bird() {
    this.x = 30;
    this.y = 0;
    this.yspeed = 5;
    this.size = 20;

    this.update = function() {
        this.y += this.yspeed;
        console.log(this.y);
        fill(0);

        this.y = constrain(this.y, 0, height - this.size);
        rect(this.x, this.y, this.size, this.size);
    }

    this.flap = function() {
        this.yspeed *= -2;
    }
}

function keyPressed() {
    if (key == 'Space') {
        bird.flap();
    }
}