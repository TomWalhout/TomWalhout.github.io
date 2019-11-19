class Game {

    // Global attributes for canvas
    // Readonly attributes are read-only. They can only be initialized in the constructor
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;

    // Some global player attributes
    private readonly player: string;
    private readonly highscores: Highscore[];
    private score: number;
    private readonly key: KeyListener;
    private gameStarted: boolean;
    private gameOver: boolean;

    //initialise GameScreens
    private currentScreen: any;
    public constructor(canvasId: HTMLCanvasElement) {
        // Construct all of the canvas
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        // Set the context of the canvas
        this.ctx = this.canvas.getContext('2d');
        document.documentElement.style.overflow = 'hidden';

        this.key = new KeyListener();
        this.gameStarted = false;
        this.gameOver = false;
        this.currentScreen = new StartScreen(this.canvas, this.ctx);
        this.loop();
    }

    /**
     * The Game loop
     */
    public loop = () => {
        requestAnimationFrame(this.loop);
        this.switchScreen();

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.currentScreen.draw(this.canvas, this.ctx);

    }

    private switchScreen() {
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

    public get done(): boolean {
        return this.gameOver;
    }
    public set done(value: boolean) {
        this.gameOver = value;
    }
}

//this will get an HTML element. I cast this element in de appropriate type using <>
let init = function () {
    const Asteroids = new Game(<HTMLCanvasElement>document.getElementById('canvas'));
};

// Add EventListener to load the game whenever the browser is ready
window.addEventListener('load', init);
