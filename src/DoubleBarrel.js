/* human weapon that shoots 2 PeaBullets side by side
 *
 * trigger button is the Z key
 *
 * its update method is called by the ship when this
 * weapon is active
 */
function DoubleBarrel(game,body) 
{
  HumanWeapon.call(this, game, body,
    CONST.DOUBLE_BARREL_FIRING_SPEED,
    CONST.DOUBLE_BARREL_NAME,
    CONST.DOUBLE_BARREL_ID,
    CONST.DOUBLE_BARREL_IMAGE
  );
}
obj.extend(DoubleBarrel, HumanWeapon);

DoubleBarrel.prototype.draw = function() 
{
  ctx.drawImage(
    this.sprite, 
    this.body.x - this.sprite.width/2,
    this.body.y - this.sprite.height
  );
  DoubleBarrel.zuper.draw.call(this);
}

DoubleBarrel.prototype.fireBullet = function(x) 
{
	this.game.addEntity(new PeaBullet(this.game, x, this.body.y, Math.PI/2 * 3));
}

DoubleBarrel.prototype.fire = function() 
{
  this.fireBullet(this.body.x - 8);
  this.fireBullet(this.body.x + 8);
  DoubleBarrel.zuper.fire.call(this);
}

DoubleBarrel.prototype.bulletsPerShot = function()
{
	DoubleBarrel.zuper.bulletsPerShot.call(this);
	return 2;
}
