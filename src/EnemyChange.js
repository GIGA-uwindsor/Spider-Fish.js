function EnemyChange(game, x, y, path, image, health, damage, points, nextType) 
{
  WanderingInvader.call(this, game, x, y, path,
    image,
    health,
    damage,
    points
  );
  this.nextType = nextType;
}
obj.extend(EnemyChange, WanderingInvader);

EnemyChange.prototype.destroy = function() 
{
  if (this.explode) 
  {
    if (this.nextType != null)
    {
      //used to create next enemy, if next enemy != null
      var newEnt = new this.nextType(this.game, this.sx, this.sy,  this.path);
      newEnt.x = this.x;
      newEnt.y = this.y;
      this.game.addEntity(newEnt);

      this.drop = false;
    }
  }

  EnemyChange.zuper.destroy.call(this);
}
