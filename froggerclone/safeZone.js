// safe zone sprite between the river and the road for thr frog to stand on safely
class SafeZone extends Sprite {
    constructor(imageSrc, x, y, width, height, sourceX, sourceY, sourceWidth, sourceHeight) {
        super();
        this.image = new Image();
        this.image.src = imageSrc;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.sourceX = sourceX; 
        this.sourceY = sourceY; 
        this.sourceWidth = sourceWidth; 
        this.sourceHeight = sourceHeight; 
        this.type = 'safeZone';
    }

    draw(ctx) {
        // draw the safe zone from the spritesheet to the canvas
        ctx.drawImage(
            this.image,
            this.sourceX, 
            this.sourceY, 
            this.sourceWidth, 
            this.sourceHeight, 
            this.x, 
            this.y, 
            this.width, 
            this.height 
        );
    }
}