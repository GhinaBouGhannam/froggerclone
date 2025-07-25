// instructions screen showing the player tips to know how to play the game
class InstructionsLevel extends Level {
    constructor(game) {
        super();
        this.game = game;
    }

    initialize() {
        // Add background
        this.game.addSprite(new BackgroundSprite("assets/win_lose_background.png"));

        // Add title
        const title = new Message("How to Play", 260, 80, 100, 100, true);
        this.game.addSprite(title);

        // Add instructions
        const instructionsText = `
Use arrow keys to move the frog: Up, Down, Left, Right \n
Reach the green goals on time\n
Avoid water unless riding on logs or turtles.\n
Don't hit by cars \n
Keep focused some turtles drown \n
Collect the premium frog for bonus points!\n

Press Start to play!
    `;

        const instructions = new Message(instructionsText, 320, 180, 200, 200, true)
        this.game.addSprite(instructions);

        // Main Menu Button
        this.game.addSprite(new Button(150, 540, 150, 50, "Back", () => {
            this.game.changeLevel(0);
        }));

        // Start Game Button to start level 1
        this.game.addSprite(new Button(350, 540, 150, 50, "Start", () => {
            this.game.changeLevel(1);
        }));
    }
}