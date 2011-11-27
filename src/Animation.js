function Animation(spriteSheet, frameWidth, frameHeight, heightOffset, frameDuration, loop) 
{
  this.spriteSheet = spriteSheet;
  this.frameWidth = frameWidth;
  this.frameDuration = frameDuration;
  this.frameHeight= frameHeight;
  this.heightOffset = heightOffset;
  this.totalTime = (this.spriteSheet.width / this.frameWidth) * this.frameDuration;
  this.elapsedTime = 0;
  this.loop = loop;
}

Animation.prototype.drawFrame = function(tick, ctx, x, y, scaleBy) 
{
  var scaleBy = scaleBy || 1;
  this.elapsedTime += tick;
  if (this.loop) 
  {
    if (this.isDone()) 
    {
      this.elapsedTime = 0;
    }
  }
  else if (this.isDone()) 
  {
    return;
  }

  var index = this.currentFrame();
  var locX = x - (this.frameWidth/2) * scaleBy;
  var locY = y - (this.frameHeight/2) * scaleBy;
  ctx.drawImage(this.spriteSheet,
    index * this.frameWidth, this.heightOffset,  // source from sheet
    this.frameWidth, this.frameHeight,
    locX, locY,
    this.frameWidth * scaleBy, this.frameHeight * scaleBy
  );
}

Animation.prototype.currentFrame = function() 
{
  return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function() 
{
  return (this.elapsedTime >= this.totalTime);
}
