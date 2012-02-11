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

//
// TODO: code in here may be repetitive in other bullet types.
//
PeaBullet.prototype.collide = function() 
{
  var entities = this.game.getCollisions(this);
  for (var i = 0; entity = entities[i]; i++)
  {
    if (entity instanceof Enemy) 
    {
      this.removeFromWorld = true;
      this.explode = true;
      entity.health -= CONST.PEA_BULLET_DAMAGE;
      break;
    }
  }
}

PeaBullet.prototype.draw = function(ctx) 
{
  this.drawSpriteCentered(ctx);
  PeaBullet.zuper.draw.call(this, ctx);
}

