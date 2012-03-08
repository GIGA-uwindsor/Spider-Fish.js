function MainMenu(ctx, game)
{
  this.game = game;
  this.visible = false;
  this.ctx = ctx;
}

MainMenu.prototype.init = function()
{
  this.game.paused = true;
  this.draw();
}

MainMenu.prototype.draw = function(score)
{
  this.visible = true;
  this.ctx.fillStyle = "red";
  this.ctx.globalAlpha = .3;  
  this.ctx.fillRect(0, 0, this.game.surfaceWidth, this.game.surfaceHeight);
  this.ctx.fillStyle = "blue";
  this.ctx.font = "20pt sans-serif";  
  this.ctx.globalAlpha = 1.0;  
  this.ctx.fillText("Press Spacebar to start the game!", this.game.surfaceWidth/11, this.game.surfaceHeight/2);
  this.ctx.fillText("Arrow keys to move, and Z to fire.", this.game.surfaceWidth/11, this.game.surfaceHeight/1.8);
  this.ctx.fillText("Score: "+score, this.game.surfaceWidth/3, this.game.surfaceHeight/1.6);

  if (this.game.running == false)
  {
    this.startGame();
  }
}

MainMenu.prototype.update = function()
{
  if (this.game.keysnr[STANDARD.MAINMENU_CONTROL_KEY]) 
  {
    if (this.visible)
    {
      this.visible = false;
      this.game.paused = false;
    }
    else
    {
      this.visible = true;
      this.game.paused = true;
    }
  }
  this.game.keysnr[STANDARD.MAINMENU_CONTROL_KEY] = false;
}

MainMenu.prototype.getVisibility = function()
{
  return this.visible;
}


MainMenu.prototype.startGame = function()
{

  this.game = null;
  var game = new SpiderFish();
  var ASSET_MANAGER = new AssetManager();
  // TODO: replace this level the first level when designed.
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
}
