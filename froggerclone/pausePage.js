// pause page added when pause functionality is triggered
class PausePage extends Sprite {
    constructor() {
        super();
        const centerX = game.canvas.width / 2; // displays at the center of game
        const centerY = game.canvas.height / 2;
        this.shouldRemove= false;
        
        // Resume Button
        this.resumeButton = new Button(centerX - 100, centerY - 60, 200, 50, "Resume", () => {
            this.shouldRemove= true
        });
        
        // Restart Button
        this.restartButton = new Button(centerX - 100, centerY, 200, 50, "Restart", () => {
            game.changeLevel(game.currentLevelIndex); 
        });
        
        // Exit Button
        this.exitButton = new Button(centerX - 100, centerY + 60, 200, 50, "Exit to Menu", () => {
            game.changeLevel(0);
        });
    }

    update(sprites, keys, mouse) {
        // update temporary till the player clicks one of them
        this.resumeButton.update(sprites, keys, mouse);
        this.restartButton.update(sprites, keys, mouse);
        this.exitButton.update(sprites, keys, mouse);

        return this.shouldRemove; 
    }

    draw(ctx) {
        // draw the pause menu
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        this.resumeButton.draw(ctx);
        this.restartButton.draw(ctx);
        this.exitButton.draw(ctx);

        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.fillText("MENU", ctx.canvas.width / 2, 100);
    }
}