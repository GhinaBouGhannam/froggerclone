// road sprite respresents the road for the frog to move on 
class Road extends Sprite {
    constructor(x, y, width, height) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = 'road';
    }

    draw(ctx) {
        // draw the road as black rectangle
        ctx.fillStyle = "black"; 
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}