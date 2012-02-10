/*basic orb bullet for the enemies
 *fired from standard OrbShooter
 */
function OrbBullet(game, x, y, a) 
{
  var xv = Math.cos(a) * CONST.ORB_BULLET_SPEED;
  var yv = Math.sin(a) * CONST.ORB_BULLET_SPEED;
  EnemyBullet.call(this, game, x, y, xv, yv, CONST.ORB_BULLET_IMAGE);
}
obj.extend(OrbBullet, EnemyBullet);

OrbBullet.prototype.destroy = function() 
{
  if (this.explode) 
  {
    this.game.addEntity(new Explosion(this.game, this.x, this.y, 3));
  }
}

OrbBullet.prototype.collide = function() 
{
  var entities = this.game.getCollisions(this);
  for (var i = 0; entity = entities[i]; i++)
  {
    if (entity instanceof PlayerShip) 
    {
      entity.health -= CONST.ORB_BULLET_DAMAGE;
      this.removeFromWorld = true;
      this.explode = true;
    }
  }
  OrbBullet.zuper.collide.call(this);
}

OrbBullet.prototype.update = function() 
{
  OrbBullet.zuper.update.call(this, ctx);
}

OrbBullet.prototype.draw = function(ctx) 
{
  OrbBullet.zuper.draw.call(this, ctx);
}

