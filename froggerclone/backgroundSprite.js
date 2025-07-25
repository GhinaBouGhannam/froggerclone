
// background sprite that draws background over the entire canvas
class BackgroundSprite extends Sprite {

    constructor(imageSrc) {
        super();
        this.image = new Image();
        this.image.src = imageSrc;// URL of the image to use as background
    }

    draw(ctx) {
        // draw the image on the canvas
        ctx.drawImage(this.image, 0, 0, ctx.canvas.width, ctx.canvas.height);
    }
}