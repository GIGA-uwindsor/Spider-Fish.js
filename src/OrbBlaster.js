/* Simple enemy weapon that shoots a single orbBullet down
 */
function OrbBlaster(game,body) 
{
  EnemyWeapon.call(this, game, body, CONST.ORB_BLASTER_FIRE_SPEED);
}
obj.extend(OrbBlaster, EnemyWeapon);

OrbBlaster.prototype.update = function() 
{
  OrbBlaster.zuper.update.call(this);
}

OrbBlaster.prototype.fire = function() 
{
  var bullet = new OrbBullet(this.game, this.body.x, this.body.y, Math.PI/2);
  this.game.addEntity(bullet);
  OrbBlaster.zuper.fire.call(this);
}


