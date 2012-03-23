/* General base class for all enemies
 * inherits from entity
 *
 * collids with human bullets
 */
function Enemy(game, x, y, imgStr, points,
               health, speed, collisionDamage, fireRate, movementPattern, firingPattern) 
{
  Entity.call(this, game, x, y, imgStr);

  this.health = health;
  this.maxHealth = health;
  this.speed = speed;                       // pixels/s
  this.collisionDamage = collisionDamage;
  this.fireRate = fireRate;                 // delay in seconds between successive firing patterns
  this.movementPattern = movementPattern;
  this.firingPattern = firingPattern;

  this.timeSinceLastShot = 0;
  this.explode = false;
  this.explosionRadius = 0;
  this.points = points;
  this.givePoints = false;
}
obj.extend(Enemy, Entity);

Enemy.prototype.collide = function() 
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
  		  this.removeFromWorld = true;
			  entity.health -= this.collisionDamage;
			  this.givePoints = true;
      }
    }
  }
  Enemy.zuper.collide.call(this);
}

Enemy.prototype.update = function() 
{
  if (this.movementPattern != null)
    this.movementPattern.update();

  if (this.firingPattern != null)
  {
    this.timeSinceLastShot += this.game.clockTick;
    if (this.timeSinceLastShot > 1.0 / this.fireRate) 
    {
      this.firingPattern.fire();
      this.timeSinceLastShot = 0;
    }
  }

  //make sure it still has health
  if (this.health <= 0) 
  {
    this.explode = true;
    this.removeFromWorld = true;
    this.drop = true;
    this.givePoints = true;
  }

  //check to see if its off the bottom of the screen
  if (this.offBottom()) 
  {
    console.log("off the bottom");
    this.removeFromWorld = true;
  }

  Enemy.zuper.update.call(this);
}

Enemy.prototype.draw = function(ctx) 
{
  this.drawHealthBar(ctx);
  this.drawSpriteCentered(ctx);
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

Enemy.prototype.destroy = function() 
{
  if (this.explode) 
  {
    if (this.explosionRadius != 0)                           
      this.game.addEntity(new DeadlyExplosion(this.game, this.x, this.y, 
				this.explosionRadius, this.collisionDamage, this.h));
    else
      this.game.addEntity(new Explosion(this.game, this.x, this.y));

    if (this.drop)
      this.game.LoadLevel.dropCollectable(this.x, this.y);
  }
}
