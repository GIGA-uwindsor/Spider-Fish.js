function AngryMorph(game, x, y) 
{
  Entity.call(this, game, x, y);
  var sheet = ASSET_MANAGER.getAsset('img/angryMorph.png');
  //sprite-sheet, width,height,heightoffset,duration,?loop
  this.animation = new Animation(sheet, 40, 36, 0, 0.05);
}
obj.extend(AngryMorph, Entity);

AngryMorph.prototype.destroy = function() 
{
  this.game.addEntity(new AngryInvader(this.game, this.x, this.y));
}

AngryMorph.prototype.update = function() 
{
  if (this.animation.isDone()) 
  {
    this.removeFromWorld = true;
  }
  Entity.prototype.update.call(this);
}

AngryMorph.prototype.draw = function(ctx) 
{
  this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
  Entity.prototype.draw.call(this, ctx);
}

