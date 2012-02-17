/* General Base class for enemy bullets
 * Shouldn't make instance of this class directly
 *
 * does not collide with anything itself
 */
function EnemyBullet(game, x, y, xv, yv, imgStr) 
{
  Entity.call(this, game, x, y, imgStr);
  this.xVelo = xv;
  this.yVelo = yv;
  this.explode = false;
}
obj.extend(EnemyBullet, Entity);

EnemyBullet.prototype.update = function() 
{
  this.x += this.xVelo * this.game.clockTick;
  this.y += this.yVelo * this.game.clockTick;
  if (this.offBottom()) 
  {
    this.removeFromWorld = true;
  } 
  EnemyBullet.zuper.update.call(this);
}

EnemyBullet.prototype.draw = function(ctx) 
{
  this.drawSpriteCentered(ctx);
  EnemyBullet.zuper.draw.call(this, ctx);
}
