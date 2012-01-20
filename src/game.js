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
    new Spawn(game, 0, 20, 2, {x:0, y:0}, [a, delay, b], YellowInvader),
	  new Spawn(game, 1, 10, 4, {x:200, y:-10}, [b, delay, a], X_2Invader),
  ]
);

game.setLevel(level);

ASSET_MANAGER.queueDownload(CONST.PEA_BULLET_IMAGE);
ASSET_MANAGER.queueDownload(CONST.BACKGROUND);
ASSET_MANAGER.queueDownload(CONST.ORB_BULLET_IMAGE);
ASSET_MANAGER.queueDownload(CONST.PLAYER_SHIP_IMAGE);
ASSET_MANAGER.queueDownload(CONST.YELLOW_INVADER_IMAGE);
ASSET_MANAGER.queueDownload(CONST.ANGRY_INVADER_IMAGE);
ASSET_MANAGER.queueDownload(CONST.L2INVADER_IMAGE);
ASSET_MANAGER.queueDownload(CONST.X2INVADER_IMAGE);
ASSET_MANAGER.queueDownload(CONST.X_2INVADER_IMAGE);
//ASSET_MANAGER.queueDownload(CONST.EXPLODER_IMAGE); Removed by Gleiph at the request of R.B.
ASSET_MANAGER.queueDownload(CONST.TRI_SHOOTER_IMAGE);
ASSET_MANAGER.queueDownload(CONST.DOUBLE_BARREL_IMAGE);
ASSET_MANAGER.queueDownload(CONST.PEA_SHOOTER_IMAGE);

ASSET_MANAGER.queueDownload(CONST.DOUBLE_BARREL_AMMO_IMAGE);
ASSET_MANAGER.queueDownload(CONST.HEALTH_ITEM_IMAGE);
ASSET_MANAGER.queueDownload(CONST.TRI_SHOOTER_AMMO_IMAGE);
ASSET_MANAGER.queueDownload(CONST.PEA_SHOOTER_AMMO_IMAGE);

ASSET_MANAGER.queueDownload(CONST.EXPLOSION);

ASSET_MANAGER.downloadAll(function() 
{
  game.init(ctx);
  game.start();
});
