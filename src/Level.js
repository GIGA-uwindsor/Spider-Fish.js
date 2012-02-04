function Level(game, waves)
{
  this.game = game;
  if (waves) 
  {
    this.waves = waves;
    this.waves.sort(
      function(a, b)
      {
        return a.time < b.time;
      }
    );
  }
  else 
  {
    this.waves = [];
  }
}

Level.prototype.isDone = function() 
{
  return this.waves.length == 0;
}

Level.prototype.addSpawn = function(spawn) 
{
  this.waves.push(spawn);
  this.waves.sort(
    function(a, b)
    {
      return a.time < b.time;
    }
  );
}

Level.prototype.update = function() 
{
  var numwaves = this.waves.length;
  for (var i = 0; i < numwaves; i++) 
  {
    this.waves[i].update();
  }

  for (var i = numwaves-1; i >= 0; i--)
  {
    if (this.waves[i].isDone()) 
    {
      this.waves.splice(i, 1);
    }
  }
}
