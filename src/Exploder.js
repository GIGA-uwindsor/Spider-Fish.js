function Exploder(game, x, y, path)
{
	WanderingInvader.call(this, game, x, y, path,
		CONST.EXPLODER_IMAGE,
		CONST.EXPLODER_HEALTH,
		CONST.EXPLODER_DAMAGE,
		CONST.EXPLODER_POINTS
  );
}
obj.extend(Exploder, WanderingInvader);

Exploder.prototype.destroy = function()
{
	if (this.explode)
	{
		var n = 10;
		var range = Math.PI;
		
		for (i = 1; i <= n; i++)
		{
			this.game.addEntity(
				new OrbBullet(this.game, this.x, this.y, (i/n) * range)
			);
		}
	}
}
