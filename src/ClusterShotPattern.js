/* Represents a firing pattern that only fires 1 bullet downward
 *
 */
function ClusterShotPattern(enemy)
{
  FiringPattern.call(this, enemy);
}
obj.extend(ClusterShotPattern, FiringPattern);

ClusterShotPattern.prototype.fire = function()
{
  var bullet1 = new OrbBullet(this.enemy.game, this.enemy.x, this.enemy.y, Math.PI/2);
  var bullet2 = new OrbBullet(this.enemy.game, this.enemy.x, this.enemy.y, Math.PI/2 + Math.PI/8);
  var bullet3 = new OrbBullet(this.enemy.game, this.enemy.x, this.enemy.y, Math.PI/2 - Math.PI/8);
  this.enemy.game.addEntity(bullet1);
  this.enemy.game.addEntity(bullet2);
  this.enemy.game.addEntity(bullet3);
  
  var bullet4 = new OrbBullet(this.enemy.game, this.enemy.x - 50, this.enemy.y, Math.PI/2);
  var bullet5 = new OrbBullet(this.enemy.game, this.enemy.x - 50, this.enemy.y, Math.PI/2 + Math.PI/8);
  var bullet6 = new OrbBullet(this.enemy.game, this.enemy.x - 50, this.enemy.y, Math.PI/2 - Math.PI/8);
  this.enemy.game.addEntity(bullet4);
  this.enemy.game.addEntity(bullet5);
  this.enemy.game.addEntity(bullet6);
  
  var bullet7 = new OrbBullet(this.enemy.game, this.enemy.x + 50, this.enemy.y, Math.PI/2);
  var bullet8 = new OrbBullet(this.enemy.game, this.enemy.x + 50, this.enemy.y, Math.PI/2 + Math.PI/8);
  var bullet9 = new OrbBullet(this.enemy.game, this.enemy.x + 50, this.enemy.y, Math.PI/2 - Math.PI/8);
  this.enemy.game.addEntity(bullet7);
  this.enemy.game.addEntity(bullet8);
  this.enemy.game.addEntity(bullet9);
}
