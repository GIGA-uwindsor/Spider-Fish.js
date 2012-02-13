function SpiderFish() 
{
  GameEngine.call(this);
  this.lives = CONST.BEGIN_LIVES;
  this.score = 0;
  this.backPos = 0;
  this.level = null;
}
obj.extend(SpiderFish, GameEngine);

SpiderFish.prototype.setLevel = function(level) 
{
  this.level = level;
}

SpiderFish.prototype.start = function() 
{
  if (this.level == null) 
  {
    console.error("there is no level");
    return;
  }
  this.playerShip = new PlayerShip(this);
  this.addEntity(this.playerShip);
  SpiderFish.zuper.start.call(this);
  this.Menu.init();
}

SpiderFish.prototype.clear = function() 
{
  SpiderFish.zuper.clear.call(this);
  this.health = CONST.BEGIN_HEALTH;
  this.playerShip = new PlayerShip(this);
  this.addEntity(this.playerShip);
}

SpiderFish.prototype.update = function() 
{
	this.Menu.update();
	if (this.paused == false)
	{
		this.level.update();
		//move background
		this.backPos += this.clockTick*CONST.BACKGROUND_SPEED;
		if (this.background && this.backPos > this.background.height) 
		{
			this.backPos -= this.background.height;
		}

		//check player ships health
		if (this.playerShip.health <= 0) 
		{
			this.lives -= 1;
			this.clear();
		}
		if (this.lives < 1) 
		{
			this.clear();
			this.running = false;
			this.Menu.draw();
		}  
		SpiderFish.zuper.update.call(this);
	}
	else
	{
		SpiderFish.zuper.paused.call(this);
	}
}

SpiderFish.prototype.preDraw = function()
{
  this.drawBackground();
}

SpiderFish.prototype.postDraw = function()
{
  this.drawScore();
  this.drawLives();
	if (this.Menu.getVisibility())
	{
		this.Menu.draw();
	}
}

SpiderFish.prototype.drawBackground = function() 
{
  if (this.background == null) 
  {
    var img = ASSET_MANAGER.getAsset(CONST.BACKGROUND);
    var ratio = this.ctx.canvas.width / img.width;
    var offScreenCanvas = document.createElement('canvas');
    offScreenCanvas.width = this.ctx.canvas.width;
    offScreenCanvas.height = img.height * ratio;
    var ofctx = offScreenCanvas.getContext('2d');
    ofctx.drawImage(img, 0, 0, offScreenCanvas.width, offScreenCanvas.height);
    this.background = offScreenCanvas;
  }
  else 
  {
    this.ctx.drawImage(this.background, 0, this.backPos - this.background.height);
    this.ctx.drawImage(this.background, 0, this.backPos);
    this.ctx.drawImage(this.background, 0, this.backPos + this.background.height);
  }
}

SpiderFish.prototype.drawLives = function() 
{
  this.ctx.fillStyle = "green";
  this.ctx.font = "bold 1em Arial";
  this.ctx.fillText("Lives: " + this.lives, 10, this.ctx.canvas.height - 25);
}

SpiderFish.prototype.drawScore = function() 
{
  this.ctx.fillStyle = "green";
  this.ctx.font = "bold 1em Arial";
  this.ctx.fillText("Score: " + this.score, 10, this.ctx.canvas.height - 10);
}

SpiderFish.prototype.dropCollectable = function(x, y) 
{
  var n = Math.floor(Math.random() * 4);
  switch(n) 
  {
    case 0:
      this.addEntity(new HealthItem(this, x, y));
      break;

    case 1:
      this.addEntity(new TriShooterAmmo(this, x, y));
      break;

    case 2:
      this.addEntity(new DoubleBarrelAmmo(this, x, y));
      break;
    case 3:
      this.addEntity(new HaloBonus(this,x,y));
      break;
    default:
      console.log("RNG produced unexpected value " + n + " in powerup \ generator");
      break;
  }
  return HealthItem;
}