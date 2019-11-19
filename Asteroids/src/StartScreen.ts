class StartScreen {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;
    }
    public draw() {
        //Draw astreroid image
        this.drawAstroidImage(this.createImg("./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big1.png"));
        //Draw Button
        this.drawButtonImage(this.createImg("./assets/images/SpaceShooterRedux/PNG/UI/buttonGreen.png"));
        //Add 'Asteroids' text
        let text: string = 'Asteroids';
        this.drawText(text, this.canvas.height / 5, this.canvas.width / 2, this.canvas.height / 4);
        //Add 'Press to play' text
        text = "Press 'Y' to play";
        this.drawText(text, this.canvas.height / 8, this.canvas.width / 2, this.canvas.height / 2.5);
    }

    private drawText(text: string, size: number, xpos: number, ypos: number, colour: string = '#ffffff'): void {
        this.ctx.fillStyle = colour;
        this.ctx.font = `${size}px Minecraft`;
        this.ctx.textAlign = 'center';
        this.ctx.fillText(text, xpos, ypos);
    }

    private drawButtonImage(img: HTMLImageElement) {
        this.ctx.drawImage(img, (this.canvas.width - img.width) / 2, this.canvas.height - 60);
        let text = 'Play';
        this.drawText(text, 30, this.canvas.width / 2, this.canvas.height - 30, '#000000');
    }

    private drawAstroidImage(img: HTMLImageElement) {
        this.ctx.drawImage(img, (this.canvas.width - img.width) / 2, this.canvas.height / 1.8);
    }

    private createImg(path: string) {
        let image = new Image();
        image.src = path;
        return image;
    }

} 