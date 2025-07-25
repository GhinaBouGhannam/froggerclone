// lose screen when all lives lost
class LoseLevel extends Level {
    constructor(game) {
        super();
        this.game = game;
    }

    initialize() {
        // Add background
        this.game.addSprite(new BackgroundSprite("assets/win_lose_background.png"));

        // Add win message
        let loseMessage = new Message("You Lost!",260, 200,120,120,true);
        this.game.addSprite(loseMessage);
        let scoreMessage = new Message(`Score: ${this.game.score}`,500, 100,120,120,true);
        this.game.addSprite(scoreMessage);

        // Restart Button
        this.game.addSprite(new Button(230, 300, 200, 50, "Retry", () => {
            this.game.changeLevel(this.game.currentLevel);
        }));

        // Main Menu Button
        this.game.addSprite(new Button(230, 400, 200, 50, "Exit", () => {
            this.game.changeLevel(0);
        }));
    }
}