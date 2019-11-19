class ScoreScreen {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private highScores: Highscore[];
    private score: number;
    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, score: number) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.score = score;
        this.highScores = new Array<Highscore>(
            new Highscore("Tom", Number.MAX_SAFE_INTEGER),
            new Highscore("Chris", 10),
            new Highscore("Loek", -20),
            new Highscore("Daan", Number.MIN_SAFE_INTEGER),
        );
        if (this.score >= this.highScores[this.highScores.length - 1].score) {
            let name = prompt("YOU GOT A HIGHSCORE!! \nWhat's your name?", "Je moeder");
            this.highScores.push(new Highscore(name, this.score));
        }
    }

    public set scored(value: number) {
        this.score = value;
    }



    public draw() {
        let text = `Your score was: ${this.score}`;
        this.drawText(text, 50, this.canvas.width / 2, 50);
        text = "HIGHSCORES:"
        this.drawText(text, 75, this.canvas.width / 2, 150);

        //2. draw all highscores
        for (let i = 0; i < this.highScores.length; i++) {
            text = `${this.highScores[i].name}: ${this.highScores[i].score}`
            this.drawText(text, 30, this.canvas.width / 2, 210 + i * 40);
        }
        this.drawText('Try again for a better score!', 40, this.canvas.width / 2, 650);
    }
    private createImage(path: string) {
        let img = new Image();
        img.src = path;
        return img;
    }

    /**
     * Displays text on the screen
     * @param text the text to display
     * @param size text size in pixels
     * @param font size and font
     * @param colour duh
     * @param xpos x position of text
     * @param ypos y position of text
     */
    private drawText(text: string, size: number, xpos: number, ypos: number, colour: string = '#ffffff'): void {
        this.ctx.fillStyle = colour;
        this.ctx.font = `${size}px Minecraft`;
        this.ctx.textAlign = 'center';
        this.ctx.fillText(text, xpos, ypos);
    }
}