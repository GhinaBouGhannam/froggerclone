// obstacle sprite that kill the frog when hitting it as different types of cars
class Obstacle extends Sprite {
    constructor(
        x, y, width, height, speed, direction, canvasWidth, sourceX, sourceY, sourceWidth, sourceHeight, type = 'road'
    ) {
        super();
        this.x = x; 
        this.y = y; 
        this.width = width; 
        this.height = height; 
        this.speed = speed;
        this.direction = direction; 
        this.canvasWidth = canvasWidth; 
        this.image = new Image(); 
        this.image.src =  'assets/froggerspritesheet.png';
        this.sourceX = sourceX; 
        this.sourceY = sourceY; 
        this.sourceWidth = sourceWidth; 
        this.sourceHeight = sourceHeight; 
        this.type = type; 
    }

    update(sprites, keys) {
        // case paused doesn't update obstacle
        if (sprites[sprites.length-1] instanceof PausePage) {
            return false; 
        }
       //the obstacle moving based on speed and direction
       this.x += this.speed * this.direction;
       
       // keep the obstacle looping
       if (this.direction === 1 && this.x > this.canvasWidth) {
            this.x = -this.width; 
        } else if (this.direction === -1 && this.x + this.width < 0) {
            this.x = this.canvasWidth; 
        }
    }
   // draw the obstacle from spritesheet to the canvas
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