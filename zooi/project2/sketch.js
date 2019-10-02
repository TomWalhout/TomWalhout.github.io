const scl = 50;
const w = 510;
let cols = w / scl;
let rows = w / scl;
let grid;

function setup() {
    createCanvas(w, w);
    cols = floor(cols);
    rows = floor(rows);
    grid = createArray(cols, rows);

    for (let i = 0; i < 50; i++) {
        let c = floor(random(cols));
        let r = floor(random(rows));
        grid[c][r].bomb = true;
    }
}

function draw() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].show();
        }
    }
}

function Cell(x, y) {
    this.bomb = false;
    this.revealed = false;
    this.width = scl;
    this.height = scl;
    this.x = x;
    this.y = y;

    this.show = function() {
        if (this.revealed) {
            fill(255);
        } else {
            fill(51);
        }
        if (this.revealed && this.bomb) {
            //gameOver();
            fill(0);
        }
        rect(this.x, this.y, this.width, this.height);
    };

    this.reveal = function() {
        if (!this.revealed) {
            if (this.bomb) {
                //gameOver();
            }
            this.revealed = true;
            checkNeighbours(this, this.x, this.y);
        }
    };
}

function createArray(cols, rows) {
    let grid = new Array(cols);
    for (let i = 0; i < cols; i++) {
        grid[i] = new Array(rows);
        for (let j = 0; j < rows; j++) {
            grid[i][j] = new Cell(i * scl, j * scl);
        }
    }
    return grid;
}

function mousePressed() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if (mouseX > grid[i][j].x && mouseX < grid[i][j].x + scl && mouseY > grid[i][j].y && mouseY < grid[i][j].y + scl) {
                grid[i][j].reveal();
            }
        }
    }
}

function checkNeighbours(cell, x, y) {
    let ix = floor(x / cols / scl);
    let iy = floor(y / rows / scl);
    console.log(x + ":" + y);
    console.log(ix + " " + iy);
    console.log(grid[ix][iy]);
    if (iy != rows) {
        grid[ix][(iy + 1)].reveal();
    }
    if (iy != 0) {
        grid[ix][iy - 1].reveal();
    }
    if (ix != cols) {
        grid[ix + 1][iy].reveal();
    }
    if (ix != 0) {
        grid[ix - 1][iy].reveal();
    }
}