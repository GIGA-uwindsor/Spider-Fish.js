function Explosion(game, x, y, which, size) 
{
  Entity.call(this, game, x, y);
  var sheet = ASSET_MANAGER.getAsset('img/explosions.png');
  if (which) 
  {
    var exp = which;
  }
  else 
  {
    var exp = Math.floor(Math.random() * 8);
  }
  this.size = size;
  //sprite-sheet, width, height, heightoffset, duration, ?loop
  this.animation = new Animation(sheet, 64, 64, 64*exp, 0.04);
}
obj.extend(Explosion, Entity);

Explosion.prototype.update = function() 
{
  if (this.animation.isDone()) 
  {
    this.removeFromWorld = true;
  }
  Entity.prototype.update.call(this);
}

Explosion.prototype.draw = function(ctx) 
{
  this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.size);
  Entity.prototype.draw.call(this, ctx);
}

