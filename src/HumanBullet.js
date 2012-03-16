/* General base class for human bullets
 * Should not an instance of this class directly
 * 
 * does not collide with anything by itself
 */
function HumanBullet(game, x, y, xv, yv, imgStr) 
{
  Entity.call(this, game, x, y, imgStr);
  this.xVelo = xv;
  this.yVelo = yv;
  this.explode = false;
}
obj.extend(HumanBullet, Entity);

HumanBullet.prototype.update = function() 
{
  this.x += this.xVelo * this.game.clockTick;
  this.y += this.yVelo * this.game.clockTick;
  
  // kill the bullet if its outside the game screen
  if (this.y <= -20)
  {
    this.removeFromWorld = true;
  }
}

HumanBullet.prototype.paused = function()
{
}

HumanBullet.prototype.draw = function(ctx) 
{
  HumanBullet.zuper.draw.call(this, ctx);
}
