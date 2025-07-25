// pause button to stop the game 
class PauseButton extends Sprite {
    constructor() {
        super();
        this.x = 10;
        this.y = 10;
        this.width = 40;
        this.height = 40;
    }

    update(sprites, keys, mouse) {
        // pause if escape key is clicked
        if (keys["Escape"]) {
            this.pause();
            keys["Escape"] = false;
        }
        // pause if pause button is clicked 
        if (mouse.clicked && this.isMouseOver(mouse)) {
            this.pause();
            mouse.clicked = false;
        }
    }

    //track the coordinates of mouse to check if its clicking on the pause button 
    isMouseOver(mouse) {
        if (mouse == undefined) return false;
        return (
            mouse.x >= this.x &&
            mouse.x <= this.x + this.width &&
            mouse.y >= this.y &&
            mouse.y <= this.y + this.height
        );
    }
    
    // add the pause page on the game
    pause() {
        if (!(game.sprites[game.sprites.length - 1] instanceof PausePage)) {
            game.addSprite(new PausePage(game));
        }
    }

    draw(ctx) {
        // draw the pause button on the canvas
        ctx.fillStyle = "#666";
        ctx.fillRect(this.x, this.y, 8, 20);
        ctx.fillRect(this.x + 15, this.y, 8, 20);
    }
}