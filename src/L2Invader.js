function L2Invader(game, x, y, path) 
{
  //enemy that looks like 2
  //call EnemyChange, pass important parameters (needed for Enemy.call) and 'next enemy' that appears after death
  EnemyChange.call(this, game, x, y,
    CONST.L2INVADER_IMAGE,
    CONST.L2INVADER_HEALTH,
	null
  );
  this.weapon = new OrbBlaster(this.game, this);
  this.path = path;
  this.sx = x;
  this.sy = y;
}
obj.extend(L2Invader,EnemyChange);

//(collide funtion similar to function in WanderingInvader)
L2Invader.prototype.collide = function() 
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
        entity.health -= CONST.L2INVADER_DAMAGE;
        this.game.score += CONST.L2INVADER_POINTS;
      }
    }
  }
  L2Invader.zuper.collide.call(this);
}


