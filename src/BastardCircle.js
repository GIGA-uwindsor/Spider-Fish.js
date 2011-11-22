/*The circle around the ship
 * there should only be 1 instance of it in the game at a time
 *
 * it collides with human bullets and nothing else
 */
function BastardCircle(game,body) {
  Entity.call(this, game, 0, 0);
  this.body = body;
  this.rad = CONST.BASTERED_CIRCLE_START_RAD;
  this.radMax = CONST.BASTERED_CIRCLE_MAX_RAD;
  this.growthRate = CONST.BASTERED_CIRCLE_GROWTH_RATE; //pixels per second
  this.w = this.rad*2;
  this.h = this.rad*2;
}
obj.extend(BastardCircle,Entity);

BastardCircle.prototype.update = function() {
  this.x = this.body.x;
  this.y = this.body.y;
  this.rad += this.growthRate * this.game.clockTick;
  if (this.rad > this.radMax) {
    this.rad = this.radMax;
  }
  this.w = this.rad*2;
  this.h = this.rad*2;
  BastardCircle.zuper.update.call(this);
}

BastardCircle.prototype.collide = function() {
  var entitiesCount = this.game.entities.length;

  for (var i = 0; i < entitiesCount; i++) {
    var entity = this.game.entities[i];
    if (!entity.removeFromWorld) {
      if (entity instanceof HumanBullet) {
        if ( Math.distance(this.x,this.y,entity.x,entity.y) > this.rad+entity.w )
        {
          entity.removeFromWorld = true;
          this.rad -= CONST.BASTERED_CIRCLE_SHRINK_RATE;
          this.game.addEntity(new AngryMorph(this.game,entity.x,entity.y));
        }
      }
    }
  }
  if (this.rad < 0)
    this.rad = 0;
  BastardCircle.zuper.collide.call(this);
}

BastardCircle.prototype.draw = function(ctx) {
  var INNER_GLOW = CONST.BASTERED_CIRCLE_INNER_GLOW;
  var OUTER_GLOW = CONST.BASTERED_CIRCLE_OUTER_GLOW;
  var grad;
  if(this.rad - INNER_GLOW > 0) {
    grad = ctx.createRadialGradient(
      this.x,this.y,this.rad-INNER_GLOW,
      this.x,this.y,this.rad+OUTER_GLOW);
  }
  else {
      grad = ctx.createRadialGradient(
      this.x,this.y,0,
      this.x,this.y,this.rad+OUTER_GLOW);
  }
      
  var blue = Math.round(this.rad/this.radMax*255);
  var red = 255 - blue;

  grad.addColorStop(0 ,"rgba("+red+",0,"+blue+",0)");
  grad.addColorStop(.5,"rgba("+red+",0,"+blue+",.4)");
  grad.addColorStop(1 ,"rgba("+red+",0,"+blue+",0)");

  ctx.save();
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(this.x,this.y,this.rad+OUTER_GLOW,0,Math.PI*2, false);
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.strokeStyle = "white";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(this.x,this.y,this.rad,0,Math.PI*2, false);
  ctx.stroke();
  ctx.restore();

  BastardCircle.zuper.draw.call(this, ctx);
}

BastardCircle.prototype.radIncrease = function(amount) {
  this.rad += amount;
  if (this.rad > CONST.BASTERED_CIRCLE_MAX_RAD) {
    this.rad = CONST.BASTERED_CIRCLE_MAX_RAD;
  }
}
