function DoubleBarrelAmmo(game, x, y) 
{
  Collectable.call(this, game, x, y, CONST.DOUBLE_BARREL_AMMO_IMAGE);
  this.yVelo = CONST.DOUBLE_BARREL_AMMO_SPEED;
}
obj.extend(DoubleBarrelAmmo, Collectable);

DoubleBarrelAmmo.prototype.collide = function() 
{
  var entities = this.game.getCollisions(this);
  for (var i = 0; entity = entities[i]; i++)
  {
    if (entity instanceof PlayerShip) 
    {
      entity.activeWeapon = entity.weaponList[1];
	  entity.gunTime = 10;
      this.removeFromWorld = true;
    }
  }
  DoubleBarrelAmmo.zuper.collide.call(this);
}

DoubleBarrelAmmo.prototype.update = function() 
{
  this.y += this.yVelo * this.game.clockTick;
  DoubleBarrelAmmo.zuper.update.call(this);
}

DoubleBarrelAmmo.prototype.draw = function(ctx) 
{
  this.drawSpriteCentered(ctx);
  DoubleBarrelAmmo.zuper.draw.call(this, ctx);
}
