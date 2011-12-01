function X_2Invader(game, x, y, path) 
{
  //enemy that looks like X^2
  //call EnemyChange, pass important parameters (needed for Enemy.call) and 'next enemy' that appears after death
  EnemyChange.call(this, game, x, y,
    CONST.X_2INVADER_IMAGE,
    CONST.X_2INVADER_HEALTH,
	X2Invader
  );
  this.weapon = new OrbBlaster(this.game, this);
  this.path = path;
  this.sx = x;
  this.sy = y;
}
obj.extend(X_2Invader,EnemyChange);

//(collide funtion similar to function in WanderingInvader)
X_2Invader.prototype.collide = function() 
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
        entity.health -= CONST.X_2INVADER_DAMAGE;
        this.game.score += CONST.X_2INVADER_POINTS;
      }
    }
  }
  X_2Invader.zuper.collide.call(this);
}


