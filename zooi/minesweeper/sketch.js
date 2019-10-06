const scl = 50;
const w = 500;
let cols = w / scl;
let rows = w / scl;
let grid;

function setup() {
    createCanvas(w, w);
    cols = floor(cols);
    rows = floor(rows);
    grid = createArray(cols, rows);

    for (let i = 0; i < 30; i++) {
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

function Cell(i, j, x, y) {
    this.bomb = false;
    this.revealed = true;
    this.i = i;
    this.j = j;
    this.x = this.i * scl;
    this.y = this.j * scl;
    // this.count = countNeighbors(this);
    this.show = function() {
        if (this.revealed) {
            fill(255);
            rect(this.x, this.y, scl, scl);
            fill(0)
            textAlign(CENTER);
            text(countNeighbors(this), this.x + scl / 2, this.y + scl / 2);

        } else {
            fill(51);
            rect(this.x, this.y, scl, scl);
        }
        if (this.revealed && this.bomb) {
            //gameOver();
            fill(0);
            rect(this.x, this.y, scl, scl);
        }
    };

    this.reveal = function() {
        if (!this.revealed) {
            if (this.bomb) {
                //gameOver();
            }
            this.revealed = true;
        }
    };
}

function createArray(cols, rows) {
    let grid = new Array(cols);
    for (let i = 0; i < cols; i++) {
        grid[i] = new Array(rows);
        for (let j = 0; j < rows; j++) {
            grid[i][j] = new Cell(i, j);
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

function checkNeighbours(cell) {
    let ix = floor(cell.x / scl);
    let iy = floor(cell.y / scl);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            //todo
        }
    }
}

function countNeighbors(cell) {
    if (this.bomb) {
        return -1;
    } else {
        let total = 0;
        for (let ioff = -1; ioff <= 1; ioff++) {
            for (let joff = -1; joff <= 1; joff++) {
                let i = floor(cell.x / cols) + ioff;
                let j = floor(cell.y / rows) + joff;
                if (i > -1 && i < cols && j > -1 && j < rows) {
                    if (grid[cell.i + i][cell.j + j].bomb) {
                        total++;
                    }
                }
            }
        }
        return total;
    }
}