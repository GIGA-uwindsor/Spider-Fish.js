// starts score at zero.
function Score()
{
	this.score = 0;
}

// Used to set the score.
Score.prototype.set = function(value)
{
	this.score = value;
}

// increases the score by value.
Score.prototype.inc = function(value)
{
  this.score += value;
} 
// decreases the score by value.
Score.prototype.dec = function(value)
{
  if (this.score-value > 0)
	{
    this.score -= value;
  }
  else
  {
    this.score = 0;
  }
}
// returns the current value of score.
Score.prototype.getScore = function()
{
  return this.score;
}