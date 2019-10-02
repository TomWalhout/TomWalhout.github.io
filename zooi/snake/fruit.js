function Fruit(x, y) {
    this.x = x;
    this.y = y;
    this.show = function() {
        fill(255, 0, 0);
        rect(this.x, this.y, scl, scl);
    }

    this.collision = function(snake) {
        if (snake.x + scl / 2 >= this.x && snake.x + scl / 2 <= this.x + scl && snake.y + scl / 2 >= this.y && snake.y + scl / 2 <= this.y + scl) {
            spawnFruit();
            snake.total++;
            // snake.tail.push(createVector(snake.x, snake.y));
        }
    }
}