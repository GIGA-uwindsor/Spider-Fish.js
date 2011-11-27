function AimlessDonut() {
  GameEngine.call(this);
  this.lives = CONST.BEGIN_LIVES;
  this.score = 0;
  this.backPos = 0;
  this.level = null;
  this.aggressionMeter = new AggressionMeter();
}
obj.extend(AimlessDonut,GameEngine);

AimlessDonut.prototype.setLevel = function(level) {
  this.level = level;
}

AimlessDonut.prototype.start = function() {
  if (this.level == null) {
    console.error("there is no level");
    return;
  }
  this.playerShip = new PlayerShip(this);
  this.addEntity(this.playerShip);
  AimlessDonut.zuper.start.call(this);
}

AimlessDonut.prototype.clear = function() {
  AimlessDonut.zuper.clear.call(this);
  this.health = CONST.BEGIN_HEALTH;
  this.playerShip = new PlayerShip(this);
  this.addEntity(this.playerShip);
}

AimlessDonut.prototype.update = function() {
  /*
  if (this.lastEnemyAddedAt == null 
      || (this.timer.gameTime - this.lastEnemyAddedAt) > CONST.ENEMY_SPAWN_RATE) {
    this.addEntity( new WanderingInvader(this, (Math.random()-.5) * this.ctx.canvas.width, -this.ctx.canvas.height/2+1));
    this.lastEnemyAddedAt = this.timer.gameTime;
  }
  */
  this.level.update();
  /*
  if (this.level.isDone()) {
    console.log("level finished");
    this.running = false;
  }
  */

  //move background
  this.backPos += this.clockTick*CONST.BACKGROUND_SPEED;
  if (this.background && this.backPos > this.background.height) {
    this.backPos -= this.background.height;
  }


  //check player ships health
  if (this.playerShip.health <= 0) {
    this.lives -= 1;
    this.clear();
  }
  if (this.lives < 1) {
    this.running = false;
  }  
  AimlessDonut.zuper.update.call(this);
  
  // TODO: we don't have a visual aggression meter,
  // so the best we can do is write it to the console.
  console.log(this.aggressionMeter.read());
}

AimlessDonut.prototype.draw = function() {
  this.drawBackground();
  AimlessDonut.zuper.draw.call(this, 
      function(game) {
        game.drawBackground();
      },
      function(game) {
        game.drawScore();
        game.drawLives();
      });
}

AimlessDonut.prototype.drawBackground = function() {
  if (this.background == null) {
    var img = ASSET_MANAGER.getAsset(CONST.BACKGROUND);
    var ratio = this.ctx.canvas.width/img.width;
    var offScreenCanvas = document.createElement('canvas');
    offScreenCanvas.width = this.ctx.canvas.width;
    offScreenCanvas.height = img.height * ratio;
    var ofctx = offScreenCanvas.getContext('2d');
    ofctx.drawImage(img,0,0,offScreenCanvas.width,offScreenCanvas.height);
    this.background = offScreenCanvas;
  }
  else {
    this.ctx.drawImage(this.background, 0, this.backPos-this.background.height);
    this.ctx.drawImage(this.background, 0, this.backPos);
    this.ctx.drawImage(this.background, 0, this.backPos+this.background.height);
  }
}

AimlessDonut.prototype.drawLives = function() {
  this.ctx.fillStyle = "green";
  this.ctx.font = "bold 1em Arial";
  this.ctx.fillText("Lives: " + this.lives, 10, this.ctx.canvas.height - 25);
}

AimlessDonut.prototype.drawScore = function() {
  this.ctx.fillStyle = "green";
  this.ctx.font = "bold 1em Arial";
  this.ctx.fillText("Score: " + this.score,10,this.ctx.canvas.height - 10);
}

AimlessDonut.prototype.dropCollectable = function(x,y) {
  var n = Math.floor(Math.random()*3);
  switch(n) {
    case 0:
      this.addEntity(new HealthItem(this,x,y));
      break;
    case 1:
      this.addEntity(new TriShooterAmmo(this,x,y));
      break;
    case 2:
      this.addEntity(new DoubleBarrelAmmo(this,x,y));
      break;
    default:
      console.log("RNG produced unexpected value " + n + " in powerup \
      generator");
      break;
  }
  return HealthItem;
}
