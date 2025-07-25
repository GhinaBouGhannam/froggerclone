// timer sprite to limit time for the frog to reach the goal 
class Timer extends Sprite {
    constructor(timeInSeconds, endTimeSound, backgroundSound) {
        super();
        this.totalTime = timeInSeconds * 60; // total time for the update
        this.timeRemained = this.totalTime; // remaining time
        this.x = 20;
        this.y = 650;
        this.endTimeSound = endTimeSound; //  manage sound when time is about to end
        this.backgroundSound = backgroundSound; // change between the background and sound effect
    }

    // reset a new tie when frog reaches a goal sice every frog have different time allocated
    reset(newTime) {
        this.totalTime = newTime * 60;
        this.timeRemained = this.totalTime;
    }

    // get the remaining time
    remainingTime() {
        return Math.max(0, this.timeRemained);
    }

    update(sprites, keys) {
        // case paused doesn't update frog
        if (sprites[sprites.length - 1] instanceof PausePage) {
            return false;
        }
        // activate the losing sound when the remaining time is 2 sec
        if (this.timeRemained === 120) {
            this.backgroundSound.pause();
            this.endTimeSound.play();
        }
        // resume the background music as end time sound effect ends
        if (this.endTimeSound.isEnded()) {
            this.backgroundSound.resume();
        }
        // counter to track the remaining time
        if (this.timeRemained > 0) {
            this.timeRemained--;
        }
    }

    // check if time ends up
    isTimeUp() {
        return this.timeRemained <= 0;
    }

    draw(ctx) {

        // draw remaining time as a bar
        const rectWidth = 200;
        const rectHeight = 20;
        const r = this.timeRemained / this.totalTime;

        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, rectWidth, rectHeight);

        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, rectWidth * r, rectHeight);

        ctx.fillStyle = 'white';
        ctx.font = '16px Arial';
        const secondsLeft = Math.ceil(this.timeRemained / 60);
        // show the number of seconds remaining
        ctx.fillText(`${secondsLeft}s`, this.x + 5, this.y + rectHeight + 15);
    }
}