function BossSpawn(game, time, point, path, type) 
{
  this.game = game;
  this.time = time;
  this.point = point;
  this.path = flatten(path);
  this.type = type;
}
obj.extend(BossSpawn, Spawn);

Spawn.prototype.isDone = function() 
{
  return this.numToSpawn == this.numSpawned;
}

Spawn.prototype.update = function() 
{
  if (this.elapsedTime > this.time + this.interval*this.numSpawned)
  {
    this.numSpawned++;
    this.game.addEntity(new this.type
	  (
        this.game,
        this.point.x,
        this.point.y,
        obj.copy(this.path, new Array())
      )
    );
  }
}