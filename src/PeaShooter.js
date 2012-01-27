/* Simple human weapon that shoots PeaBullets straight up
 *
 * trigger button is the Z key
 *
 * its update method is called by the ship when this
 * weapon is active
 */
function PeaShooter(game,body) 
{
  HumanWeapon.call(this, game, body,
    CONST.PEA_SHOOTER_FIRING_SPEED,
    CONST.PEA_SHOOTER_NAME,
    CONST.PEA_SHOOTER_ID,
    CONST.PEA_SHOOTER_IMAGE
  );
  this.ammo = -1;
}
obj.extend(PeaShooter, HumanWeapon);

PeaShooter.prototype.update = function() 
{
	var isShooting = PeaShooter.zuper.update.call(this);
	return isShooting;
}

PeaShooter.prototype.draw = function() 
{
  ctx.drawImage(
    this.sprite,
    this.body.x - this.sprite.width/2,
    this.body.y - this.sprite.height
  );
  PeaShooter.zuper.draw.call(this);
}

PeaShooter.prototype.fireBullet = function() 
{
  this.game.addEntity(new PeaBullet(this.game, this.body.x, this.body.y, 3 * Math.PI/2));
}

PeaShooter.prototype.fire = function() 
{
  this.fireBullet();
  PeaShooter.zuper.fire.call(this);
}

PeaShooter.prototype.bulletsPerShot = function()
{
	PeaShooter.zuper.bulletsPerShot.call(this);
	return 1;
}

