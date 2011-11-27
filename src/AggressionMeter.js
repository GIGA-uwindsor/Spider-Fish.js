//
// Aggression meter.
//
// STANDARD.AGGRO_METER_INIT     meter starts with this many points.
// STANDARD.AGGRO_METER_MIN      minimum value from read()
// STANDARD.AGGRO_METER_MAX      maximum value from read()
// STANDARD.AGGRESSION_SHOT_GAIN points gained per weapon fire.
// STANDARD.AGGRESSION_HIT_GAIN  points gained per hit on enemy.
// STANDARD.AGGRESSION_KILL_GAIN points gained per enemy kill.
// STANDARD.PACIFISM_DELAY       how long the player has to wait between
//                               each time they are rewarded for pacifism.  
// STANDARD.PACIFISM_GAIN        points lost per pacifism period.
//
// * The last shot to hit and kill an enemy adds 8 points,
//   not both 4 points for the hit and 8 points for the kill.
//
// * Points are used to calculate the aggression level, which
//   is what the meter is measuring. The range of the aggression
//   level is from 0 to 100 (both inclusive).
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
  this.points = STANDARD.AGGRO_METER_INIT;
}

AggressionMeter.prototype.recordShot = function() 
{
  this.points += STANDARD.AGGRESSION_SHOT_GAIN;
}

AggressionMeter.prototype.recordHit = function() 
{
  this.points += STANDARD.AGGRESSION_HIT_GAIN;
}

AggressionMeter.prototype.recordKill = function() 
{
  this.points += STANDARD.AGGRESSION_KILL_GAIN;
}

AggressionMeter.prototype.recordPacifism = function() 
{
  this.points -= STANDARD.PACIFISM_GAIN;
}

// returns the current aggression level. see top of file
// for an explanation of how this is calculated.
AggressionMeter.prototype.read = function() 
{
  var min = STANDARD.AGGRO_METER_MIN;
  var max = STANDARD.AGGRO_METER_MAX;
  var reading = Math.round(
    max / (1 + Math.pow(4, -0.01*this.points))
  );
  // scale the reading, which is 0 to 100, to the desired range
  var scalingFactor = max / (max - min);
  return reading * scalingFactor + min;
}
