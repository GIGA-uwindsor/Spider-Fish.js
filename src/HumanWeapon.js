/* General Base class for human weapons
 * should not make an instance of this class directly
 */
function HumanWeapon(game, body, firingSpeed, name, id, imgStr) 
{
  this.game = game;
  this.body = body;
  this.firingSpeed = firingSpeed; // default shots per second
  this.timeSinceLastShot = 0;
  this.name = name;
  this.id = id;
  this.isShooting = false;
  if (imgStr) 
  {
    this.sprite = ASSET_MANAGER.getAsset(imgStr);
  }
}

HumanWeapon.prototype.draw = function() 
{
}

HumanWeapon.prototype.update = function() 
{
  this.isShooting = false;
  this.timeSinceLastShot += this.game.clockTick;

  if (this.game.keys[CONST.HUMAN_WEAPON_TRIGGER])
  {
    this.isShooting = true; 
    if (this.timeSinceLastShot > 1.0/this.firingSpeed)
    {
      this.fire();
      this.timeSinceLastShot = 0;
    }
  }
}

HumanWeapon.prototype.fire = function() 
{
	// Should return the amount of bullets fired.
}

HumanWeapon.prototype.bulletsPerShot = function()
{
}
