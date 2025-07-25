// live sprite: lives before the game is over 
class Live extends Sprite {
    constructor(x, y, width = 30, height = 30) {
        super();
        this.image = new Image();
        this.image.src = 'assets/froggerspritesheet.png';
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.shouldRemove = false; 
    }
    update(sprites, keys) {
        // case paused doesn't update live
        if (sprites[sprites.length-1] instanceof PausePage) {
            return false; 
        }
        // remove the live from the sprites when lost
        return this.shouldRemove;
    }

    draw(ctx) {
       // draw the live as frog shape
       ctx.drawImage(
            this.image,
            10, 370, 
            25, 30, 
            this.x, this.y,
            this.width, this.height 
        );
    }
}