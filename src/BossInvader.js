function BossInvader(game, x, y)
{
  Enemy.call(this, game, x, y, CONST.BOSS_INVADER_IMAGE, CONST.BOSS_INVADER_POINTS,
    CONST.BOSS_INVADER_HEALTH, CONST.BOSS_INVADER_SPEED, CONST.BOSS_INVADER_DAMAGE, CONST.BOSS_INVADER_FIRE_RATE,
    null, new SingleShotPattern(this)
  );
}
obj.extend(BossInvader, Enemy);
