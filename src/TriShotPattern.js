/* Represents a firing pattern that only fires 1 bullet downward
 *
 */
function TriShotPattern(enemy)
{
  FiringPattern.call(this, enemy);
}
obj.extend(TriShotPattern, FiringPattern);

TriShotPattern.prototype.fire = function()
{
  var bullet1 = new OrbBullet(this.enemy.game, this.enemy.x, this.enemy.y, Math.PI/2);
  var bullet2 = new OrbBullet(this.enemy.game, this.enemy.x, this.enemy.y, Math.PI/2 + Math.PI/5);
  var bullet3 = new OrbBullet(this.enemy.game, this.enemy.x, this.enemy.y, Math.PI/2 - Math.PI/5);
  this.enemy.game.addEntity(bullet1);
  this.enemy.game.addEntity(bullet2);
  this.enemy.game.addEntity(bullet3);
}
