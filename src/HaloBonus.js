function HaloBonus(game, x, y) {
  Collectable.call(this, game, x, y, CONST.HALO_BONUS_IMAGE);
  this.yVelo = CONST.HALO_BONUS_SPEED;
}
obj.extend(HaloBonus,Collectable);

HaloBonus.prototype.collide = function()
{
  var entities = this.game.getCollisions(this);
  for (var i = 0; entity = entities[i]; i++)
  {
    if (entity instanceof PlayerShip)
    {
      entity.halo.radIncrease(CONST.HALO_BONUS_AMOUNT);
      this.removeFromWorld = true;
    }
  }
  HaloBonus.zuper.collide.call(this);
}

HaloBonus.prototype.update = function()
{
  this.y += this.yVelo * this.game.clockTick;
  HaloBonus.zuper.update.call(this);
}

HaloBonus.prototype.draw = function(ctx)
{
  this.drawSpriteCentered(ctx);
  HaloBonus.zuper.draw.call(this,ctx);
}
