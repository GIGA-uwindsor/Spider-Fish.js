function TriShooterAmmo(game, x, y) 
{
  Collectable.call(this, game, x, y, CONST.TRI_SHOOTER_AMMO_IMAGE);
  this.yVelo = CONST.TRI_SHOOTER_AMMO_SPEED;
}
obj.extend(TriShooterAmmo, Collectable);

TriShooterAmmo.prototype.collide = function() 
{
  var entities = this.game.getCollisions(this);
  for (var i = 0; entity = entities[i]; i++)
  {
    if (entity instanceof PlayerShip) 
    {
      entity.addAmmo(CONST.TRI_SHOOTER_AMMO_ID, CONST.TRI_SHOOTER_AMMO_AMMO);
      this.removeFromWorld = true;
    }
  }
  TriShooterAmmo.zuper.collide.call(this);
}

TriShooterAmmo.prototype.update = function() 
{
  this.y += this.yVelo * this.game.clockTick;
  TriShooterAmmo.zuper.update.call(this);
}

TriShooterAmmo.prototype.draw = function(ctx) 
{
  this.drawSpriteCentered(ctx);
  TriShooterAmmo.zuper.draw.call(this, ctx);
}
