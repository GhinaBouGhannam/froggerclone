/* level 2 increases the speed of the logs, turtles, and obstacles 
introduces the drowning turtle and premium frog
*/
class Level2 extends Level {
    constructor(game) {
        super();
        this.game = game;
    
    }
    initialize() {
        const safeZone = new SafeZone(
            'assets/froggerspritesheet.png',
            0, 
            300, 
            650,
            50, 
            10, 
            120, 
            250, 
            40 
        );
        const safeZone2 = new SafeZone(
            'assets/froggerspritesheet.png', 
            0,
            600, 
            650,
            50, 
            10,
            120, 
            240,
            40 
        );
        const grassZone = new GrassZone(
            'assets/froggerspritesheet.png',
            -9, 
            0, 
            670, 
            50, 
            0, 
            58,
            400, 
            50 
        );
        const water1 = new Water(0, 0, 650, 300);
        const road1 = new Road(0, 340, 650, 260);
        const goals = [
            new Goal(21, 15, 18), 
            new Goal(165, 15, 18), 
            new Goal(305, 15, 18), 
            new Goal(450, 15, 18), 
            new Goal(590, 15, 18)  
        ];
        
        game.addSprite(safeZone);
        game.addSprite(safeZone2)
        game.addSprite(water1);
        
        game.addSprite(road1);
        goals.forEach(goal => game.addSprite(goal))
        game.addSprite(grassZone);
        const score = new Score(540, 660); 
        game.addSprite(score);
        const waterHelpers = [
            {
                type: 'turtle',
                width: 40,
                height: 50,
                speed: 1.5,
                direction: -1, // Left
                y: 250, // Lane 5
                sourceX: 15,
                sourceY: 400,
                sourceWidth: 30,
                sourceHeight: 46,
                count: 4,
                spacing: 150,
                drowns: true // turtles drown
            },
            {
                type: 'log',
                width: 150,
                height: 45,
                speed: 2,
                direction: 1, // Right
                y: 200, // Lane 4
                sourceX: 9,
                sourceY: 197,
                sourceWidth: 120,
                sourceHeight: 29,
                count: 3,
                spacing: 250
            },
            {
                type: 'turtle',
                width: 40,
                height: 50,
                speed: 1.2,
                direction: -1, // Left
                y: 150, // Lane 3
                sourceX: 15,
                sourceY: 400,
                sourceWidth: 30,
                sourceHeight: 46,
                count: 4,
                spacing: 160
            },
            {
                type: 'log',
                width: 90,
                height: 45,
                speed: 1.7,
                direction: -1, // Left
                y: 100, // Lane 2
                sourceX: 9,
                sourceY: 165,
                sourceWidth: 90,
                sourceHeight: 29,
                count: 3,
                spacing: 250
            },
            {
                type: 'log',
                width: 90,
                height: 44,
                speed: 1.1,
                direction: 1, // Right
                y: 53, // Lane 1
                sourceX: 9,
                sourceY: 197,
                sourceWidth: 90,
                sourceHeight: 29,
                count: 4,
                spacing: 200
            }
        ];
        
        waterHelpers.forEach(helperConfig => {
            for (let i = 0; i < helperConfig.count; i++) {
                
                const xPos = helperConfig.direction === 1
                    ? -helperConfig.width - (i * helperConfig.spacing)
                    : game.canvas.width + (i * helperConfig.spacing);
        
                const helper = new Helper(
                    xPos,
                    helperConfig.y,
                    helperConfig.width,
                    helperConfig.height,
                    helperConfig.speed,
                    helperConfig.direction,
                    game.canvas.width,
                   helperConfig.sourceX,
                    helperConfig.sourceY,
                    helperConfig.sourceWidth,
                    helperConfig.sourceHeight,
                    helperConfig.type,
                    helperConfig.drowns || false
                );
        
                game.addSprite(helper);
            }
        });
       // in level 2 only
        const premiumLog = game.sprites.find(sprite => sprite.type === 'log' && sprite.y === 200); 
        const premiumFrog = new PremiumFrog(premiumLog.x, premiumLog.y+2, 50, 40, premiumLog.speed+1, premiumLog.direction, premiumLog);
        game.addSprite(premiumFrog);

        const backgroundSound = new MusicPlayer("assets/audio/background.mp3", true, 0.2);
        backgroundSound.play();
        game.addSprite(backgroundSound)

        let time=[33,32,36,25,30];
        const endTimeSound = new MusicPlayer("assets/audio/timeEnding.wav", false, 1);
        game.addSprite(endTimeSound)
        const timer = new Timer(41,endTimeSound,backgroundSound); 
        game.addSprite(timer); 
        const losingSound = new MusicPlayer("assets/audio/frogLost.wav", false,1);
        game.addSprite(losingSound)
        const winningSound = new MusicPlayer("assets/audio/winLevel.wav", false,1);
        game.addSprite(winningSound)
        const player = new Frog('assets/froggerspritesheet.png', 300, 607, 40, 43, 50,score,timer,time,losingSound,winningSound,backgroundSound,5);
        game.addSprite(player);
        
        const roadObstacles = [
            {
                type: 'obstacle',
                width: 50,
                height: 40,
                speed: 1.7,
                direction: -1, // Left
                y: 550, // Lane 1
               sourceX: 9, 
                sourceY: 263, 
                sourceWidth: 27, 
                sourceHeight: 24, 
                count: 2, 
                spacing: 250 
            },
            {
                type: 'obstacle',
                width: 50,
                height: 40,
                speed: 1.7,
                direction: 1, // Right
                y: 500, // Lane 2
                sourceX: 44, 
                sourceY: 265, 
                sourceWidth: 27, 
                sourceHeight: 24, 
                count: 3, 
                spacing: 250
            },
            {
                type: 'obstacle',
                width: 50,
                height: 40,
                speed: 1.5,
                direction: -1, // left
                y: 450, 
                sourceX: 80, 
                sourceY: 263, 
                sourceWidth: 24,
                sourceHeight: 29, 
                count: 2, 
                spacing: 250
            },
            {
                type: 'obstacle',
                width: 50,
                height: 40,
                speed: 1.8,
                direction: 1, // Right
                y: 400, // Lane 4
               sourceX: 9, 
                sourceY: 300, 
                sourceWidth: 24,
                sourceHeight: 30, 
                count: 2, 
                spacing: 250
            },
            {
                type: 'obstacle',
                width: 80,
                height: 40,
                speed: 1.6,
                direction: -1, // Left
                y: 350, // Lane 5
                sourceX:100, 
                sourceY: 300, 
                sourceWidth: 60, 
                sourceHeight: 30, 
                count: 3, 
                spacing: 250
            }
        ];
        
        roadObstacles.forEach(obstacleConfig => {
            for (let i = 0; i < obstacleConfig.count; i++) {
                const obstacle = new Obstacle(
                    obstacleConfig.direction === 1
                        ? -obstacleConfig.width * i * obstacleConfig.spacing / obstacleConfig.width
                        : game.canvas.width + obstacleConfig.width * i * obstacleConfig.spacing / obstacleConfig.width,
                    obstacleConfig.y,
                    obstacleConfig.width,
                    obstacleConfig.height,
                    obstacleConfig.speed,
                    obstacleConfig.direction,
                    game.canvas.width,
                    obstacleConfig.sourceX,
                    obstacleConfig.sourceY,
                    obstacleConfig.sourceWidth,
                    obstacleConfig.sourceHeight,
                    obstacleConfig.type
                );
                game.addSprite(obstacle);
            }
        });
        game.addSprite(new PauseButton());
       
    }
   
}