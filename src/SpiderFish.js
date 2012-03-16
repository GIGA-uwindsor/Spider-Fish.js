function SpiderFish() 
{
  GameEngine.call(this);
	this.LoadLevel = new LoadLevel(this);
	this.startedLevel = false;
}
obj.extend(SpiderFish, GameEngine);

SpiderFish.prototype.init = function(ctx)
{
  SpiderFish.zuper.init.call(this, ctx);

  this.Menu = new MainMenu(this.ctx, this);
	this.StartMenu = new StartMenu(this.ctx, this);
}

SpiderFish.prototype.start = function() 
{
  if (this.LoadLevel.level == null) 
  {
    console.error("there is no level");
    return;
  }
  SpiderFish.zuper.start.call(this);
	this.StartMenu.init();
}

SpiderFish.prototype.update = function() 
{
	if (this.StartMenu.getVisibility())	//if start menu visible, only update it.
	{
		this.startedLevel = false;
		this.StartMenu.update();
	}
	else	//if not visible, load level
	{
		if (!this.startedLevel)
		{
			this.startedLevel = true;
			this.LoadLevel.clear();
			this.LoadLevel.start();
			this.paused = false;
		}
	}
	if (this.Menu.getVisibility())
	{
		this.StartMenu.update();
	}
	if (this.startedLevel)
	{
		this.Menu.update();
	}
	
  if (this.paused == false)
  {
		this.LoadLevel.update();
    SpiderFish.zuper.update.call(this);
  }
  else
  {
    SpiderFish.zuper.paused.call(this);
  }
}

SpiderFish.prototype.preDraw = function()
{
	this.LoadLevel.preDraw();
}

SpiderFish.prototype.postDraw = function()
{
	this.LoadLevel.postDraw();
  if (this.Menu.getVisibility())
  {
    this.Menu.draw();
  }
	if (this.StartMenu.getVisibility())
	{
		this.StartMenu.draw();
	}
}
