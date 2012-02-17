/* Represents a firing pattern that fires a single PowerUp downwards
 *
 */
function PowerUpBulletPattern(enemy)
{
  FiringPattern.call(this, enemy);
}
obj.extend(PowerUpBulletPattern, FiringPattern);

PowerUpBulletPattern.prototype.fire = function()
{
  var bullet = new TriShooterAmmo(this.enemy.game, this.enemy.x, this.enemy.y, Math.PI/2);
  this.enemy.game.addEntity(bullet);
}