// introduction menu level at the start of the game 
class LevelMenu extends Level {
    constructor(game) {
        super();
        this.game = game;
    }

    initialize() {
        // Add background  
        this.game.addSprite(new BackgroundSprite("assets/background.png"));
        
        // Start Game Button to start level 1
        this.game.addSprite(new Button(230, 320, 200, 50, "Start", () => {
            this.game.changeLevel(1);
        }));
         // How to Play Button to open instructions screen
        this.game.addSprite(new Button(230, 420, 200, 50, "How to play", () => {
            this.game.changeLevel(4);
        }));
        // Close Game Button to exit game
        this.game.addSprite(new Button(230, 520, 200, 50, "Exit", () => {
            alert("Game Closed!");
        }));
    }
}