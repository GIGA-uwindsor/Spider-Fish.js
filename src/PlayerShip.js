/* The main player ship in the game
 * there should only be 1 instance of this class at any time
 */
function PlayerShip(game) {
  Entity.call(this, game,
    game.halfSurfaceWidth/2, 
    game.halfSurfaceHeight/2,
    CONST.PLAYER_SHIP_IMAGE);

  this.xVelo = 0.0;
  this.yVelo = 0.0;
  this.weaponList = [];
  this.weaponList.push(new PeaShooter(this.game,this));
  this.weaponList.push(new DoubleBarrel(this.game,this));
  this.weaponList.push(new TriShooter(this.game,this));
  // the index in weaponList of the active weapon
  this.activeWeapon = 0; 
  this.halo = new BastardCircle(this.game,this);
  this.game.addEntity(this.halo);
  this.health = CONST.PLAYER_SHIP_HEALTH;
  this.ammo_imgs = [
    ASSET_MANAGER.getAsset(CONST.PEA_SHOOTER_AMMO_IMAGE),
    ASSET_MANAGER.getAsset(CONST.DOUBLE_BARREL_AMMO_IMAGE),
    ASSET_MANAGER.getAsset(CONST.TRI_SHOOTER_AMMO_IMAGE)
    ];
}
obj.extend(PlayerShip,Entity);

PlayerShip.prototype.update = function() {
  //update position
  //add the velocity*time to the x,y position
  this.xVelo = 
      (this.game.keys[CONST.PLAYER_SHIP_KEY_LEFT]?1:0)
        *(-CONST.PLAYER_SHIP_SPEED) 
    + (this.game.keys[CONST.PLAYER_SHIP_KEY_RIGHT]?1:0)
      *(CONST.PLAYER_SHIP_SPEED)
  this.yVelo = 
      (this.game.keys[CONST.PLAYER_SHIP_KEY_UP]?1:0)
        *(-CONST.PLAYER_SHIP_SPEED) 
    + (this.game.keys[CONST.PLAYER_SHIP_KEY_DOWN]?1:0)
        *(CONST.PLAYER_SHIP_SPEED)
  this.x += this.xVelo * this.game.clockTick;
  this.y += this.yVelo * this.game.clockTick;

  //make sure the ship is still on the screen
  if (this.x-this.w/2 < 0)
    this.x = this.w/2;
  else if (this.x+this.w/2 > this.game.surfaceWidth)
    this.x = this.game.surfaceWidth-this.w/2;
  if (this.y-this.h/2 < 0)
    this.y = this.h/2;
  else if (this.y+this.h/2 > this.game.surfaceHeight)
    this.y = this.game.surfaceHeight-this.h/2;

  this.checkWeapons();
  //update the current activeWeapon
  this.weaponList[this.activeWeapon].update();
  PlayerShip.zuper.update.call(this);
}

PlayerShip.prototype.collide = function() {
  PlayerShip.zuper.collide.call(this);
}

PlayerShip.prototype.checkWeapons = function() {
  //check to see if the next weapon key was hit
  if (this.game.keysnr[CONST.PLAYER_SHIP_KEY_NEXT_WEAPON]) {
    for (var i = 1; i <= this.weaponList.length; i++) {
      var check = (i+this.activeWeapon)%this.weaponList.length;
      if (this.weaponList[check].ammo != 0) {
        this.weaponList[check].timeSinceLastShot = 0;
        this.activeWeapon = check;
        break;
      }
    }
    this.game.keysnr[CONST.PLAYER_SHIP_KEY_NEXT_WEAPON] = false;
  }
  //check to see if the prev weapon key was hit
  if (this.game.keysnr[CONST.PLAYER_SHIP_KEY_PREV_WEAPON]) {
    for (var i = 1; i <= this.weaponList.length; i++) {
      var check = Math.abs(this.activeWeapon-i)%this.weaponList.length;
      if (this.weaponList[check].ammo != 0) {
        this.weaponList[check].timeSinceLastShot = 0;
        this.activeWeapon = check;
        break;
      }
    }
    this.game.keysnr[CONST.PLAYER_SHIP_KEY_PREV_WEAPON] = false;
  }
  if (this.weaponList[this.activeWeapon].ammo == 0) {
    this.activeWeapon = 0;
    this.weaponList[this.activeWeapon].timeSinceLastShot = 0;
  }
}


PlayerShip.prototype.drawWeapons = function(ctx) {
  var numWeapons = this.weaponList.length;
  ctx.save();
  ctx.font = "bold 20px Arial";
  ctx.textBaseline = "middle";
  ctx.translate(0, this.game.surfaceHeight);
  for (var i = 0; i < numWeapons; i++ ) {
    if (i != this.activeWeapon) {
      ctx.fillStyle="green";
      ctx.strokeStyle="green";
    }
    else {
      ctx.fillStyle="blue";
      ctx.strokeStyle="blue";
    }
    if (this.weaponList[i].ammo == -1) {
      ctx.save();
      ctx.lineWidth = 2;
      ctx.strokeStyle = ctx.fillStlyle;
      ctx.beginPath();
      ctx.arc(40,-22*i-71,4,0,Math.PI*2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(47,-22*i-71,4,0,Math.PI*2);
      ctx.stroke();
      ctx.restore();
    }
    else {
      ctx.fillText(this.weaponList[i].ammo,37,-22*i-71);
    }
    ctx.drawImage(this.ammo_imgs[i],10,-22*i-71-this.ammo_imgs[i].height/2);
  }
  ctx.restore();
}

PlayerShip.prototype.drawHealthBar = function(ctx) {
  var width = this.w * (this.health/CONST.PLAYER_SHIP_HEALTH);
  ctx.save();
  ctx.translate(this.x,this.y);
  ctx.fillStyle = "green";
  ctx.beginPath();
  ctx.rect(-this.w/2,this.h/2+4,width,6);
  ctx.fill();
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.rect(-this.w/2+width,this.h/2+4,this.w-width,6);
  ctx.fill();
  ctx.restore();
}

PlayerShip.prototype.draw = function(ctx) {
  this.drawWeapons(ctx);
  this.drawHealthBar(ctx);
  this.weaponList[this.activeWeapon].draw(ctx);
  this.drawSpriteCentered(ctx);
  PlayerShip.zuper.draw.call(this,ctx);
}

PlayerShip.prototype.addAmmo = function(id,amount){
  this.weaponList[id-1].ammo += amount;
}


PlayerShip.prototype.addHealth = function(amount) {
  this.health += amount;
  if ( this.health > CONST.PLAYER_SHIP_HEALTH ) {
    this.health = CONST.PLAYER_SHIP_HEALTH;
  }
}
