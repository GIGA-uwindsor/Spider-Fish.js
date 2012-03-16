function EmpBomb(game) 
{
	this.game = game;
	this.charge = CONST.EMP_BOMB_CHARGE;
}

EmpBomb.prototype.update = function(game) 
{
  if (game.keys[CONST.EMP_BOMB_TRIGGER])	//if charging... 
  {
		if (this.charge < CONST.EMP_BOMB_MAX_CHARGE)
		{
			this.charge = this.charge+1;
		}
  }
	else
	{
		if (this.charge > 0)
		{
			this.charge = this.charge-1;
		}
	}
  if (game.keys[CONST.EMP_BOMB_FIRE])			//if unleashing charged bomb...
	{
		if (this.charge == CONST.EMP_BOMB_MAX_CHARGE)
		{
			for (id in game.entities)
			{
				var entity = game.entities[id];
				if (!entity.removeFromWorld)
				{
					if (entity instanceof EnemyBullet)		//only affect bullets
					{
						entity.removeFromWorld = true;
					}
					else if (entity instanceof Enemy)			//only affects enemies
					{
						entity.health -= CONST.EMP_BOMB_DAMAGE;
					}
				}
			}		
			this.charge = 0;
		}
		else if (this.charge > CONST.EMP_BOMB_MAX_CHARGE/2)
		{
			for (id in game.entities)
			{
				var entity = game.entities[id];
				if (!entity.removeFromWorld)
				{
					if (entity instanceof EnemyBullet)		//only affect bullets
					{
						entity.removeFromWorld = true;
					}
				}
			}
			this.charge = 0;
		}
	}
}

EmpBomb.prototype.draw = function(ctx, w, h, x, y)	//(bringing width, height, x and y positions from PlayerShip)
{
	this.w = w;
	this.h = h;
	this.x = x;
	this.y = y;
	if (this.charge > 0)	//only draw if there is any charge
	{
		var width = this.w * (this.charge / CONST.EMP_BOMB_MAX_CHARGE);
		ctx.save();
		ctx.translate(this.x, this.y+(this.w/2));
		if ((this.charge > CONST.EMP_BOMB_MAX_CHARGE/2)&&(this.charge < CONST.EMP_BOMB_MAX_CHARGE))	//if halfway charged...
		{
			ctx.fillStyle = "yellow";
		}
		else if (this.charge == CONST.EMP_BOMB_MAX_CHARGE)	//if fully charged...
		{
			ctx.fillStyle = "white";
		}
		else
		{
			ctx.fillStyle = "orange";		//if only partly charged...
		}	
		ctx.beginPath();
		ctx.rect(-this.w/2, this.h/2 + 4, width, 6);
		ctx.fill();
		ctx.fillStyle = "blue";
		ctx.beginPath();
		ctx.rect(-this.w/2 + width, this.h/2 + 4, this.w - width, 6);
		ctx.fill();
		ctx.restore();
	}
}