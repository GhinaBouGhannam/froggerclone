// grass zone sprite beside the goals that kills the frog when colliding with it 
class GrassZone extends Sprite {
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
        this.type = 'grassZone';
    }
    // draw the grass zone from the spritesheet to the canvas
    draw(ctx) {
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