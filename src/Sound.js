function Sound(filePath, isLooping, isAutoPlay)
{
  this.audio = new Audio();

  var that = this;
  this.audio.addEventListener("canplaythrough", function() { that.audioLoaded(); }, true);
  this.audio.addEventListener("ended", function() { that.audioFinished(); }, true);
  this.audio.src = filePath;
  if (isLooping)
    this.audio.loop = "loop";
  this.audio.load();

  this.loaded = false;
  this.finished = false;
  this.isAutoPlay = isAutoPlay;
}

Sound.prototype.audioLoaded = function()
{
  this.loaded = true;
  
  if (this.isAutoPlay)
  {
    this.play();
  }
}

Sound.prototype.play = function()
{
  this.audio.play();
}

Sound.prototype.audioFinished = function()
{
  this.finished = true;
}
