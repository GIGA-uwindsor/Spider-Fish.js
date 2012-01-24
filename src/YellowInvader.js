function YellowInvader(game, x, y, path)
{
  WanderingInvader.call(this, game, x, y, path,
    CONST.YELLOW_INVADER_IMAGE,
    CONST.YELLOW_INVADER_HEALTH,
    CONST.YELLOW_INVADER_DAMAGE,
    CONST.YELLOW_INVADER_POINTS
  );
  this.explosionRadius = 4;           //sets explosion to affect larger radius
}
obj.extend(YellowInvader, WanderingInvader);
