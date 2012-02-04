function BossInvader(game, x, y){
  Enemy.call(this, game, x, y, CONST.BOSS_INVADER_IMAGE, CONST.BOSS_INVADER_HEALTH);
  this.weapon = new OrbBlaster(this.game, this);
}
obj.extend(BossInvader, Enemy);

BossInvader.prototype.destroy = function() 
{
  this.game.addEntity(new Explosion(this.game, this.x, this.y));
}

BossInvader.prototype.collide = function() 
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
        entity.health -= CONST.BOSS_INVADER_DAMAGE;
        this.game.score += CONST.BOSS_INVADER_POINTS;
      }
    }
  }
  BossInvader.zuper.collide.call(this);
}

BossInvader.prototype.update = function() 
{
  if (this.health <= 0) 
  {
    this.removeFromWorld = true;
  }
  //update weapon
  this.weapon.update();
  BossInvader.zuper.update.call(this);
}

BossInvader.prototype.draw = function(ctx) 
{
  this.drawHealthBar(ctx);
  this.drawSpriteCentered(ctx);
  BossInvader.zuper.draw.call(this, ctx);
}