class Game {
    constructor(canvasId) {
        this.loop = () => {
            requestAnimationFrame(this.loop);
            this.switchScreen();
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.currentScreen.draw(this.canvas, this.ctx);
        };
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
        document.documentElement.style.overflow = 'hidden';
        this.key = new KeyListener();
        this.gameStarted = false;
        this.gameOver = false;
        this.currentScreen = new StartScreen(this.canvas, this.ctx);
        this.loop();
    }
    switchScreen() {
        if (!this.gameStarted) {
            if (this.key.isKeyDown(KeyListener.KEY_Y)) {
                this.currentScreen = new LevelScreen(this.canvas, this.ctx, this);
                this.gameStarted = true;
            }
        }
        if (this.key.isKeyDown(KeyListener.KEY_ESC) || this.gameOver) {
            this.currentScreen = new ScoreScreen(this.canvas, this.ctx, this.currentScreen.score);
            this.gameOver = false;
        }
    }
    get done() {
        return this.gameOver;
    }
    set done(value) {
        this.gameOver = value;
    }
}
let init = function () {
    const Asteroids = new Game(document.getElementById('canvas'));
};
window.addEventListener('load', init);
class GameObject {
    constructor(position, speed, path, rotation = 0) {
        this.position = position;
        this.speed = speed;
        this.rotation = rotation;
        this.createImg(path);
        this.acceleration = new Vector2(0, 0);
    }
    accelerate() {
        this.speed.X += this.acc.X;
        this.speed.Y += this.acc.Y;
        if (this.speed.X > 10) {
            this.speed.X = 10;
        }
        if (this.speed.Y > 10) {
            this.speed.Y = 10;
        }
        this.acc = new Vector2(0, 0);
    }
    move() {
        this.accelerate();
        this.position.X += this.speed.X;
        this.position.Y += this.speed.Y;
    }
    set Speed(value) {
        this.vel.X = value.X;
        this.vel.Y = value.Y;
    }
    createImg(path) {
        this.image = new Image();
        this.image.src = path;
    }
    rotate() {
        if (this.doRotation) {
            this.rotation += 0.01;
        }
    }
    draw(ctx) {
        this.rotate();
        if (this.img.naturalWidth > 0) {
            ctx.save();
            ctx.translate(this.pos.X + (this.img.width / 2), this.pos.Y + (this.img.height / 2));
            ctx.rotate(this.rot);
            ctx.drawImage(this.img, -this.img.width / 2, -this.img.height / 2);
            ctx.restore();
        }
    }
    stayInBounds(canvas) {
        if ((this.pos.Y < 0 && this.vel.Y < 0) || (this.pos.Y > canvas.height - this.img.height && this.vel.Y > 0)) {
            this.vel.Y *= -1;
        }
        if (this.pos.X < 0 && this.vel.X < 0 || (this.pos.X > canvas.width - this.img.width && this.vel.X > 0)) {
            this.vel.X *= -1;
        }
    }
    get colBox() {
        return [this.pos.X, this.pos.X + this.img.width, this.pos.Y, this.pos.Y + this.img.height];
    }
    get vel() {
        return this.speed;
    }
    get pos() {
        return this.position;
    }
    get rot() {
        return this.rotation;
    }
    set rot(value) {
        this.rotation = value;
    }
    get img() {
        return this.image;
    }
    get acc() {
        return this.acceleration;
    }
    set vel(value) {
        this.speed = value;
    }
    set acc(value) {
        this.acceleration = value;
    }
    set doRotate(value) {
        this.doRotation = value;
    }
}
class Highscore {
    constructor(playerName, score) {
        this.playerName = playerName;
        this.points = score;
    }
    get name() {
        return this.playerName;
    }
    get score() {
        return this.points;
    }
}
class KeyListener {
    constructor() {
        this.keyDown = (ev) => {
            this.keyCodeStates[ev.keyCode] = true;
        };
        this.keyUp = (ev) => {
            this.keyCodeStates[ev.keyCode] = false;
        };
        this.keyCodeStates = new Array();
        window.addEventListener("keydown", this.keyDown);
        window.addEventListener("keyup", this.keyUp);
    }
    isKeyDown(keyCode) {
        return this.keyCodeStates[keyCode] === true;
    }
}
KeyListener.KEY_ESC = 27;
KeyListener.KEY_SPACE = 32;
KeyListener.KEY_LEFT = 37;
KeyListener.KEY_RIGHT = 39;
KeyListener.KEY_W = 87;
KeyListener.KEY_A = 65;
KeyListener.KEY_S = 83;
KeyListener.KEY_D = 68;
KeyListener.KEY_H = 72;
KeyListener.KEY_Y = 89;
class Laser extends GameObject {
    constructor(position, speed, path, rotation, exist, ship) {
        super(position, speed, path, rotation);
        this.existance = exist;
        this.rot = rotation;
        this.lifespan = 20;
        this.lifeCount = 0;
        this.ship = ship;
    }
    update(canvas, ctx) {
        this.draw(ctx);
        this.move();
        this.endOfLife();
    }
    endOfLife() {
        this.lifeCount++;
        if (this.lifeCount >= this.lifespan) {
            this.exist = false;
        }
    }
    get exist() {
        return this.existance;
    }
    set exist(value) {
        this.existance = value;
    }
}
class LevelScreen {
    constructor(canvas, ctx, game) {
        this.meteors = [];
        this.canvas = canvas;
        this.ctx = ctx;
        this.game = game;
        this.lives = 3;
        this.scored = 0;
        const asteroids = [
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big1.png",
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big2.png",
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big3.png",
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big4.png",
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_med1.png",
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_med2.png",
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_small1.png",
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_small2.png",
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_tiny1.png",
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_tiny2.png",
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorGrey_big1.png",
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorGrey_big2.png",
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorGrey_big3.png",
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorGrey_big4.png",
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorGrey_med1.png",
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorGrey_med2.png",
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorGrey_small1.png",
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorGrey_small2.png",
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorGrey_tiny1.png",
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorGrey_tiny2.png",
        ];
        for (let i = 0; i < 10; i++) {
            this.meteors[i] = new Meteor(new Vector2(this.randomInt(0, canvas.width), this.randomInt(0, canvas.height)), new Vector2(this.randomInt(-5, 5), this.randomInt(-5, 5)), asteroids[this.randomInt(0, asteroids.length - 1)], this.randomDouble(0, 4));
        }
        this.playerShip = new Ship(new Vector2(canvas.width / 2, canvas.height / 2), new Vector2(0, 0), './assets/images/SpaceShooterRedux/PNG/playerShip3_red.png', new KeyListener());
    }
    draw(canvas, ctx) {
        let existCounter = 0;
        this.meteors.forEach(element => {
            if (element.exist) {
                existCounter++;
                element.update(canvas, ctx);
            }
        });
        if (existCounter === 0) {
            this.game.done = true;
        }
        this.drawLives(this.createImg("./assets/images/SpaceShooterRedux/PNG/UI/playerLife1_blue.png"), canvas, ctx);
        let text = `${this.score}`;
        this.drawText(ctx, text, 20, canvas.width - ctx.measureText(text).width, 20);
        this.playerShip.update(canvas, ctx);
        this.collision();
    }
    collision() {
        let playerBox = this.playerShip.colBox;
        if (this.playerShip.lasershot.exist) {
            let laserBox = this.playerShip.lasershot.colBox;
            this.meteors.forEach(e => {
                if (e.exist) {
                    let meteorBox = e.colBox;
                    if (this.boxCollide(laserBox, meteorBox)) {
                        this.score += 10;
                        e.exist = false;
                    }
                }
            });
        }
        this.meteors.forEach(e => {
            if (e.exist) {
                let meteorBox = e.colBox;
                if (this.boxCollide(playerBox, meteorBox)) {
                    e.exist = false;
                    this.youGotHit();
                }
            }
        });
    }
    boxCollide(a, b) {
        let xoverlap = false;
        let yoverlap = false;
        if (a[0] < b[0] && a[1] > b[0]) {
            xoverlap = true;
        }
        if (a[0] > b[0] && a[0] < b[1]) {
            xoverlap = true;
        }
        if (a[2] < b[2] && a[3] > b[2] && a[3] < b[3]) {
            yoverlap = true;
        }
        if (a[2] > b[2] && a[2] < b[3]) {
            yoverlap = true;
        }
        if (xoverlap && yoverlap) {
            return true;
        }
        else {
            return false;
        }
    }
    youGotHit() {
        this.youdead = this.lives - 1;
        if (this.lives <= 0) {
            this.game.done = true;
        }
    }
    createImg(path) {
        let image = new Image();
        image.src = path;
        return image;
    }
    drawLives(img, canvas, ctx) {
        for (let i = 0; i < this.lives; i++) {
            ctx.drawImage(img, (i * img.width), 0);
        }
    }
    drawText(ctx, text, size, xpos, ypos, colour = '#ffffff') {
        ctx.fillStyle = colour;
        ctx.font = `${size}px Minecraft`;
        ctx.textAlign = 'center';
        ctx.fillText(text, xpos, ypos);
    }
    get score() {
        return this.scored;
    }
    set score(value) {
        this.scored = value;
    }
    set youdead(value) {
        this.lives = value;
    }
    randomInt(min, max) {
        return Math.round(this.randomDouble(min, max));
    }
    randomDouble(min, max) {
        return Math.random() * (max - min) + min;
    }
}
class Meteor extends GameObject {
    constructor(position, speed, path, rotation) {
        super(position, speed, path, rotation);
        this.doRotate = true;
        this.existance = true;
    }
    update(canvas, ctx) {
        super.move();
        super.draw(ctx);
        this.stayInBounds(canvas);
    }
    get exist() {
        return this.existance;
    }
    set exist(value) {
        this.existance = value;
    }
}
class ScoreScreen {
    constructor(canvas, ctx, score) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.score = score;
        this.highScores = new Array(new Highscore("Tom", Number.MAX_SAFE_INTEGER), new Highscore("Chris", 10), new Highscore("Loek", -20), new Highscore("Daan", Number.MIN_SAFE_INTEGER));
        if (this.score >= this.highScores[this.highScores.length - 1].score) {
            let name = prompt("YOU GOT A HIGHSCORE!! \nWhat's your name?", "Je moeder");
            this.highScores.push(new Highscore(name, this.score));
        }
    }
    set scored(value) {
        this.score = value;
    }
    draw() {
        let text = `Your score was: ${this.score}`;
        this.drawText(text, 50, this.canvas.width / 2, 50);
        text = "HIGHSCORES:";
        this.drawText(text, 75, this.canvas.width / 2, 150);
        for (let i = 0; i < this.highScores.length; i++) {
            text = `${this.highScores[i].name}: ${this.highScores[i].score}`;
            this.drawText(text, 30, this.canvas.width / 2, 210 + i * 40);
        }
        this.drawText('Try again for a better score!', 40, this.canvas.width / 2, 650);
    }
    createImage(path) {
        let img = new Image();
        img.src = path;
        return img;
    }
    drawText(text, size, xpos, ypos, colour = '#ffffff') {
        this.ctx.fillStyle = colour;
        this.ctx.font = `${size}px Minecraft`;
        this.ctx.textAlign = 'center';
        this.ctx.fillText(text, xpos, ypos);
    }
}
class Ship extends GameObject {
    constructor(position, speed, path, keyLis) {
        super(position, speed, path);
        this.doRotate = false;
        this.keyboardListener = keyLis;
        this.laser = new Laser(new Vector2(this.pos.X + this.img.width / 2, this.pos.Y), new Vector2(0, -20), "./assets/images/SpaceShooterRedux/PNG/Lasers/laserBlue06.png", 0, false, this);
    }
    update(canvas, ctx) {
        super.move();
        if (this.laser.exist) {
            this.laser.update(canvas, ctx);
        }
        this.keys();
        super.draw(ctx);
        this.stayInBounds(canvas);
    }
    keys() {
        let angle = this.rot - Math.PI / 2;
        let sin = Math.sin(angle);
        let cos = Math.cos(angle);
        if (this.keyboardListener.isKeyDown(KeyListener.KEY_W)) {
            this.acc = new Vector2(cos * 0.05, 0.05 * sin);
        }
        if (this.keyboardListener.isKeyDown(KeyListener.KEY_S)) {
            this.acc = new Vector2(cos * -0.05, -0.05 * sin);
        }
        if (this.keyboardListener.isKeyDown(KeyListener.KEY_A) || this.keyboardListener.isKeyDown(KeyListener.KEY_LEFT)) {
            this.rot = this.rot - 0.1;
        }
        if (this.keyboardListener.isKeyDown(KeyListener.KEY_D) || this.keyboardListener.isKeyDown(KeyListener.KEY_RIGHT)) {
            this.rot = this.rot + 0.1;
        }
        if (this.keyboardListener.isKeyDown(KeyListener.KEY_SPACE)) {
            this.shoot();
        }
    }
    shoot() {
        if (!this.laser.exist) {
            this.laser = new Laser(new Vector2(this.pos.X + this.img.width / 2, this.pos.Y + this.img.height / 2), new Vector2(40 * Math.cos(this.rot - .5 * Math.PI), 40 * Math.sin(this.rot - .5 * Math.PI)), "./assets/images/SpaceShooterRedux/PNG/Lasers/laserRed06.png", this.rot, true, this);
        }
    }
    get lasershot() {
        return this.laser;
    }
}
class StartScreen {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
    }
    draw() {
        this.drawAstroidImage(this.createImg("./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big1.png"));
        this.drawButtonImage(this.createImg("./assets/images/SpaceShooterRedux/PNG/UI/buttonGreen.png"));
        let text = 'Asteroids';
        this.drawText(text, this.canvas.height / 5, this.canvas.width / 2, this.canvas.height / 4);
        text = "Press 'Y' to play";
        this.drawText(text, this.canvas.height / 8, this.canvas.width / 2, this.canvas.height / 2.5);
    }
    drawText(text, size, xpos, ypos, colour = '#ffffff') {
        this.ctx.fillStyle = colour;
        this.ctx.font = `${size}px Minecraft`;
        this.ctx.textAlign = 'center';
        this.ctx.fillText(text, xpos, ypos);
    }
    drawButtonImage(img) {
        this.ctx.drawImage(img, (this.canvas.width - img.width) / 2, this.canvas.height - 60);
        let text = 'Play';
        this.drawText(text, 30, this.canvas.width / 2, this.canvas.height - 30, '#000000');
    }
    drawAstroidImage(img) {
        this.ctx.drawImage(img, (this.canvas.width - img.width) / 2, this.canvas.height / 1.8);
    }
    createImg(path) {
        let image = new Image();
        image.src = path;
        return image;
    }
}
class Vector2 {
    constructor(xpos, ypos) {
        this.x = xpos;
        this.y = ypos;
    }
    set X(value) {
        this.x = value;
    }
    set Y(value) {
        this.y = value;
    }
    get X() {
        return this.x;
    }
    get Y() {
        return this.y;
    }
}
//# sourceMappingURL=app.js.map