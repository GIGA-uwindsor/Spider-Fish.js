function Timer() {
  this.gameTime = 0;
  this.maxStep = 0.05;
  this.wallLastTimestamp = 0;
}

Timer.prototype.set = function() {
  this.wallLastTimestamp = Date.now();
}

Timer.prototype.tick = function() {
  var wallCurrent = Date.now();
  var wallDelta = (wallCurrent - this.wallLastTimestamp) / 1000;
  this.wallLastTimestamp = wallCurrent;

  var gameDelta = Math.min(wallDelta, this.maxStep);
  this.gameTime += gameDelta;
  return gameDelta;
}

Timer.prototype.check = function() {
  var wallCurrent = Date.now();
  var wallDelta = (wallCurrent - this.wallLastTimestamp) / 1000;
  return wallDelta;
}
