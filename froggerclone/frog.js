// frog sprite: main character of the game
class Frog extends Sprite {
    constructor(imageSrc, x = 0, y = 0, width = 40, height = 50, step = 30, score, timer, time, losingSound, winningSound, backgroundSound, level) {
        super();
        this.image = new Image();
        this.image.src = imageSrc;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.step = step;
        this.score = score; 
        this.time = time;
        this.timer = timer;
        this.currentDirection = "up"; // start the frog's direction upward
        this.currentFrame = 0;// 0 = standing, 1 = jumping
        this.frameWidth = 25; // width of the frog in the spritesheet
        this.frameHeight = 30; // height of the frog in the spritesheet
        this.alive = true; // initialize alive flag as true
        this.reachedGoal = false; // initialize the reachedGoal flag as false
        this.onHelper = null; // initialize the onHelper flag as false
        this.logOffset = 0; // to avoid the overlapping of logs
        this.counter = 0; // handles the animation of frog jumping
        this.collide = false; // detects the collision of frog
        this.safe = true; // detects if the frog is in safe zone
        this.lives = 3; // tracks the lives left
        this.createLives(); // initialize the lives from the Live clas
        this.goals = 0; // track goals reached
        this.collectedPremium = false; // detect the collision with premium frog only once 
        this.losingSound = losingSound; // sound effect when losing life
        this.backgroundSound = backgroundSound; // background music
        this.winningSound = winningSound; // sound effect when reaching goal
        this.level = level; // track level for restart, moving next...

    }
    // message pops up on the screen using Message class
    showMessage(text) {
        const message = new Message(
            text,
            game.canvas.width / 2 - 150,
            game.canvas.height / 2 - 50,
            300,
            100
        );
        game.addSprite(message);
    }
    // updates the frog 60 times per second
    update(sprites, keys) {

        // case paused doesn't update frog
        if (sprites[sprites.length - 1] instanceof PausePage) {
            return false;
        }
        // case reached a goal reset the data of next frog 
        if (this.reachedGoal) {
            this.x = 300
            this.y = 607
            this.currentDirection = "up";
            this.currentFrame = 0;
            this.collide = false;
            this.safe = true;
            this.reachedGoal = false;
            this.alive = true;
            this.score.resetVisitedLanes();
            return;
        }
        // case ran out of lives stop updating the frog 
        if (this.lives <= 0) {
            return;
        }

        // case ran out of time frog is not alive
        if (this.timer.isTimeUp()) {
            this.alive = false;
        }

        // counter to help in animation 
        this.counter++;
        if (this.counter >= 14) {
            this.currentFrame = 0;
        }
 
        //prevent the multi jump of the frog 
        if (this.jumpCooldown > 0) {
            this.jumpCooldown--;
            if (this.jumpCooldown === 0) {
                this._justJumped = false;
            }
        }
        
        // allow the frog to jump again if waiting time ends
        if (!this._justJumped) {
            
            // handle case jumping up
            if (keys["ArrowUp"]) {
                this.y -= this.step;
                this.currentDirection = "up";
                this.currentFrame = 1;
                this.counter = 0;
                this._justJumped = true;
                this.jumpCooldown = 10;
                if (this) {
                    this.score.update(this);
                }

            } 
            // handle case jumping down
            else if (keys["ArrowDown"]) {
                this.y += this.step;
                this.currentDirection = "down";
                this.currentFrame = 1;
                this.counter = 0;
                this._justJumped = true;
                this.jumpCooldown = 10;
            } 
            // handle case jumping left
            else if (keys["ArrowLeft"]) {
                this.x -= this.step;
                this.currentDirection = "left";
                this.currentFrame = 1;
                this.counter = 0;
                this._justJumped = true;
                this.jumpCooldown = 10;
            }
            // handle case jumping right
             else if (keys["ArrowRight"]) {
                this.x += this.step;
                this.currentDirection = "right";
                this.currentFrame = 1;
                this.counter = 0;
                this._justJumped = true;
                this.jumpCooldown = 10;
            }
        }
        
        // handle the screen boundaries
        this.x = Math.max(0, Math.min(this.x, game.canvas.width - this.width));
        this.y = Math.max(0, Math.min(this.y, game.canvas.height - this.height));
        if (this.y >= 607 && this.currentDirection === "down") {
            this.y = 607;
            this.currentDirection = "up";
            this.currentFrame = 0;
            return
        }
        // check if frog collided with anything or landed somewhere
        this.handleCollisions(sprites, keys);
    }
    
    // check if the frog bumps into other things in the game
    handleCollisions(sprites, keys) {
        this.onHelper = null; // detects if the frog is on helper
        let onWater = false; // detects if the frog is on water
        let onRoad = false; // detects if the frog is on road
        this.collide = false; // detects teh collision of frog
        this.safe = false; // detects if the frog is on safe zone

        // loop over all sprites
        for (let sprite of sprites) {
            // case the frog is on the road
            if (sprite.type === 'road' && this.collides(sprite)) {
                onRoad = true;
            }
            // case the frog collided with obstacle and is on road
            if (sprite.type === 'obstacle' && this.collides(sprite) && onRoad) {
                this.collide = true;
            }
            // case the frog is on the water
            if (sprite.type === 'water' && this.collides(sprite)) {
                onWater = true;
            }
            // case the frog is on the helper
            if (sprite instanceof Helper && this.collides(sprite)) {
                //case the helper is drowning turtle loses a life
                if (sprite.type === 'turtle' && sprite.drowning) {
                    this.alive = false;
                    console.log("Turtle drowning so frog lost!");
                } 
                // the frog is now moving with the helper 
                else {
                    this.onHelper = sprite;
                    this.x += sprite.speed * sprite.direction;
                    this.collide = false;

                    this.logOffset = this.x - sprite.x;
                    this.x = sprite.x + this.logOffset;
                }
            }
            // case the frog reached a goal 
            if (sprite instanceof Goal && sprite.checkCollision(this)) {
                //ensure the goal is not occupied
                if (!sprite.reached) {
                    sprite.markAsReached();
                    this.reachedGoal = true;
                    this.goals++;
                    this.backgroundSound.pause();
                    this.winningSound.play();
                    // all goals reach so level passed
                    if (this.goals === 5) {
                        game.score = this.score.points;
                        game.currentLevel = this.level;
                        game.changeLevel(2);
                        this.showMessage("All goals reached!");
                    }
                    this.showMessage("Goal reached!")
                    const remainingTime = this.timer.remainingTime();
                    // add score based on the remaining time
                    const timeBasedScore = Math.floor(remainingTime / 10);
                    this.score.addPoints(timeBasedScore);

                    this.timer.reset(this.time[this.goals]);

                }
                // frog loses life as the goal already occupied
                else {
                    this.showMessage("Goal already occupied!");
                    this.alive = false;
                }
            }
            // case frog is on grass zone (not safe) and hasn't reached a goal
            else if (sprite.type === 'grassZone' && !this.reachedGoal && this.collides(sprite)) {
                this.alive = false;
                console.log("Frog collided with grass zone and lost!");
                this.showMessage("Frog collided with grass zone and lost!");
            }
            // case the frog is completely inside a safe zone
            if (sprite.type === 'safeZone' && this.isContainedWithin(sprite)) {
                this.safe = true;
            }
            // case the frog collides with premium frog for first time 
            if (sprite instanceof PremiumFrog && sprite.active && this.collides(sprite) && !this.collectedPremium) {
                sprite.active = false;
                sprite.shouldRemove = true;
                this.isPremium = true;
                console.log("Frog became the premium frog");
                this.score.addPoints(200);
                this.collectedPremium = true;
            }
            // case the frog has just died
            if (!this.alive && sprite instanceof Live) {
                sprite.shouldRemove = true;
                this.lives--;
                this.backgroundSound.pause();
                this.losingSound.play();
                // case the frog ran out of lives so game is over
                if (this.lives <= 0) {
                    game.score = this.score.points;
                    game.currentLevel = this.level;
                    game.changeLevel(3);
                    this.showMessage("Game Over! No lives left.");
                    this.x = 300
                    this.y = 607
                    this.currentDirection = "up";
                    this.currentFrame = 0;
                    return;
                } 
                // case frog lost a live
                else {

                    this.showMessage(`Frog lost a life! Lives left: ${this.lives}`);
                    this.x = 300
                    this.y = 607
                    this.currentDirection = "up";
                    this.currentFrame = 0;
                    this.collide = false;
                    this.safe = true;
                    this.reachedGoal = false;
                    this.alive = true;
                    this.score.resetVisitedLanes();
                    this.timer.reset(this.time[this.goals]);
                    return;
                }
            }

        }
        // handle the changing between sound effect and background music
        if (this.losingSound.isEnded()) {
            this.backgroundSound.resume();
        }
        if (this.winningSound.isEnded()) {
            this.backgroundSound.resume();
        }
        //kill the frog if collided and not in safe place
        if (!this.safe && this.collide) {
            this.alive = false;
        }
        // kill the frog if is in river and not on the helper
        if (onWater && !this.onHelper) {
            this.alive = false;
        }
        // kill the frog if on helper and helper is out of screen boundaries
        if (this.onHelper) {
            if (this.x < 0 || this.x + this.width > game.canvas.width) {
                this.alive = false;
            }
        }
    }
    // helper function to check if frog is inside the safe zone
    isContainedWithin(other) {
        return (
            this.x >= other.x &&
            this.x + this.width <= other.x + other.width &&
            this.y >= other.y &&
            this.y + this.height <= other.y + other.height
        );
    }
    // helper function to check collision of forg with other object
    collides(other) {
        return (
            this.x < other.x + other.width &&
            this.x + this.width > other.x &&
            this.y < other.y + other.height &&
            this.y + this.height > other.y
        );
    }
    // helper function to initialize the lives using Live class
    createLives() {
        const X = 520;
        const Y = game.canvas.height - 25;
        const spacing = 40;
        for (let i = 0; i < this.lives; i++) {
            const life = new Live(X + i * spacing, Y);
            game.addSprite(life);
        }
    }

    draw(ctx) {
        let sourceX = 0;
        let sourceY = 0;
       // manage the coordinates of geeting the frog from the spritesheet 
        switch (this.currentDirection) {
            case "up":
                sourceY = this.currentFrame === 1 ? 367 : 370;
                sourceX = this.currentFrame === 1 ? 46 : 10;
                break;
            case "down":
                sourceY = this.currentFrame === 1 ? 367 : 370;
                sourceX = this.currentFrame === 1 ? 116 : 80;
                break;
            case "left":
                sourceY = 336;
                sourceX = this.currentFrame === 1 ? 113 : 80;
                break;
            case "right":
                sourceY = 336;
                sourceX = this.currentFrame === 1 ? 45 : 10;
                break;
        }
        // handle the drawing of frog from the spritesheet to the canvas
        ctx.drawImage(
            this.image,
            sourceX,
            sourceY,
            this.frameWidth,
            this.frameHeight,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}

