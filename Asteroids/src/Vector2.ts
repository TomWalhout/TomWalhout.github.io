class Vector2 {
    private x: number;
    private y: number;

    constructor(xpos: number, ypos: number) {
        this.x = xpos;
        this.y = ypos;
    }

    public set X(value: number) {
        this.x = value;
    }

    public set Y(value: number) {
        this.y = value;
    }

    public get X(): number {
        return this.x;
    }

    public get Y(): number {
        return this.y;
    }
}