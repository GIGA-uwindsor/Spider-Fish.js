function HealthItem(game, x, y) {
  Collectable.call(this, game, x, y, CONST.HEALTH_ITEM_IMAGE);
  this.yVelo = CONST.HEALTH_ITEM_SPEED;
}
obj.extend(HealthItem,Collectable);

HealthItem.prototype.collide = function() {
  var result = this.game.aabb.intersects(
      new AabbTree.AxisAlignedBox(
        [this.x-this.w/2,this.y-this.h/2],
        [this.w,this.h]
        ));
  for (id in result) {
    var entity = this.game.entities[id];
    if (!entity.removeFromWorld) {
      if (entity instanceof PlayerShip) {
        entity.addHealth(CONST.HEALTH_ITEM_HEAL);
        this.removeFromWorld = true;
      }
    }
  }
  HealthItem.zuper.collide.call(this);
}

HealthItem.prototype.update = function() {
  this.y += this.yVelo * this.game.clockTick;
  HealthItem.zuper.update.call(this);
}

HealthItem.prototype.draw = function(ctx) {
  this.drawSpriteCentered(ctx);
  HealthItem.zuper.draw.call(this,ctx);
}
