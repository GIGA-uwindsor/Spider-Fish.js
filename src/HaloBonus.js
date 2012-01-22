function HaloBonus(game, x, y) {
  Collectable.call(this, game, x, y, CONST.HALO_BONUS_IMAGE);
  this.yVelo = CONST.HALO_BONUS_SPEED;
}
obj.extend(HaloBonus,Collectable);

HaloBonus.prototype.collide = function() {
  var result = this.game.aabb.intersects(
      new AabbTree.AxisAlignedBox(
        [this.x-this.w/2,this.y-this.h/2],
        [this.w,this.h]
        ));
  for (id in result) {
    var entity = this.game.entities[id];
    if (!entity.removeFromWorld) {
      if (entity instanceof PlayerShip) {
        entity.halo.radIncrease(CONST.HALO_BONUS_AMOUNT);
        this.removeFromWorld = true;
      }
    }
  }
  HaloBonus.zuper.collide.call(this);
}

HaloBonus.prototype.update = function() {
  this.y += this.yVelo * this.game.clockTick;
  HaloBonus.zuper.update.call(this);
}

HaloBonus.prototype.draw = function(ctx) {
  this.drawSpriteCentered(ctx);
  HaloBonus.zuper.draw.call(this,ctx);
}
