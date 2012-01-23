function AngryInvader(game, x, y, path) {
 
 WanderingInvader.call(this, game, x, y, path,
    CONST.ANGRY_INVADER_IMAGE,
    CONST.ANGRY_INVADER_HEALTH,
    CONST.ANGRY_INVADER_DAMAGE,
    CONST.ANGRY_INVADER_POINTS
  );
}
obj.extend(AngryInvader, WanderingInvader);