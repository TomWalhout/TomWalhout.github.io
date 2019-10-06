class Snake {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.xspeed = 1;
        this.yspeed = 0;
        this.tail = [];
        this.total = 0;
        this.update = function() {
            for (var i = 0; i < this.tail.length - 1; i++) {
                this.tail[i] = this.tail[i + 1];
            }
            if (this.total >= 1) {
                this.tail[this.total - 1] = createVector(this.x, this.y);
            }
            this.x += this.xspeed * scl;
            this.y += this.yspeed * scl;
            this.x = constrain(this.x, 0, width - scl);
            this.y = constrain(this.y, 0, height - scl);
        };
        //Show me the snek
        this.show = function() {
            fill(255);
            rect(this.x, this.y, scl, scl);
            for (var i = 0; i < this.tail.length; i++) {
                rect(this.tail[i].x, this.tail[i].y, scl, scl);
            }
        };
        //Change direction and or speed of the snake
        this.dir = function(x, y) {
            this.xspeed = x;
            this.yspeed = y;
        };
        this.die = function() {
            for (let i = 0; i < this.tail.length; i++) {
                let d = dist(this.x, this.y, this.tail[i].x, this.tail[i].y);
                if (d < 1) {
                    this.dir(0, 0);
                    console.log("Game Over");
                    this.tail = [];
                    this.total = 0;
                    this.x = 0;
                    this.y = 0;
                    spawnFruit();
                    score = 0;
                    document.getElementById("score").value = highscore;

                }
            }
        };
    }
}