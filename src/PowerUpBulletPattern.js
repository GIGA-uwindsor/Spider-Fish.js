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
  var bullet;
  var n = Math.floor(Math.random() * 2);
  switch(n) 
  {
    case 0:
      bullet = new TriShooterAmmo(this.enemy.game, this.enemy.x, this.enemy.y, 150);
      break;

    case 1:
      bullet = new DoubleBarrelAmmo(this.enemy.game, this.enemy.x, this.enemy.y, 150)
      break;
    default:
      console.log("RNG produced unexpected value " + n + " in powerup \ generator");
      break;
  }
  this.enemy.game.addEntity(bullet);
}