/* Represents a firing pattern that only fires 1 bullet downward
 *
 */
function CurtainShotPattern(enemy)
{
  FiringPattern.call(this, enemy);
}
obj.extend(CurtainShotPattern, FiringPattern);

CurtainShotPattern.prototype.fire = function()
{
  var bullet1 = new OrbBullet(this.enemy.game, this.enemy.x, this.enemy.y, Math.PI/2);
  var bullet2 = new OrbBullet(this.enemy.game, this.enemy.x, this.enemy.y, Math.PI/2);
  var bullet3 = new OrbBullet(this.enemy.game, this.enemy.x, this.enemy.y, Math.PI/2);
  var bullet4 = new OrbBullet(this.enemy.game, this.enemy.x - 25, this.enemy.y, Math.PI/2);
  var bullet5 = new OrbBullet(this.enemy.game, this.enemy.x - 50, this.enemy.y, Math.PI/2);
  //var bullet6 = new OrbBullet(this.enemy.game, this.enemy.x - 75, this.enemy.y, Math.PI/2);
  var bullet7 = new OrbBullet(this.enemy.game, this.enemy.x + 25, this.enemy.y, Math.PI/2);
  var bullet8 = new OrbBullet(this.enemy.game, this.enemy.x + 50, this.enemy.y, Math.PI/2);
  //var bullet9 = new OrbBullet(this.enemy.game, this.enemy.x + 75, this.enemy.y, Math.PI/2);
  
  this.enemy.game.addEntity(bullet1);
  this.enemy.game.addEntity(bullet2);
  this.enemy.game.addEntity(bullet3);
  this.enemy.game.addEntity(bullet4);
  this.enemy.game.addEntity(bullet5);
  //this.enemy.game.addEntity(bullet6);
  this.enemy.game.addEntity(bullet7);
  this.enemy.game.addEntity(bullet8);
  //this.enemy.game.addEntity(bullet9);
}
