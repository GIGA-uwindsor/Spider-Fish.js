function AngryInvader(game, x, y) {
  Enemy.call(this, game, x, y, CONST.ANGRY_INVADER_IMAGE, CONST.ANGRY_INVADER_HEALTH);
  this.weapon = new OrbBlaster(this.game, this);
  
  this.xVelo = 0;
  this.yVelo = CONST.ANGRY_INVADER_SPEED;

  //cause the wave to happen
  this.cx = x;      //center of the wave
  this.cy = y;
  this.angle = 0;
  this.amp = Math.random() * 50 + 50;
}
obj.extend(AngryInvader, Enemy);

AngryInvader.prototype.destroy = function() 
{
  this.game.addEntity(new Explosion(this.game, this.x, this.y));
}

AngryInvader.prototype.collide = function() 
{
  var result = this.game.aabb.intersects(
    new AabbTree.AxisAlignedBox(
      [this.x - this.w/2, this.y - this.h/2],
      [this.w, this.h]
    )
  );

  for (id in result) 
  {
    var entity = this.game.entities[id];
    if (!entity.removeFromWorld) 
    {
      if (entity instanceof PlayerShip) 
      {
        this.removeFromWorld = true;
        entity.health -= CONST.ANGRY_INVADER_DAMAGE;
        this.game.score += CONST.ANGRY_INVADER_POINTS;
      }
    }
  }
  AngryInvader.zuper.collide.call(this);
}

AngryInvader.prototype.update = function() 
{
  this.cx += this.xVelo * this.game.clockTick;
  this.cy += this.yVelo * this.game.clockTick;
  this.angle += 2 * this.game.clockTick;
  this.x = this.cx + this.amp * Math.sin(this.angle);
  this.y = this.cy;
  
  if (this.health <= 0) 
  {
    this.removeFromWorld = true;
  }
  if (this.offBottom()) 
  {
    this.removeFromWorld = true;
  }
  //update weapon
  this.weapon.update();
  AngryInvader.zuper.update.call(this);
}

AngryInvader.prototype.draw = function(ctx) 
{
  this.drawHealthBar(ctx);
  this.drawSpriteCentered(ctx);
  AngryInvader.zuper.draw.call(this, ctx);
}

