/* The main player ship in the game
 * there should only be 1 instance of this class at any time
 */
function PlayerShip(game) 
{
  Entity.call(this, game,
    game.halfSurfaceWidth/2, 
    game.halfSurfaceHeight/2,
    CONST.PLAYER_SHIP_IMAGE
  );

  this.xVelo = 0.0;
  this.yVelo = 0.0;
  this.weaponList = [];
  this.weaponList.push(new PeaShooter(this.game, this));
  this.weaponList.push(new DoubleBarrel(this.game, this));
  this.weaponList.push(new TriShooter(this.game, this));

  // the index in weaponList of the active weapon
  this.gunTime = 0;
  this.activeWeapon = 0; 
  this.halo = new BastardCircle(this.game,this);
  this.game.addEntity(this.halo);
  this.health = CONST.PLAYER_SHIP_HEALTH;

  this.shooting = false;
  
  this.ammo_imgs = [
    ASSET_MANAGER.getAsset(CONST.PEA_SHOOTER_AMMO_IMAGE),
    ASSET_MANAGER.getAsset(CONST.DOUBLE_BARREL_AMMO_IMAGE),
    ASSET_MANAGER.getAsset(CONST.TRI_SHOOTER_AMMO_IMAGE)
  ];
}
obj.extend(PlayerShip, Entity);

PlayerShip.prototype.update = function() 
{
  //update position
  //add the velocity*time to the x,y position
  this.xVelo = 
      (this.game.keys[CONST.PLAYER_SHIP_KEY_LEFT] ? 1 : 0) * -CONST.PLAYER_SHIP_SPEED 
    + (this.game.keys[CONST.PLAYER_SHIP_KEY_RIGHT] ? 1 : 0) * CONST.PLAYER_SHIP_SPEED;

  this.yVelo = 
      (this.game.keys[CONST.PLAYER_SHIP_KEY_UP] ? 1 : 0) * -CONST.PLAYER_SHIP_SPEED 
    + (this.game.keys[CONST.PLAYER_SHIP_KEY_DOWN] ? 1 : 0) * CONST.PLAYER_SHIP_SPEED;

  this.x += this.xVelo * this.game.clockTick;
  this.y += this.yVelo * this.game.clockTick;

  //make sure the ship is still on the screen
  if (this.x - this.w/2 < 0)
  {
    this.x = this.w/2;
  }
  else if (this.x + this.w/2 > this.game.surfaceWidth)
  {
    this.x = this.game.surfaceWidth - this.w/2;
  }

  if (this.y - this.h/2 < 0)
  {
    this.y = this.h/2;
  }
  else if (this.y + this.h/2 > this.game.surfaceHeight)
  {
    this.y = this.game.surfaceHeight - this.h/2;
  }

  this.checkWeapons();

  //update the current activeWeapons
  var weapon = this.weaponList[this.activeWeapon];
  weapon.update();
  this.halo.setShootingState( weapon.isShooting, weapon.bulletsPerShot() );

  PlayerShip.zuper.update.call(this);
}

PlayerShip.prototype.checkWeapons = function() 
{
  //check to see if the player has a debuff on him
  if (this.gunTime > 0){
		this.gunTime--;
	}
  else{
		this.activeWeapon = 0;
	}
}

PlayerShip.prototype.drawHealthBar = function(ctx) 
{
  var width = this.w * (this.health / CONST.PLAYER_SHIP_HEALTH);
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.fillStyle = "green";
  ctx.beginPath();
  ctx.rect(-this.w/2, this.h/2 + 4, width, 6);
  ctx.fill();
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.rect(-this.w/2 + width, this.h/2 + 4, this.w - width, 6);
  ctx.fill();
  ctx.restore();
}

PlayerShip.prototype.draw = function(ctx) 
{
  this.drawHealthBar(ctx);
  this.drawSpriteCentered(ctx);
  PlayerShip.zuper.draw.call(this, ctx);
}

PlayerShip.prototype.addHealth = function(amount) 
{
  this.health += amount;
  if ( this.health > CONST.PLAYER_SHIP_HEALTH ) 
  {
    this.health = CONST.PLAYER_SHIP_HEALTH;
  }
}
