function DeadlyExplosion(game, x, y, explosionDiameter, damage, enemyHeight)
{	//(x = position at x, y = position at y, explosionDiameter = diameter(ratio) of explosion,
	//damage = damage delt to affected entity caught in explosion, 
	//enemyHeight = height of enemy parent of explosion which is used to set diameter.
	Explosion.call(this, game, x, y, 0, explosionDiameter);
	this.damage = damage;
	this.isDamaging = true;
	this.setDiameter = explosionDiameter*enemyHeight;
}
obj.extend(DeadlyExplosion, Explosion);

DeadlyExplosion.prototype.collide = function() 
{
	var result = this.game.aabb.intersects( new AabbTree.AxisAlignedBox
		([this.x - this.setDiameter/2,this.y - this.setDiameter/2]
		,[this.setDiameter,this.setDiameter]));
		
	for (id in result)
	{
		var entity = this.game.entities[id];
		if (!entity.removeFromWorld)
		{
			if (entity instanceof PlayerShip)		//only affect enemy
			{
				if (this.isDamaging)
				{
					this.isDamaging = false;
					entity.health -= this.damage;
				}
			}
			else																//affect other enemies (optional)
			{
			}
		}
	}
	
	DeadlyExplosion.zuper.collide.call(this);
}