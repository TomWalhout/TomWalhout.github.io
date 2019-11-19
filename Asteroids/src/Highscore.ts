class Highscore {
    private readonly playerName: string;
    private readonly points: number;
    constructor(playerName: string, score: number) {
        this.playerName = playerName;
        this.points = score;
    }

    public get name(): string {
        return this.playerName;
    }
    public get score(): number {
        return this.points;
    }
}