/* General base class for all enemies
 * inherits from entity
 *
 * collids with human bullets
 */
function Collectable(game, x, y, imgStr, health) 
{
  Entity.call(this, game, x, y, imgStr);
  this.health = health;
  this.maxHealth = health;
}
obj.extend(Collectable, Entity);

Collectable.prototype.collide = function() 
{
  Collectable.zuper.collide.call(this);
}

Collectable.prototype.update = function() 
{
  Collectable.zuper.update.call(this);
}

Collectable.prototype.draw = function(ctx) 
{
  Collectable.zuper.draw.call(this, ctx);
}
