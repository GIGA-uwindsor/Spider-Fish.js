/* human weapon that shoots 3 PeaBullets 
 *
 * trigger button is the Z key
 *
 * its update method is called by the ship when this
 * weapon is active
 */
function TriShooter(game,body) 
{
  HumanWeapon.call(this, game, body,
    CONST.TRI_SHOOTER_FIRING_SPEED,
    CONST.TRI_SHOOTER_NAME,
    CONST.TRI_SHOOTER_ID,
    CONST.TRI_SHOOTER_IMAGE
  );
}
obj.extend(TriShooter, HumanWeapon);

TriShooter.prototype.draw = function() 
{
  ctx.drawImage(
    this.sprite,
    this.body.x - this.sprite.width/2,
    this.body.y - this.sprite.height
  );
  DoubleBarrel.zuper.draw.call(this);
}

TriShooter.prototype.fireBullet = function(angle) 
{
    this.game.addEntity(new PeaBullet(this.game, this.body.x, this.body.y, angle));
}

TriShooter.prototype.fire = function() 
{
  this.fireBullet(3 * Math.PI/2); // 90
  this.fireBullet(4 * Math.PI/3); // 120
  this.fireBullet(5 * Math.PI/3); // 60
  TriShooter.zuper.fire.call(this);
}

TriShooter.prototype.bulletsPerShot = function()
{
	TriShooter.zuper.bulletsPerShot.call(this);
	return 3;
}
