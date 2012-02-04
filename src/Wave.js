function Wave(game, numToSpawn, interval, point, path, type)
{
	new Spawn(game, numToSpawn, interval, point, path, type);
}

Wave.prototype.isDone = function() 
{
  return this.spawny.isDone();
}

Wave.prototype.update() = function()
{
	this.spawny.update();
}