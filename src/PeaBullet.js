function PeaBullet(game, x, y, a) 
{
  var xv = Math.cos(a) * CONST.PEA_BULLET_SPEED;
  var yv = Math.sin(a) * CONST.PEA_BULLET_SPEED;
  var life = 1;
  HumanBullet.call(this, game, x, y, xv, yv, life, CONST.PEA_BULLET_IMAGE);
}
obj.extend(PeaBullet, HumanBullet);

PeaBullet.prototype.destroy = function() 
{
  if (this.explode) 
  {
    this.game.addEntity(new Explosion(this.game, this.x, this.y, 3));
  }
}

PeaBullet.prototype.collide = function() 
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
      if (entity instanceof Enemy) 
      {
        this.removeFromWorld = true;
        this.explode = true;
        entity.health -= CONST.PEA_BULLET_DAMAGE;
      }
    }
  }
}

PeaBullet.prototype.draw = function(ctx) 
{
  this.drawSpriteCentered(ctx);
  PeaBullet.zuper.draw.call(this, ctx);
}

