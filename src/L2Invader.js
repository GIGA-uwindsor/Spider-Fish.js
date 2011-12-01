function L2Invader(game, x, y, path) 
{
  //enemy that looks like 2
  //call EnemyChange, pass important parameters (needed for Enemy.call) and 'next enemy' that appears after death
  WanderingInvader.call(this, game, x, y, path,
    CONST.L2INVADER_IMAGE,
    CONST.L2INVADER_HEALTH,
    CONST.L2INVADER_DAMAGE,
    CONST.L2INVADER_POINTS
  );
}
obj.extend(L2Invader, WanderingInvader);

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


