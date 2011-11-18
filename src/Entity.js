/* General base class for collideable/drawable objects
 * should not make an instance of this class directly
 */
 
function Entity(game, x, y, imgStr) {
  this.game = game;

  this.x = x;
  this.y = y;
  if (imgStr) {
    this.sprite = ASSET_MANAGER.getAsset(imgStr);
    this.w = this.sprite.width;
    this.h = this.sprite.height;
  }

  this.removeFromWorld = false;
}

Entity.prototype.destroy = function() {
}

Entity.prototype.collide = function() {
}

Entity.prototype.update = function() {
}

Entity.prototype.draw = function(ctx) {
  if (DEBUG) {
    if (this.w != 0 && this.h != 0) {
      ctx.beginPath();
      ctx.strokeStyle = "green";
      ctx.rect(
          this.x-this.w/2, this.y-this.h/2,
          this.w, this.h);
      ctx.stroke();
    }
  }
}

Entity.prototype.drawSpriteCentered = function(ctx) {
  var x = this.x - this.w/2;
  var y = this.y - this.h/2;
  ctx.drawImage(this.sprite, x, y);
}

Entity.prototype.offBottom = function() {
  return this.y - this.h/2 > this.game.surfaceHeight;
}
Entity.prototype.offTop = function() {
  return this.y + this.h/2 < 0;
}
Entity.prototype.offLeft = function() {
  return this.x + this.w/2 < 0;
}
Entity.prototype.offRight = function() {
  return this.x - this.w/2 > this.game.surfaceWidth;
}

Entity.prototype.offScreen = function() {
  return (this.offBottom()||this.offTop()||this.offLeft()||this.offRight());
}
