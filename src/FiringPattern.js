/* Base class for all firing patterns
 *
 * These determine how a particular enemy fires bullets
 * Such as how many, in what direction, with what mechanics (follow player?)
 */
function FiringPattern(enemy)
{
  this.enemy = enemy;
}

FiringPattern.prototype.fire = function()
{
}
