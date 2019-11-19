class Meteor extends GameObject {
    private existance: boolean;
    constructor(position: Vector2, speed: Vector2, path: string, rotation: number) {
        super(position, speed, path, rotation);
        this.doRotate = true;
        this.existance = true;
    }

    public update(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        super.move();
        super.draw(ctx);
        this.stayInBounds(canvas);
    }

    public get exist(): boolean {
        return this.existance;
    }
    public set exist(value: boolean) {
        this.existance = value;
    }

}