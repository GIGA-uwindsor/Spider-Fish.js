function GameEngine() 
{
  this.running = true;
	this.paused = false;
  this.entities = [];
  this.aabb = null;
  this.ctx = null;
  this.click = null;
  this.mouse = null;
  this.keys = [];
  this.keysnr = [];
  this.timer = new Timer();
  this.surfaceWidth = null;
  this.surfaceHeight = null;
  this.halfSurfaceWidth = null;
  this.halfSurfaceHeight = null;
}

GameEngine.prototype.init = function(ctx) 
{
  this.ctx = ctx;
  this.surfaceWidth = this.ctx.canvas.width;
  this.surfaceHeight = this.ctx.canvas.height;
  this.halfSurfaceWidth = this.surfaceWidth/2;
  this.halfSurfaceHeight = this.surfaceHeight/2;
	this.Menu = new MainMenu(this.ctx, this);
	this.startInput();
  
  if (DEBUG)
    console.log('game initialized');
}

GameEngine.prototype.start = function() 
{
  if (DEBUG)
    console.log("starting game");
  var that = this;
  (function gameLoop() 
  {
    that.loop();
	if (that.running) 
    {
      requestAnimFrame(gameLoop, that.ctx.canvas);
    }
    else 
    {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      this.ctx.fillStyle = "red";
      this.ctx.font = "bold 5em Arial";
      this.ctx.fillText("Game Over", this.ctx.canvas.width/2, this.ctx.canvas.height/2);
    }
  })();
}

GameEngine.prototype.startInput = function() 
{
  if (DEBUG)
    console.log('Starting input');

  for (var k = 0; k < 256; ++k) 
  {
    this.keys[k] = false;
    this.keysnr[k] = false;
  }

  var getXandY = function(e) 
  {
    var x =  e.clientX - that.ctx.canvas.getBoundingClientRect().left;
    var y = e.clientY - that.ctx.canvas.getBoundingClientRect().top;
    return {x: x, y: y};
  }

  var that = this;

  window.addEventListener("keydown", function(e) 
  {
    if (!that.keys[e.keyCode]) 
    {
      that.keysnr[e.keyCode] = true;
    }
    that.keys[e.keyCode] = true;
  }, false);

  window.addEventListener("keyup", function(e) 
  {
    that.keys[e.keyCode] = false;
    that.keysnr[e.keyCode] = false;
  }, false);

  this.ctx.canvas.addEventListener("click", function(e) 
  {
    that.click = getXandY(e);
  }, false);

  this.ctx.canvas.addEventListener("mousemove", function(e) 
  {
    that.mouse = getXandY(e);
  }, false);

  if (DEBUG)
    console.log('Input started');
}

GameEngine.prototype.clear = function() 
{
  var entitiesCount = this.entities.length;
  for (var i = 0; i < entitiesCount; i++) 
  {
    var entity = this.entities[i];
    entity.removeFromWorld = true;
  }
}

GameEngine.prototype.addEntity = function(entity) 
{
  this.entities.push(entity);
}

GameEngine.prototype.preDraw = function()
{
}

GameEngine.prototype.postDraw = function()
{
}

GameEngine.prototype.draw = function() 
{
  this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

  this.preDraw();
  var entitiesCount = this.entities.length;
  for (var i = 0; i < entitiesCount; i++) 
  {
    this.entities[i].draw(this.ctx);
  }
  this.postDraw();
}

GameEngine.prototype.collide = function() 
{
  var entitiesCount = this.entities.length;
  this.aabb = new AabbTree.AABBTreeNode(
    new AabbTree.AxisAlignedBox( 
      [-this.ctx.canvas.width/2, -this.ctx.canvas.height/2],
      [this.ctx.canvas.width*2, this.ctx.canvas.height*2]
    )
  );

  for (var i = 0; i < entitiesCount; i++) 
  {
    var entity = this.entities[i];
    if (!entity.removeFromWorld) 
    {
      this.aabb.add(i,
        new AabbTree.AxisAlignedBox(
          [entity.x - entity.w/2, entity.y - entity.h/2],
          [entity.w, entity.h]
        )
      );
    }
  }
  for (var i = 0; i < entitiesCount; i++) 
  {
    var entity = this.entities[i];
    if (!entity.removeFromWorld) 
    {
      entity.collide();
    }
  }
}
GameEngine.prototype.getCollisions = function(entity)
{
  var ids = this.aabb.intersects(
    new AabbTree.AxisAlignedBox(
      [entity.x - entity.w/2, entity.y - entity.h/2],
      [entity.w, entity.h]
    )
  );
  var res = [];
  for (var id in ids)
  {
    if (!this.entities[id].removeFromWorld && this.entities[id] != entity)
    {
      res.push(this.entities[id]);
    }
  };
  return res;
};

GameEngine.prototype.update = function() 
{
  var entitiesCount = this.entities.length;
  for (var i = 0; i < entitiesCount; i++) 
  {
    var entity = this.entities[i];

    if (!entity.removeFromWorld) 
    {
      entity.update();
    }
  }

  for (var i = this.entities.length-1; i >= 0; --i) 
  {
    if (this.entities[i].removeFromWorld) 
    {
      this.entities[i].destroy();
      this.entities.splice(i, 1);
    }
  }

  if (this.keys[27]) 
  {
    this.running = false;
  }
}

GameEngine.prototype.paused = function()
{
  var entitiesCount = this.entities.length;
  for (var i = 0; i < entitiesCount; i++) 
  {
    var entity = this.entities[i];
    entity.paused();
  }
}

GameEngine.prototype.loop = function() 
{
  this.clockTick = this.timer.tick();
  this.update();
  this.draw();	
  this.collide();
  this.click = null;
}
