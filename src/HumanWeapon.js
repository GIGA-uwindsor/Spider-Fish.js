/* General Base class for human weapons
 * should not make an instance of this class directly
 */
function HumanWeapon(game,body,firingSpeed,name,id,imgStr) {
  this.game = game;
  this.body = body;
  this.firingSpeed = firingSpeed; // default shots per second
  this.timeSinceLastShot = 0;
  this.name = name;
  this.id = id;
  this.ammo = 0;
  // keeps track of how long the player has not been firing.
  this.pacifismTimer = new Timer();
  this.pacifismTimer.set();
  if (imgStr) {
    this.sprite = ASSET_MANAGER.getAsset(imgStr);
  }
}

HumanWeapon.prototype.draw = function() {
}

HumanWeapon.prototype.update = function() {
  this.timeSinceLastShot += this.game.clockTick;
  var canFire = this.timeSinceLastShot > 1.0/this.firingSpeed;
  if (this.game.keys[CONST.HUMAN_WEAPON_TRIGGER] && canFire) {
    this.fire();
    this.timeSinceLastShot = 0;
    this.game.aggressionMeter.recordShot();
    // restart the pacifism timer, since the player
    // made a shot.
    this.pacifismTimer.set();
  }
  
  // guns have cooled down and no shot is being made
  if (canFire) {
    // if a half second has passed without shooting,
    // record this on the aggression meter.
    if (this.pacifismTimer.check() >= 0.5) {
      this.game.aggressionMeter.recordPacifism();
      this.pacifismTimer.set(); // restart timer.
    }
  }
}

HumanWeapon.prototype.fire = function() {
  //no base implementation
}


