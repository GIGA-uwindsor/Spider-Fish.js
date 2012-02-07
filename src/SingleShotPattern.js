/* Represents a firing pattern that only fires 1 bullet downward
 *
 */
function SingleShotPattern(enemy)
{
  FiringPattern.call(this, enemy);
}
obj.extend(SingleShotPattern, FiringPattern);

SingleShotPattern.prototype.fire = function()
{
  var bullet = new OrbBullet(this.enemy.game, this.enemy.x, this.enemy.y, Math.PI/2);
  this.enemy.game.addEntity(bullet);
}
