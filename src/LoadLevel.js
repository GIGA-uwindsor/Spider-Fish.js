function LoadLevel(game)
{
  this.lives = CONST.BEGIN_LIVES;
	this.score = 0;
  this.backPos = 0;
	this.game = game;
	this.level = null;
}
obj.extend(LoadLevel, GameEngine);

LoadLevel.prototype.setLevel = function(level)
{
	this.level = level;
}

LoadLevel.prototype.start = function()
{
	SpiderFish.zuper.clear.call(this.game);
  this.playerShip = new PlayerShip(this.game);
  this.game.addEntity(this.playerShip);
}

LoadLevel.prototype.clear = function() 
{
  SpiderFish.zuper.clear.call(this.game);
  this.health = CONST.BEGIN_HEALTH;
  this.playerShip = new PlayerShip(this.game);
  this.game.addEntity(this.playerShip);
}

LoadLevel.prototype.update = function()
{
    this.level.update();
    //move background
    this.backPos += this.game.clockTick*CONST.BACKGROUND_SPEED;
    if (this.game.background && this.backPos > this.game.background.height) 
    {
      this.backPos -= this.game.background.height;
    }
		
    if (this.playerShip.health <= 0) 
    {
      this.lives -= 1;
      this.clear();
    }
    if (this.lives < 1) 
    {
      this.clear();
      this.game.running = false;
      this.game.StartMenu.draw();
    }  
}

LoadLevel.prototype.preDraw = function()
{
  this.drawBackground();
}

LoadLevel.prototype.postDraw = function()
{
  this.drawScore();
  this.drawLives();
}

LoadLevel.prototype.drawLives = function() 
{
  this.game.ctx.fillStyle = "green";
  this.game.ctx.font = "bold 1em Arial";
  this.game.ctx.fillText("Lives: " + this.lives, 10, this.game.ctx.canvas.height - 25);
}

LoadLevel.prototype.drawScore = function() 
{
  this.game.ctx.fillStyle = "green";
  this.game.ctx.font = "bold 1em Arial";
  this.game.ctx.fillText("Score: " + this.score, 10, this.game.ctx.canvas.height - 10);
}

LoadLevel.prototype.drawBackground = function() 
{
  if (this.game.background == null) 
  {
    var img = ASSET_MANAGER.getAsset(CONST.BACKGROUND);
    var ratio = this.game.ctx.canvas.width / img.width;
    var offScreenCanvas = document.createElement('canvas');
    offScreenCanvas.width = this.game.ctx.canvas.width;
    offScreenCanvas.height = img.height * ratio;
    var ofctx = offScreenCanvas.getContext('2d');
    ofctx.drawImage(img, 0, 0, offScreenCanvas.width, offScreenCanvas.height);
    this.game.background = offScreenCanvas;
  }
  else 
  {
    this.game.ctx.drawImage(this.game.background, 0, this.backPos - this.game.background.height);
    this.game.ctx.drawImage(this.game.background, 0, this.backPos);
    this.game.ctx.drawImage(this.game.background, 0, this.backPos + this.game.background.height);
  }
}

LoadLevel.prototype.dropCollectable = function(x, y) 
{
  var n = Math.floor(Math.random() * 4);
  switch(n) 
  {
    case 0:
      this.game.addEntity(new HealthItem(this.game, x, y));
      break;

    case 1:
      this.game.addEntity(new TriShooterAmmo(this.game, x, y));
      break;

    case 2:
      this.game.addEntity(new DoubleBarrelAmmo(this.game, x, y));
      break;
    case 3:
      this.game.addEntity(new HaloBonus(this.game,x,y));
      break;
    default:
      console.log("RNG produced unexpected value " + n + " in powerup \ generator");
      break;
  }
  return HealthItem;
}