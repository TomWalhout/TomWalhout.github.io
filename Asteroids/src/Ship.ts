class Ship extends GameObject {
    private keyboardListener: KeyListener;
    private laser: Laser;

    constructor(position: Vector2, speed: Vector2, path: string, keyLis: KeyListener) {
        super(position, speed, path);
        this.doRotate = false;
        this.keyboardListener = keyLis;

        this.laser = new Laser(
            new Vector2(this.pos.X + this.img.width / 2, this.pos.Y),
            new Vector2(0, -20),
            "./assets/images/SpaceShooterRedux/PNG/Lasers/laserBlue06.png",
            0,
            false,
            this);
    }

    public update(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        super.move();
        if (this.laser.exist) {
            this.laser.update(canvas, ctx);
        }
        this.keys();
        super.draw(ctx);
        this.stayInBounds(canvas);
    }

    public keys() {
        //These are for moving the ship
        let angle = this.rot - Math.PI / 2;
        let sin = Math.sin(angle);
        let cos = Math.cos(angle);
        //up
        if (this.keyboardListener.isKeyDown(KeyListener.KEY_W)) {
            this.acc = new Vector2(cos * 0.05, 0.05 * sin);
        }
        //down
        if (this.keyboardListener.isKeyDown(KeyListener.KEY_S)) {
            this.acc = new Vector2(cos * -0.05, -0.05 * sin);
        }

        //These are for turning
        if (this.keyboardListener.isKeyDown(KeyListener.KEY_A) || this.keyboardListener.isKeyDown(KeyListener.KEY_LEFT)) {
            this.rot = this.rot - 0.1;
        }
        if (this.keyboardListener.isKeyDown(KeyListener.KEY_D) || this.keyboardListener.isKeyDown(KeyListener.KEY_RIGHT)) {
            this.rot = this.rot + 0.1;
        }

        //This is the fire button
        if (this.keyboardListener.isKeyDown(KeyListener.KEY_SPACE)) {
            this.shoot();
        }
    }

    private shoot() {
        if (!this.laser.exist) {
            this.laser = new Laser(
                new Vector2(this.pos.X + this.img.width / 2, this.pos.Y + this.img.height / 2),
                new Vector2(40 * Math.cos(this.rot - .5 * Math.PI), 40 * Math.sin(this.rot - .5 * Math.PI)),
                "./assets/images/SpaceShooterRedux/PNG/Lasers/laserRed06.png",
                this.rot,
                true,
                this);
        }
    }

    public get lasershot() {
        return this.laser;
    }
}