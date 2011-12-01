var DEBUG = false;
var CONST = STANDARD;
var canvas = document.getElementById('surface');
var ctx = canvas.getContext('2d');
var game = new AimlessDonut();
var ASSET_MANAGER = new AssetManager();

var z = new Bezier(4,
  [
    {x:500, y:0},
    {x:400, y:500},
    {x:0, y:200},
    {x:0, y:800}
  ]
);

var a = new Bezier(4,
  [
    {x:0, y:0},
    {x:250, y:0},
    {x:0, y:400},
    {x:250, y:400}
  ]
);
var b = new Bezier(6,
  [
    {x:0, y:0},
    {x:500, y:100},
    {x:-500, y:300},
    {x:0, y:400}
  ]
);
var delay = new Pause(1.5, {x:0, y:0});

var level = new Level(game,
  [
    //game, spawn_start_time, number_to_spawn, spawn_interval, start_xy, path, type of enemy
    new Spawn(game, 1, 10, 1, {x:0, y:0}, [ z ], WanderingInvader),
    new Spawn(game, 0, 20, 2, {x:0, y:0}, [a, delay, b], WanderingInvader),
	//new Spawn(game, 1, 10, 4, {x : 0, y : 0}, [z], X_2Invader),
  ]
);

game.setLevel(level);

ASSET_MANAGER.queueDownload('img/blueBullet.png');
ASSET_MANAGER.queueDownload('img/background.jpg');
ASSET_MANAGER.queueDownload('img/redBullet.png');
ASSET_MANAGER.queueDownload('img/ship.png');
ASSET_MANAGER.queueDownload('img/wanderingInvader.png');
ASSET_MANAGER.queueDownload('img/angryInvader.png');
ASSET_MANAGER.queueDownload('img/L2Enemy.png');
ASSET_MANAGER.queueDownload('img/X2Enemy.png');
ASSET_MANAGER.queueDownload('img/X_2Enemy.png');
ASSET_MANAGER.queueDownload('img/triShooter.png');
ASSET_MANAGER.queueDownload('img/doubleBarrel.png');
ASSET_MANAGER.queueDownload('img/peaShooter.png');

ASSET_MANAGER.queueDownload('img/doubleBarrelAmmo.png');
ASSET_MANAGER.queueDownload('img/health.png');
ASSET_MANAGER.queueDownload('img/triShooterAmmo.png');
ASSET_MANAGER.queueDownload('img/peaShooterAmmo.png');

ASSET_MANAGER.queueDownload('img/angryMorph.png');
ASSET_MANAGER.queueDownload('img/explosions.png');

ASSET_MANAGER.downloadAll(function() 
{
  game.init(ctx);
  game.start();
});
