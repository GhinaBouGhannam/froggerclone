// win screen when frogs reaches all goals successfully
class WinLevel extends Level {
    constructor(game) {
        super();
        this.game = game;
    }

    initialize() {
        // Add background
        this.game.addSprite(new BackgroundSprite("assets/win_lose_background.png"));

        // Add win message
        let winMessage = new Message("You Win!", 260, 200, 120, 120, true);
        this.game.addSprite(winMessage);

        // Add final score
        let scoreMessage = new Message(`Score: ${this.game.score}`, 500, 100, 120, 120, true);
        this.game.addSprite(scoreMessage);

        // Next Button if its in level 1
        if (this.game.currentLevel === 1) {
            this.game.addSprite(new Button(230, 300, 200, 50, "Next", () => {
                this.game.changeLevel(5);
            }));
        }

        // Restart Button
        this.game.addSprite(new Button(230, 400, 200, 50, "Restart", () => {
            this.game.changeLevel(this.game.currentLevel);
        }));
        // Main Menu Button
        this.game.addSprite(new Button(230, 500, 200, 50, "Exit", () => {
            this.game.changeLevel(0);
        }));
    }
}