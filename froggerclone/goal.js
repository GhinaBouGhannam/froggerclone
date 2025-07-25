// goal sprite: the goal of the frog to reach 
class Goal extends Sprite {
    constructor(x, y, radius) {
        super();
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.spriteSheet = new Image();
        this.spriteSheet.src = 'assets/froggerspritesheet.png';
        this.frogX = 80;
        this.frogY = 370;
        this.frogWidth = 25;
        this.frogHeight = 30;
        this.reached = false;
    }
    // detects the collision of frog with the circular goal
    checkCollision(frog) {
        const circleCenterX = this.x + this.radius;
        const circleCenterY = this.y + this.radius;

        return (
            circleCenterX >= frog.x &&
            circleCenterX <= frog.x + frog.width &&
            circleCenterY >= frog.y &&
            circleCenterY <= frog.y + frog.height
        );
    }
    // mark the goal as reached
    markAsReached() {
        this.reached = true;
    }

    update(sprites, keys) {
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, Math.PI * 2);
        if (!this.reached) {
            ctx.fillStyle = 'lightgreen';
        }
        else {
            ctx.fillStyle = 'darkgreen';
        }
        ctx.fill();
        ctx.closePath();
        // handle the drawing of goal if its occupied by displaying frog image on it
        if (this.reached) {
            ctx.drawImage(
                this.spriteSheet,
                this.frogX,
                this.frogY,
                this.frogWidth,
                this.frogHeight,
                this.x + 1,
                this.y + this.radius / 2,
                this.radius * 2,
                this.radius * 2
            );
        }
    }
}