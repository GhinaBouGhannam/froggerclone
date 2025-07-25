// message sprite to pass specific information for the player 
class Message extends Sprite {
    constructor(text, x, y, width, height, noUpdate = false) {
        super();
        this.text = text;
        this.duration = 60;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.counter = 60;
        this.noUpdate = noUpdate;
    }

    update() {
        // case the message remains on the screen
        if (this.noUpdate) {
            return false;
        }
        // case the message needs to be removed
        // so counter to track remaining time before deleting it
        if (this.counter > 0) {
            this.counter--;
        } else {
            return true; // delete message when time ends
        }
    }

    draw(ctx) {
        // draw the text on the screen in clear way
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'white';
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        // case of multiple lines
        const lines = this.text.split('\n');
        if (lines.length > 1) {
            const height = 24;
            for (let i = 0; i < lines.length; i++) {
                ctx.fillText(lines[i], this.x, this.y + i * height);
            }
        }
        else {
            ctx.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2);
        }
    }
}