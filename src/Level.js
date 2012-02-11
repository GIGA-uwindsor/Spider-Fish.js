function Level(game, spawns)
{
  this.game = game;
  if (spawns) 
  {
    this.spawns = spawns;
    this.spawns.sort(
      function(a, b)
      {
        return a.time < b.time;
      }
    );
  }
  else 
  {
    this.spawns = [];
  }
}

Level.prototype.isDone = function() 
{
  return this.spawns.length == 0;
}

Level.prototype.addSpawn = function(spawn) 
{
  this.spawns.push(spawn);
  this.spawns.sort(
    function(a, b)
    {
      return a.time < b.time;
    }
  );
}

Level.prototype.update = function() 
{
  var numspawns = this.spawns.length;
  for (var i = 0; i < numspawns; i++) 
  {
    this.spawns[i].update();
  }

  for (var i = numspawns-1; i >= 0; i--)
  {
    if (this.spawns[i].isDone()) 
    {
      this.spawns.splice(i, 1);
    }
  }
}
