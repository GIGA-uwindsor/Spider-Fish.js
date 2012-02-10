function Spawn(game, time, numToSpawn, interval, point, path, type) 
{
  this.game = game;
  this.time = time;
  this.numToSpawn = numToSpawn;
  this.numSpawned = 0;
  this.interval = interval;
  this.point = point;
  this.path = flatten(path);
  this.path = flatten(path);
  this.type = type;
  this.elapsedTime = 0;
}

Spawn.prototype.isDone = function() 
{
  return this.numToSpawn == this.numSpawned;
}

Spawn.prototype.update = function() 
{
  this.elapsedTime += this.game.clockTick;
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
