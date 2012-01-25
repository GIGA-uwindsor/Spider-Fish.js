// An abstract class for types of enemies that will wander and shoot down
function WanderingInvader(game, x, y, path, image, health, damage, points) 
{
  Enemy.call(this, game, x, y, image, health);
  this.weapon = new OrbBlaster(this.game, this);
  this.path = path;
  this.sx = x;
  this.sy = y;
  
  this.damage = damage;
  this.points = points;

  this.explode = false;
  this.drop = false;

  this.explosionRadius = 0;
}
obj.extend(WanderingInvader, Enemy);

WanderingInvader.prototype.destroy = function() 
{
  if (this.explode) 
  {
    if (this.explosionRadius != 0)                           
      this.game.addEntity(new Explosion(this.game, this.x, this.y, 0, this.explosionRadius));
    else
      this.game.addEntity(new Explosion(this.game, this.x, this.y));

    if (this.explosionRadius != 0)
      this.destroyOthers(); 

    if (this.drop)
      this.game.dropCollectable(this.x, this.y);
  }
}

WanderingInvader.prototype.destroyOthers = function()
{
  //destroy others 
  var aCounter = this.explosionRadius;
  var bCounter = 1;

  while (bCounter < this.explosionRadius)
  {
    var result = this.game.aabb.intersects(
      new AabbTree.AxisAlignedBox(
        [this.x - this.w/2, this.y - this.h/2],
        [this.w*aCounter, this.h*bCounter]
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
          entity.health -= this.damage;
          this.game.score += this.points;
          bCounter = this.explosionRadius;
        }
      }
    }
    WanderingInvader.zuper.collide.call(this);
    aCounter--;
    if (bCounter < this.explosionRadius)
      bCounter = Math.sqrt(this.explosionRadius*this.explosionRadius - aCounter*aCounter);
  }
}

WanderingInvader.prototype.collide = function() 
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
        entity.health -= this.damage;
        this.game.score += this.points;
      }
    }
  }
  WanderingInvader.zuper.collide.call(this);
}

WanderingInvader.prototype.update = function() 
{
  //make sure it still has health
  if (this.health <= 0) 
  {
    this.explode = true;
    this.removeFromWorld = true;
    this.drop = true;
  }

  //check to see if its off the bottom of the screen
  if (this.offBottom()) 
  {
    console.log("off the bottom");
    this.removeFromWorld = true;
  }

  //update weapon
  this.weapon.update();
  WanderingInvader.zuper.update.call(this);
}

WanderingInvader.prototype.draw = function(ctx) 
{
  this.drawHealthBar(ctx);
  this.drawSpriteCentered(ctx);
  WanderingInvader.zuper.draw.call(this, ctx);
}

