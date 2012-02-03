function AngryInvader(game, x, y)
{
  // Size of the wave of its path
  var width = 500;
  var height = 800;
  var speed = 8;

  var a = new Bezier(speed,
    [
      {x: x,            y: y},
      {x: x - width/2,  y: y + height/2},
      {x: x + width/2,  y: y + height/2},
      {x: x,            y: y + height}
    ]
  );
  var b = new Bezier(speed,
    [
      {x:0,         y: 0},
      {x: -width/2, y: height/2},
      {x: width/2,  y: height/2},
      {x: 0,        y: height}
    ]
  );
  var c = new Bezier(speed,
    [
      {x:0,         y: 0},
      {x: -width/2, y: height/2},
      {x: width/2,  y: height/2},
      {x: 0,        y: height}
    ]
  );
  var movements = [a, b, c];

  Enemy.call(this, game, x, y, CONST.ANGRY_INVADER_IMAGE, CONST.ANGRY_INVADER_POINTS,
    CONST.ANGRY_INVADER_HEALTH, CONST.ANGRY_INVADER_SPEED, CONST.ANGRY_INVADER_DAMAGE, CONST.ANGRY_INVADER_FIRE_RATE,
    new MovementPattern(this, movements), null
  );
  
  this.xVelo = 0;
  this.yVelo = CONST.ANGRY_INVADER_SPEED;

  //cause the wave to happen
  this.cx = x;      //center of the wave
  this.cy = y;
  this.angle = 0;
  this.amp = Math.random() * 50 + 50;
}
obj.extend(AngryInvader, Enemy);
