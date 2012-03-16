function PowerInvader(game, x, y)
{
  var a = new Bezier(4,
    [
      {x:500, y:0},
      {x:250, y:0},
      {x:500, y:400},
      {x:250, y:400}
    ]
  );
  var delay = new Pause(1.5, {x:0, y:0});
  var b = new Bezier(6,
    [
      {x:0, y:0},
      {x:-500, y:100},
      {x:500, y:300},
      {x:0, y:400}
    ]
  );
  var movements = [a, delay, b];

  Enemy.call(this, game, x, y, CONST.POWER_INVADER_IMAGE, CONST.POWER_INVADER_POINTS,
    CONST.POWER_INVADER_HEALTH, CONST.POWER_INVADER_SPEED, CONST.POWER_INVADER_DAMAGE, CONST.POWER_INVADER_FIRE_RATE,
    new MovementPattern(this, movements), new PowerUpBulletPattern(this)
  );
  this.explosionRadius = 4;           //sets explosion to affect larger radius
}
obj.extend(PowerInvader, Enemy);
