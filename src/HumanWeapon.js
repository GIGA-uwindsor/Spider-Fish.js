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
  this.ammo = 0;
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
  var bulletShoot = false;
  this.timeSinceLastShot += this.game.clockTick;

  if (this.game.keys[CONST.HUMAN_WEAPON_TRIGGER])
  {
  
		bulletShoot = true; 
	if (this.timeSinceLastShot > 1.0/this.firingSpeed)
	{
		this.fire();
		this.timeSinceLastShot = 0;
	}
  }
  return bulletShoot;
}

HumanWeapon.prototype.fire = function() 
{
	// Should return the amount of bullets fired.
}

HumanWeapon.prototype.bulletsPerShot = function()
{
}