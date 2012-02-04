function DeadlyExplosion(game, x, y, which, explosionRadius, damage, centerX, centerY)
{
	Explosion.call(this, game, x, y, 0, explosionRadius);
	this.damage = damage;
	this.setDamage = true;
	this.setX = x;
	this.setY = y;
	this.setCX = centerX;
	this.setCY = centerY;
	this.setRadius = explosionRadius*centerX;
  //this.game.addEntity(new DeadlyExplosion(this.game, this.x, this.y, 0, this.explosionRadius));
}
obj.extend(DeadlyExplosion, Explosion);

DeadlyExplosion.prototype.collide = function() 
{
  var aCounter = this.explosionRadius;
  var bCounter = 1;
	//var damage = 10;
	
	var result = this.game.aabb.intersects( new AabbTree.AxisAlignedBox
		([this.x - this.setCX/2,this.y - this.setCY/2],[this.setRadius,this.setRadius]));//this.w, this.h]) );
		
	for (id in result)
	{
		var entity = this.game.entities[id];
		if (!entity.removeFromWorld)
		{
			if (entity instanceof PlayerShip)
			{
				if (this.setDamage)
				{
					this.setDamage = false;
					//this.removeFromWorld = true;
					entity.health -= this.damage;
					this.game.score += this.points;
				}
			}
			else
			{
			}
		}
	}
		
  /*while (bCounter < this.explosionRadius)
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
		*/	
		DeadlyExplosion.zuper.collide.call(this);
}