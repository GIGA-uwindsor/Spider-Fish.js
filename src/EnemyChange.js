function EnemyChange(game, x, y, image, health, nextType) 
{
  Enemy.call(this, game, x, y,
    image,
    health
  );
  this.nextType = nextType;
}
obj.extend(EnemyChange,Enemy);

EnemyChange.prototype.destroy = function() 
{
  if (this.explode) 
  {
    this.game.addEntity(new Explosion(this.game, this.x, this.y));
    if (this.nextType != null)
	{
	  //used to create next enemy, if next enemy != null
	  var newEnt = new this.nextType(this.game, this.sx, this.sy,  this.path);
	  newEnt.x = this.x;
      newEnt.y = this.y;
      this.game.addEntity(newEnt);
	}
	else
	{
	  //drop collectable if no more enemies
	  this.game.dropCollectable(this.x, this.y);
	}
  }
}

//(similar to WanderingInvader)
EnemyChange.prototype.update = function() 
{
  //traverse pathway
  if (this.path.length == 0) 
  {
    console.log("ran out of path");
    this.removeFromWorld = true;
  }
  else 
  {
    this.path[0].update(this.game.clockTick);
    this.x = this.sx + this.path[0].getX();
    this.y = this.sy + this.path[0].getY();
    if (this.path[0].isDone()) 
    {
      this.sx = this.x;
      this.sy = this.y;
      this.path.splice(0, 1);
    }
  }

  //make sure it still has health
  if (this.health <= 0) 
  {
    this.explode = true;
    this.removeFromWorld = true;
  }

  //check to see if its off the bottom of the screen
  if (this.offBottom()) 
  {
    console.log("off the bottom");
    this.removeFromWorld = true;
  }

  //update weapon
  this.weapon.update();
}

//(similar to WanderingInvader)
EnemyChange.prototype.draw = function(ctx)
{
  this.drawHealthBar(ctx);
  this.drawSpriteCentered(ctx);
}


