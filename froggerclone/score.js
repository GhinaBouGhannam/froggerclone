// score sprite to add points as frog reaches goal and moves into new lanes
class Score extends Sprite {
    constructor(x = 10, y = 10) {
        super();
        this.x = x;
        this.y = y;
        this.points = 0;
        this.visitedLanes = [];
    }
    // function to add points for the score
    addPoints(points) {
        this.points += points;
    }
    // reset visited lanes when new frog starts its path
    resetVisitedLanes() {
        this.visitedLanes = []
    }
    update(frog) {
        /* dont add points when frog reaches the point
         because its added based on the remaining time */
        if (!frog.y || frog.y >= 600) return;

        const currentLane = Math.floor(frog.y / 50);
        // check if lane is unvisited since points are added only to new lanes visited 
        if (!this.visitedLanes.includes(currentLane)) {
            this.visitedLanes.push(currentLane); // mark the lane as visitedS
            this.addPoints(10); // add 10 points for each new lane visited
        }
    }

    draw(ctx) {
        // display the score on the canvas
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText(`Score: ${this.points}`, this.x, this.y);
    }
}