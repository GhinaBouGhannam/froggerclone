// water sprite represents the river that the frog should avoid drowning in 
class Water extends Sprite {
    constructor(x, y, width, height) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = 'water'; 
    }

    draw(ctx) {
        // draw the water as blue rectangle
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}