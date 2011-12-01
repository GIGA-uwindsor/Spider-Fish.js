/* General base class for all enemies
 * inherits from entity
 *
 * collids with human bullets
 */
function Enemy(game, x, y, imgStr, health) 
{
  Entity.call(this, game, x, y, imgStr);
  this.health = health;
  this.maxHealth = health;
  this.explode = false;
}
obj.extend(Enemy, Entity);

Enemy.prototype.collide = function() 
{
}

Enemy.prototype.update = function() 
{
}

Enemy.prototype.draw = function(ctx) 
{
  Enemy.zuper.draw.call(this, ctx);
}

Enemy.prototype.drawHealthBar = function(ctx) 
{
  if (this.health >= this.maxHealth || this.health <= 0) {
    return;
  }
  var width = this.w * (this.health/this.maxHealth);
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.fillStyle = "green";
  ctx.beginPath();
  ctx.rect(-this.w/2, -this.h/2 - 10, width, 6);
  ctx.fill();
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.rect(-this.w/2 + width, -this.h/2 - 10, this.w - width, 6);
  ctx.fill();
  ctx.restore();
}

