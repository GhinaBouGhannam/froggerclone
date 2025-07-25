// helper sprite to help the frog pass the river as the log and turtle
class Helper extends Sprite {
    constructor(x, y, width, height, speed, direction, canvasWidth, sourceX, sourceY, sourceWidth, sourceHeight, type = 'helper', drowns = false) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.direction = direction;
        this.canvasWidth = canvasWidth;
        this.image = new Image();
        this.image.src = 'assets/froggerspritesheet.png';
        this.sourceX = sourceX;
        this.sourceY = sourceY;
        this.sourceWidth = sourceWidth;
        this.sourceHeight = sourceHeight;
        this.type = type; // if its turtle or log
        if (this.type === 'turtle') {
            this.drowns = drowns; // track if turtle drowns or not
            this.drowning = false; //track if turtle is drowning
            this.animationCounter = 0;
            this.drownTime = 60;
            this.appeareTime = 120;
        }
    }

    update(sprites, keys) {
        // case paused doesn't update helper
        if (sprites[sprites.length - 1] instanceof PausePage) {
            return false;
        }
        //the helper moving based on speed and direction
        this.x += this.speed * this.direction;

        // keep the helpers looping
        if (this.direction === 1 && this.x > this.canvasWidth) {
            this.x = -this.width;
        } else if (this.direction === -1 && this.x + this.width < 0) {
            this.x = this.canvasWidth;
        }
        if (this.type === 'turtle') {
            this.animationCounter = (this.animationCounter || 0) + 1;
            // time handling if the turtle drowns
            if (this.drowning && this.drowns) {
                if (this.animationCounter >= this.drownTime) {
                    this.drowning = false;
                    this.animationCounter = 0;
                }
            } else {
                if (this.animationCounter >= this.appeareTime && this.drowns) {
                    this.drowning = true;
                    this.animationCounter = 0;
                }
            }
        }
    }

    draw(ctx) {
        //animation handling if the turtle drowns
        if (this.type === 'turtle' && this.drowning && this.drowns) {
            const frameIndex = Math.floor(this.animationCounter / 12) % 5;
            const drowningSourceX = this.sourceX + frameIndex * 40;

            ctx.drawImage(
                this.image,
                drowningSourceX,
                this.sourceY,
                this.sourceWidth,
                this.sourceHeight,
                this.x,
                this.y,
                this.width,
                this.height
            );

        }
        // if not drowning turtle draw the helper from spritesheet to the canvas
        else {
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
}
