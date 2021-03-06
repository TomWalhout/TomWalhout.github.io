/// <reference path="./bossstuff/Attack.ts"/>

class Enemy extends Attack {
    
    protected ctx: CanvasRenderingContext2D;
    private health: number;
    private screen: GameScreen;

    constructor(pos: Vector, vel: Vector, ctx: CanvasRenderingContext2D, path: string, screen: GameScreen, frames: number = 1, speed: number = 1, scale: number = 1) {
        super(pos, vel, ctx, path, frames, speed, scale);
        this.ctx = ctx;
        this.screen = screen;
    }

    public update() {
        super.update();
    }

    public enemyMove(canvas: HTMLCanvasElement) {
        if (
            this.pos.x + this.animation.imageWidth >= canvas.width ||
            this.pos.x < 0
        ) {
            this.vel.x = -this.vel.x;
        }
        if (
            this.pos.y + this.animation.imageHeight >= canvas.height - 45 || // 45 is de bar aan de onderkant
            this.pos.y < 0
        ) {
            this.vel.y = -this.vel.y;
        }
        // Use the velocity to change the position
        this.pos.x += this.vel.x;
        // this.pos.y += this.vel.y;
    }
}