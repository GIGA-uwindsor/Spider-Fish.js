function BossInvader(game, x, y)
{
  Enemy.call(this, game, x, y, CONST.BOSS_INVADER_IMAGE, CONST.BOSS_INVADER_POINTS,
    CONST.BOSS_INVADER_HEALTH, CONST.BOSS_INVADER_SPEED, CONST.BOSS_INVADER_DAMAGE, CONST.BOSS_INVADER_FIRE_RATE,
    null, null
  );

  this.possiblePatterns = [
    new CurtainShotPattern(this),
    new ClusterShotPattern(this)
  ];

  this.alternateWeaponDelay = 2;  // secs
  this.timeUntilAlternate = 0;
  this.goingRight = true;

  this.nextPattern = 0;
}
obj.extend(BossInvader, Enemy);

BossInvader.prototype.update = function ()
{
  // Changing firing patterns
  if (this.timeUntilAlternate <= 0)
  {
    this.firingPattern = this.possiblePatterns[this.nextPattern];

    this.nextPattern++;
    if (this.nextPattern >= this.possiblePatterns.length)
      this.nextPattern = 0;

    this.timeUntilAlternate = this.alternateWeaponDelay;
  }
  this.timeUntilAlternate -= this.game.clockTick;

  // Moving back and forth
  this.x += (this.goingRight ? 1 : -1) * this.game.clockTick * CONST.BOSS_INVADER_SPEED;

  if (this.x < 50)
    this.goingRight = true;
  else if (this.x > 450)
    this.goingRight = false;

  BossInvader.zuper.update.call(this);
}
