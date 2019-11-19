class LevelScreen {
    private game: Game;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private readonly highscores: Highscore[];
    private lives: number;
    private scored: number;
    private playerShip: Ship;
    private meteors: Array<Meteor> = [];

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, game: Game) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.game = game;
        this.lives = 3;
        this.scored = 0;
        const asteroids: string[] = [
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
            this.meteors[i] = new Meteor(
                new Vector2(this.randomInt(0, canvas.width), this.randomInt(0, canvas.height)),
                new Vector2(this.randomInt(-5, 5), this.randomInt(-5, 5)),
                asteroids[this.randomInt(0, asteroids.length - 1)],
                this.randomDouble(0, 4)
            );
        }
        //DEBUG METEOR
        // this.meteors[0] = new Meteor(new Vector2(300, 300), new Vector2(0, 0), asteroids[0], 0);

        this.playerShip = new Ship(
            new Vector2(canvas.width / 2, canvas.height / 2),
            new Vector2(0, 0),
            './assets/images/SpaceShooterRedux/PNG/playerShip3_red.png',
            new KeyListener()
        );
    }

    public draw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
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

        //1. load life images
        this.drawLives(this.createImg("./assets/images/SpaceShooterRedux/PNG/UI/playerLife1_blue.png"), canvas, ctx);
        //2. draw current score
        let text = `${this.score}`;
        this.drawText(ctx, text, 20, canvas.width - ctx.measureText(text).width, 20);
        this.playerShip.update(canvas, ctx);
        this.collision();
    }

    private collision() {
        //player collision with rocks
        let playerBox = this.playerShip.colBox;

        // Lasershot collision with rocks
        if (this.playerShip.lasershot.exist) {
            // get the collision stuff from the laser
            let laserBox = this.playerShip.lasershot.colBox;
            //does it hit a rock?
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
                //set collision box for meteor
                let meteorBox = e.colBox;

                if (this.boxCollide(playerBox, meteorBox)) {
                    e.exist = false;
                    this.youGotHit();
                }


            }
        });
    }

    private boxCollide(a: Array<number>, b: Array<number>): boolean {
        let xoverlap: boolean = false;
        let yoverlap: boolean = false;
        //good luck bugfixing this crap

        if (a[0] < b[0] && a[1] > b[0]) {
            //there is x-overlap
            xoverlap = true;
        }
        if (a[0] > b[0] && a[0] < b[1]) {
            //xoverlap
            xoverlap = true;
        }
        if (a[2] < b[2] && a[3] > b[2] && a[3] < b[3]) {
            //there is x-overlap
            yoverlap = true;
        }
        if (a[2] > b[2] && a[2] < b[3]) {
            //xoverlap
            yoverlap = true;
        }
        if (xoverlap && yoverlap) {
            return true;
        } else {
            return false;
        }
    }

    private youGotHit() {
        this.youdead = this.lives - 1;
        if (this.lives <= 0) {
            this.game.done = true;
        }
    }

    private createImg(path: string) {
        let image = new Image();
        image.src = path;
        return image;
    }

    private drawLives(img: HTMLImageElement, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        for (let i = 0; i < this.lives; i++) {
            ctx.drawImage(img, (i * img.width), 0);
        }
    }

    private drawText(ctx: CanvasRenderingContext2D, text: string, size: number, xpos: number, ypos: number, colour: string = '#ffffff'): void {
        ctx.fillStyle = colour;
        ctx.font = `${size}px Minecraft`;
        ctx.textAlign = 'center';
        ctx.fillText(text, xpos, ypos);
    }

    private get score() {
        return this.scored;
    }
    private set score(value: number) {
        this.scored = value;
    }

    private set youdead(value: number) {
        this.lives = value;
    }

    public randomInt(min: number, max: number): number {
        return Math.round(this.randomDouble(min, max));
    }

    public randomDouble(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }
}