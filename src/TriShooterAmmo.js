function TriShooterAmmo(game, x, y) 
{
  Collectable.call(this, game, x, y, CONST.TRI_SHOOTER_AMMO_IMAGE);
  this.yVelo = CONST.TRI_SHOOTER_AMMO_SPEED;
}
obj.extend(TriShooterAmmo, Collectable);

TriShooterAmmo.prototype.collide = function() 
{
  var result = this.game.aabb.intersects(
    new AabbTree.AxisAlignedBox(
      [this.x - this.w/2, this.y - this.h/2],
      [this.w, this.h]
    )
  );

  for (id in result) 
  {
    var entity = this.game.entities[id];
    if (!entity.removeFromWorld) 
    {
      if (entity instanceof PlayerShip) 
      {
        entity.addAmmo(CONST.TRI_SHOOTER_AMMO_ID, CONST.TRI_SHOOTER_AMMO_AMMO);
        this.removeFromWorld = true;
      }
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
