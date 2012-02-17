function BossInvader(game, x, y)
{
  Enemy.call(this, game, x, y, CONST.BOSS_INVADER_IMAGE, CONST.BOSS_INVADER_POINTS,
    CONST.BOSS_INVADER_HEALTH, CONST.BOSS_INVADER_SPEED, CONST.BOSS_INVADER_DAMAGE, CONST.BOSS_INVADER_FIRE_RATE,
    null, null
  );

  this.possiblePatterns = [
    new SingleShotPattern(this),
    new SingleShotPattern(this)
  ];

  this.alternateWeaponDelay = 2;  // secs
  this.timeUntilAlternate = 0;

  this.nextPattern = 0;
}
obj.extend(BossInvader, Enemy);

BossInvader.prototype.update = function ()
{
  if (this.timeUntilAlternate <= 0)
  {
    this.firingPattern = this.possiblePatterns[this.nextPattern];

    this.nextPattern++;
    if (this.nextPattern >= this.possiblePatterns.length)
      this.nextPattern = 0;

    this.timeUntilAlternate = this.alternateWeaponDelay;
  }

  this.timeUntilAlternate -= this.game.clockTick;

  BossInvader.zuper.update.call(this);
}
