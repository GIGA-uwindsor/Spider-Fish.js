//
// Aggression meter.
//
// 1) The meter starts with 0 points.
// 2) Every shot fired adds 2 points.
// 3) Every hit on an enemy adds 4 points.
// 4) Every kill on an enemy adds 8 points.
// 5) Every half second not firing removes 4 points.
// 6) The last shot to hit and kill an enemy adds 8 points,
//    not both 4 points for the hit and 8 points for the kill.
// 7) Points are used to calculate the aggression level, which
//    is what the meter is measuring. The range of the aggression
//    level is from 0 to 100 (both inclusive).
//
// The following equation is used to calculate aggression level.
//
//    A = 100/(1 + r^(-k*(p - s))) 
//    Where
//    A: aggression level
//    k: should be < 1, compresses the curve. combined with the value
//       of r, you can adjust how quickly changes in points changes
//       the aggression level.
//    s: positive values make it easier to be pacifistic. (translates
//       curve horizontally).
//    r: must be > 1, and is the curve steepness, or how quickly the
//       level flattens out to 0 or 100.
//    p = number of points.
//

function AggressionMeter() 
{
  this.points = 0;
  this.min = 0;
  this.max = 100;
}

AggressionMeter.prototype.recordShot = function() 
{
  this.points += 2;
}

AggressionMeter.prototype.recordHit = function() 
{
  this.points += 4;
}

AggressionMeter.prototype.recordKill = function() 
{
  this.points += 8;
}

AggressionMeter.prototype.recordPacifism = function() 
{
  this.points -= 4;
}

// returns the current aggression level. see top of file
// for an explanation of how this is calculated.
AggressionMeter.prototype.read = function() 
{
  return Math.round(100.0 / (1 + Math.pow(4, -0.01*this.points)));
}
