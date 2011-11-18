function WanderingInvader(game, x, y, path) {
  Enemy.call(this, game, x, y, CONST.WANDERING_INVADER_IMAGE, CONST.WANDERING_INVADER_HEALTH);
  this.weapon = new OrbBlaster(this.game,this);
  this.path = path;
  this.sx = x;
  this.sy = y;
}
obj.extend(WanderingInvader,Enemy);

WanderingInvader.prototype.destroy = function() {
  if (this.explode) {
    this.game.addEntity(new Explosion(this.game,this.x,this.y));
  }
}

WanderingInvader.prototype.collide = function() {
  var result = this.game.aabb.intersects(
      new AabbTree.AxisAlignedBox(
        [this.x-this.w/2,this.y-this.h/2],
        [this.w,this.h]
        ));
  for (id in result) {
    var entity = this.game.entities[id];
    if (!entity.removeFromWorld) {
      if (entity instanceof PlayerShip) {
        this.removeFromWorld = true;
        entity.health -= CONST.WANDERING_INVADER_DAMAGE;
        this.game.score += CONST.WANDERING_INVADER_POINTS;
      }
    }
  }
  WanderingInvader.zuper.collide.call(this);
}

WanderingInvader.prototype.update = function() {
  //traverse pathway
  if (this.path.length == 0) {
    console.log("ran out of path");
    this.removeFromWorld = true;
  }
  else {
    this.path[0].update(this.game.clockTick);
    this.x = this.sx + this.path[0].getX();
    this.y = this.sy + this.path[0].getY();
    if (this.path[0].isDone()) {
      this.sx = this.x;
      this.sy = this.y;
      this.path.splice(0,1);
    }
  }

  //make sure it still has health
  if (this.health <= 0) {
    this.explode = true;
    this.removeFromWorld = true;
    this.game.dropCollectable(this.x,this.y);
  }

  //check to see if its off the bottom of the screen
  if (this.offBottom()) {
    console.log("off the bottom");
    this.removeFromWorld = true;
  }

  //update weapon
  this.weapon.update();
  WanderingInvader.zuper.update.call(this);
}

WanderingInvader.prototype.draw = function(ctx) {
  this.drawHealthBar(ctx);
  this.drawSpriteCentered(ctx);
  WanderingInvader.zuper.draw.call(this,ctx);
}

