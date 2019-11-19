class GameObject {
    private position: Vector2;
    private speed: Vector2;
    private acceleration: Vector2;
    private rotation: number;
    private doRotation: boolean;
    private image: HTMLImageElement;

    constructor(position: Vector2, speed: Vector2, path: string, rotation: number = 0) {
        this.position = position;
        this.speed = speed;
        this.rotation = rotation;
        this.createImg(path);
        this.acceleration = new Vector2(0, 0);
    }

    public accelerate() {
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

    public move() {
        this.accelerate();
        this.position.X += this.speed.X;
        this.position.Y += this.speed.Y;
    }

    public set Speed(value: Vector2) {
        this.vel.X = value.X;
        this.vel.Y = value.Y;
    }

    private createImg(path: string) {
        this.image = new Image();
        this.image.src = path;
    }

    private rotate() {
        if (this.doRotation) {
            this.rotation += 0.01;
        }
    }

    public draw(ctx: CanvasRenderingContext2D) {
        this.rotate();
        if (this.img.naturalWidth > 0) {
            ctx.save();
            ctx.translate(this.pos.X + (this.img.width / 2), this.pos.Y + (this.img.height / 2));
            ctx.rotate(this.rot);
            ctx.drawImage(this.img, -this.img.width / 2, -this.img.height / 2);
            ctx.restore();
        }
    }

    public stayInBounds(canvas: HTMLCanvasElement) {
        if ((this.pos.Y < 0 && this.vel.Y < 0) || (this.pos.Y > canvas.height - this.img.height && this.vel.Y > 0)) {
            this.vel.Y *= -1;
        }
        if (this.pos.X < 0 && this.vel.X < 0 || (this.pos.X > canvas.width - this.img.width && this.vel.X > 0)) {
            this.vel.X *= -1;
        }
    }

    public get colBox(): Array<number> {
        return [this.pos.X, this.pos.X + this.img.width, this.pos.Y, this.pos.Y + this.img.height];
    }

    public get vel(): Vector2 {
        return this.speed;
    }
    public get pos(): Vector2 {
        return this.position;
    }
    public get rot(): number {
        return this.rotation;
    }
    public set rot(value) {
        this.rotation = value;
    }
    public get img(): HTMLImageElement {
        return this.image;
    }
    public get acc(): Vector2 {
        return this.acceleration;
    }

    public set vel(value: Vector2) {
        this.speed = value;
    }
    public set acc(value: Vector2) {
        this.acceleration = value;
    }

    public set doRotate(value: boolean) {
        this.doRotation = value;
    }
}