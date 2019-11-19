class Laser extends GameObject {
    private existance: boolean;
    private lifespan: number;
    private lifeCount: number;
    private ship: Ship;
    private angle: number;
    constructor(position: Vector2, speed: Vector2, path: string, rotation: number, exist: boolean, ship: Ship) {
        super(position, speed, path, rotation);
        this.existance = exist;
        this.rot = rotation;
        this.lifespan = 20;
        this.lifeCount = 0;
        this.ship = ship;
    }

    public update(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.draw(ctx);
        this.move();
        this.endOfLife();
    }

    private endOfLife() {
        this.lifeCount++;
        if (this.lifeCount >= this.lifespan) {
            this.exist = false;
        }
    }
    public get exist(): boolean {
        return this.existance;
    }
    public set exist(value: boolean) {
        this.existance = value;
    }

}