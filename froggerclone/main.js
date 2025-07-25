// initializing the game and all levels 
let game = new Game();
game.addLevel(new LevelMenu(game));
game.addLevel(new Level1(game));
game.addLevel(new WinLevel(game))
game.addLevel(new LoseLevel(game))
game.addLevel(new InstructionsLevel(game))
game.addLevel(new Level2(game))
game.animate();