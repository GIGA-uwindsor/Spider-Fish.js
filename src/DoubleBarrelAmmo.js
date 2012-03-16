function DoubleBarrelAmmo(game, x, y, a) 
{
  Collectable.call(this, game, x, y, CONST.DOUBLE_BARREL_AMMO_IMAGE);
  this.yVelo = a + CONST.DOUBLE_BARREL_AMMO_SPEED;
}
obj.extend(DoubleBarrelAmmo, Collectable);

DoubleBarrelAmmo.prototype.collide = function() 
{
  var entities = this.game.getCollisions(this);
  for (var i = 0; entity = entities[i]; i++)
  {
    if (entity instanceof PlayerShip) 
    {
      entity.activeWeapon = 1;
	  entity.gunTime = 50;
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
