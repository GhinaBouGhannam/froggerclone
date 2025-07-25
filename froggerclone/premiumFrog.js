// premium frog that increases the score when frog collides with it
class PremiumFrog extends Sprite {
    constructor(x, y, width, height, speed, direction, log) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.direction = direction;
        this.log = log;
        this.active = false;
        this.timer = 0;

        this.spriteSheet = new Image();
        this.spriteSheet.src = 'assets/froggerspritesheet.png';
        this.currentFrame = 0;
        this.frameDuration = 10;
        this.frameCounter = 0;
        this.sourceX = 220;
        this.sourceY = 400;
        this.sourceWidth = 40;
        this.sourceHeight = 35;
        this.shouldRemove = false;
    }

    update(sprites, keys) {
        // case paused doesn't update premium frog
        if (sprites[sprites.length - 1] instanceof PausePage) {
            return false;
        }
        // check if the premium frog active
        if (this.active) {
            // moves on the log
            this.x += this.speed * this.direction;

            // moves from the left to right and when reaching end flips back
            if (this.x <= this.log.x || this.x + this.width >= this.log.x + this.log.width) {
                this.direction *= -1;
                this.x = Math.max(this.log.x, Math.min(this.x, this.log.x + this.log.width - this.width));
            }

            // deactivate when going out of the screen boundaries
            if (this.x + this.width < 0 || this.x > game.canvas.width) {
                this.active = false;
                this.timer = 0;
            }
        } else {
            // timer to activate the premium frog after around 2 sec
            this.timer++;
            if (this.timer >= 100) {
                this.activate();
            }
        }
        return this.shouldRemove; // delete the premium frog 
    }

    // helper function to activate it by putting it on the correct coordinates
    activate() {
        this.active = true;
        this.x = this.log.x;
        this.y = this.log.y;
        this.direction = 1;
    }

    draw(ctx) {

        if (this.active) {
            // draw the animation of the frog moving from right to left then left to right
            this.frameCounter++;
            if (this.frameCounter >= this.frameDuration) {
                this.frameCounter = 0;
                this.currentFrame = (this.currentFrame + 1) % 2;
            }

            let frameX;
            if (this.direction === 1) {
                frameX = this.sourceX + this.currentFrame * this.sourceWidth;
            } else {
                frameX = this.sourceX + 2 * this.sourceWidth + this.currentFrame * this.sourceWidth;
            }

            //draw the premium frog from sprtiesheet to the canvas
            ctx.drawImage(
                this.spriteSheet,
                frameX,
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