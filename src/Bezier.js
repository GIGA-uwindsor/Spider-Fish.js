function Bezier(duration, points) 
{
  Movement.call(this, duration);
  if (points) 
  {
    this.points = points;
  }
  else 
  {
    this.points = [];
  }
}
obj.extend(Bezier, Movement);

Bezier.prototype.B1 = function(t)
{
  return (t * t * t);
}

Bezier.prototype.B2 = function(t)
{
  return (3 * t * t * (1-t));
} 

Bezier.prototype.B3 = function(t)
{
  return (3 * t * (1-t) * (1-t));
}

Bezier.prototype.B4 = function(t)
{
  return ((1-t) * (1-t) * (1-t));
}

Bezier.prototype.getBezier = function(percent, C1, C2, C3, C4) 
{
  return C1*this.B1(percent) + 
    C2*this.B2(percent) + 
    C3*this.B3(percent) + 
    C4*this.B4(percent);
}

Bezier.prototype.getX = function() 
{
  if (this.points.length != 4) 
  {
    console.error("points length != 4");
  }
  return this.getBezier(
    this.timeElapsed / this.duration,
    this.points[3].x,
    this.points[2].x,
    this.points[1].x,
    this.points[0].x
  );
}

Bezier.prototype.getY = function() 
{
  if (this.points.length != 4) 
  {
    console.error("points length != 4");
  }
  return this.getBezier(
    this.timeElapsed / this.duration,
    this.points[3].y,
    this.points[2].y,
    this.points[1].y,
    this.points[0].y
  );
}

Bezier.prototype.update = function(ticks) 
{
  this.timeElapsed += ticks;
  if (this.timeElapsed > this.duration) 
  {
    this.timeElapsed = this.duration;
  }
}

Bezier.prototype.isDone = function() 
{
  return this.timeElapsed >= this.duration;
}
