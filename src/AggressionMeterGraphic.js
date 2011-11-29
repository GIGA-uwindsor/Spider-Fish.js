/*
	x, and y postions, height length area of the bar, 
	ctx is the canvas context to be drawn too, meter is designed for AggressionMeter(),
	but should work with anything to create a two sided graphic bar that has an interface 
	that returns an number from 0 to 100 when a function .read() is called.
*/
function AggressionMeterGraphic(x, y, height, length, ctx, meter)
{
	this.barSize = 0;
	this.ctx = ctx;
	this.x = x;
	this.y = y;
	this.length = length;
	this.height = height;
	this.center = length/2;
	this.increment = length/98;
	this.monitoredObject = meter;
}

AggressionMeterGraphic.prototype.draw = function()
{ 
	var currentSize = this.monitoredObject.read() - 50;
	var endColour;
	var endPoint;
	
	this.barSize = currentSize * this.increment;
	this.ctx.save();
	this.ctx.translate(this.x, this.y); 
	this.ctx.strokeStyle = "rgb(200, 200, 200)";
	this.ctx.strokeRect(0, 0, this.length, this.height);
	if (this.monitoredObject.read() >= 50)
	{
		endColour = 'red';
		endPoint = this.length;
	}
	else
	{
		endColour = 'blue';
		endPoint = 0;
	}
	var lingrad = ctx.createLinearGradient(this.center, 0, endPoint, 0);
	lingrad.addColorStop(0, 'rgb(100, 100, 100)');
	lingrad.addColorStop(1, endColour);
	this.ctx.fillStyle = lingrad;
	this.ctx.fillRect(this.center, 1, this.barSize, this.height-2);
	this.ctx.restore();
}