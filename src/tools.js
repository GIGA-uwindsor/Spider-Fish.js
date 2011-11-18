window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame    ||
  window.oRequestAnimationFrame      ||
  window.msRequestAnimationFrame     ||
  function(callback,element){
    window.setTimeout(callback, 1000 / 60);
  };
})();

obj = {};
obj.extend = function(subClass, baseClass) {
  function inheritance() {}
  inheritance.prototype = baseClass.prototype;
  subClass.prototype = new inheritance();
  subClass.prototype.constructor = subClass;
  subClass.zuper = baseClass.prototype;
}
obj.copy = function(p,c) {
  var c = c||{};
  for (var i in p) {
    if (typeof p[i] === 'object') {
      c[i] = (p[i].constructor === Array)?[]:{};
      obj.copy(p[i],c[i]);
    } 
    else {
      c[i] = p[i];
    }
  }
  return c;
}

function flatten( oArray ) {
  var retVal = [];
  for (var i=0;i<oArray.length;i++) {
    if (!(oArray[i] instanceof Array)) {
      retVal.push( oArray[i] );
    } 
    else {
      var tempFlatt = flatten(oArray[i]);
      for (var j=0;j<tempFlatt.length;j++) {
        retVal.push( tempFlatt[j] );
      }
    }
  }
  return retVal;
}

Math.distance = function(x1,y1,x2,y2)
{
  return Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));
}
