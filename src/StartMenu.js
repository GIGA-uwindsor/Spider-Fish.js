function StartMenu(ctx, game)
{
	this.game = game;
	this.visible = false;
	this.ctx = ctx
}
obj.extend(StartMenu, MainMenu)

StartMenu.prototype.draw = function()
{
	this.visible = true;
	this.ctx.fillStyle = "red";
	this.ctx.globalAlpha = 1.0;  
	this.ctx.fillRect(0, 0, this.game.surfaceWidth, this.game.surfaceHeight);
	this.ctx.fillStyle = "blue";
	this.ctx.font = "20pt sans-serif";  
	this.ctx.globalAlpha = 1.0;  
	this.ctx.fillText("Press Enter to start the game!", this.game.surfaceWidth/11, this.game.surfaceHeight/2);
	if (this.game.running == false)
	{
		this.startGame();
	}
}

StartMenu.prototype.update = function()
{
	if (this.game.keysnr[STANDARD.STARTMENU_CONTROL_KEY]) 
		{
			if (this.visible)
			{
				this.visible = false;	//hide menu
			}
			else
			{
				this.startGame();		//if accessing menu, restart game (so that previous game starts over)
			}
		}
  this.game.keysnr[STANDARD.STARTMENU_CONTROL_KEY] = false;
}
