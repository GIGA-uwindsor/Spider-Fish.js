function DoubleBarrelAmmo(game, x, y) {
  Collectable.call(this, game, x, y, CONST.DOUBLE_BARREL_AMMO_IMAGE);
  this.yVelo = CONST.DOUBLE_BARREL_AMMO_SPEED;
}
obj.extend(DoubleBarrelAmmo,Collectable);

DoubleBarrelAmmo.prototype.collide = function() {
  var result = this.game.aabb.intersects(
      new AabbTree.AxisAlignedBox(
        [this.x-this.w/2,this.y-this.h/2],
        [this.w,this.h]
        ));
  for (id in result) {
    var entity = this.game.entities[id];
    if (!entity.removeFromWorld) {
      if (entity instanceof PlayerShip) {
        entity.addAmmo(CONST.DOUBLE_BARREL_AMMO_ID,CONST.DOUBLE_BARREL_AMMO_AMMO);
        this.removeFromWorld = true;
      }
    }
  }
  DoubleBarrelAmmo.zuper.collide.call(this);
}

DoubleBarrelAmmo.prototype.update = function() {
  this.y += this.yVelo * this.game.clockTick;
  DoubleBarrelAmmo.zuper.update.call(this);
}

DoubleBarrelAmmo.prototype.draw = function(ctx) {
  this.drawSpriteCentered(ctx);
  DoubleBarrelAmmo.zuper.draw.call(this,ctx);
}
