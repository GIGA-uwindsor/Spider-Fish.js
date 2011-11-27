/* General Base class for enemy weapons
 * Should not make an instance of this class directly
 */
function EnemyWeapon(game,body,firingSpeed) 
{
  this.game = game;
  this.body = body;
  this.firingSpeed = firingSpeed; // default shots per second
  this.timeSinceLastShot = 0;
}

EnemyWeapon.prototype.update = function() 
{
  this.timeSinceLastShot += this.game.clockTick;
  if (this.timeSinceLastShot > 1.0 / this.firingSpeed) 
  {
    this.fire();
    this.timeSinceLastShot = 0;
  }
}

EnemyWeapon.prototype.fire = function() 
{
  //no base implementation
}


