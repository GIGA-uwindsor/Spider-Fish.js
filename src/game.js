var DEBUG = false;
var CONST = STANDARD;
var canvas = document.getElementById('surface');
var ctx = canvas.getContext('2d');
var game = new SpiderFish();
var ASSET_MANAGER = new AssetManager();

var level = new Level(game,
  [
    //game, spawn_start_time, number_to_spawn, spawn_interval, start_xy, path, type of enemy
    new Spawn(game, 0, 20, 2, {x:0, y:0}, YellowInvader),
	new Spawn(game, 50, 1, 1, {x:250, y:125}, BossInvader),
  ]
);

game.setLevel(level);

ASSET_MANAGER.queueDownload(CONST.PEA_BULLET_IMAGE);
ASSET_MANAGER.queueDownload(CONST.BACKGROUND);
ASSET_MANAGER.queueDownload(CONST.ORB_BULLET_IMAGE);
ASSET_MANAGER.queueDownload(CONST.PLAYER_SHIP_IMAGE);
ASSET_MANAGER.queueDownload(CONST.BOSS_INVADER_IMAGE);
ASSET_MANAGER.queueDownload(CONST.YELLOW_INVADER_IMAGE);
ASSET_MANAGER.queueDownload(CONST.ANGRY_INVADER_IMAGE);
ASSET_MANAGER.queueDownload(CONST.ANGRY_MORPH_SHEET);
ASSET_MANAGER.queueDownload(CONST.TRI_SHOOTER_IMAGE);
ASSET_MANAGER.queueDownload(CONST.DOUBLE_BARREL_IMAGE);
ASSET_MANAGER.queueDownload(CONST.PEA_SHOOTER_IMAGE);

ASSET_MANAGER.queueDownload(CONST.DOUBLE_BARREL_AMMO_IMAGE);
ASSET_MANAGER.queueDownload(CONST.HEALTH_ITEM_IMAGE);
ASSET_MANAGER.queueDownload(CONST.TRI_SHOOTER_AMMO_IMAGE);
ASSET_MANAGER.queueDownload(CONST.PEA_SHOOTER_AMMO_IMAGE);
ASSET_MANAGER.queueDownload(CONST.HALO_BONUS_IMAGE);

ASSET_MANAGER.queueDownload(CONST.EXPLOSION);

ASSET_MANAGER.downloadAll(function() 
{
  game.init(ctx);
  game.start();
});
