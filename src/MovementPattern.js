/* A class to handle the pattern of motion for a given enemy
 * 
 * Modifies the enemy's position in the update call
 */
function MovementPattern(enemy, movements)
{
  this.enemy = enemy;

  if (movements == null)
    this.movements = [];
  else
    this.movements = movements;

  this.sx = 0;
  this.sy = 0;
}

MovementPattern.prototype.update = function()
{
  //traverse pathway
  if (this.movements.length == 0) 
  {
    console.log("ran out of path");
    this.enemy.removeFromWorld = true;
  }
  else 
  {
    this.movements[0].update(this.enemy.game.clockTick);

    this.enemy.x = this.sx + this.movements[0].getX();
    this.enemy.y = this.sy + this.movements[0].getY();
    if (this.movements[0].isDone()) 
    {
      this.sx = this.enemy.x;
      this.sy = this.enemy.y;
      this.movements.splice(0, 1);
    }
  }
}
