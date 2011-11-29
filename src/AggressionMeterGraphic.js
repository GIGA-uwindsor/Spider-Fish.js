/*
	x, and y postions, height length area of the bar, 
	ctx is the canvas context to be drawn too, meter is designed for AggressionMeter(),
	but should work with anything to create a two sided graphic bar that has an interface 
	that returns an number from 0 to 100 when a function .read() is called.
*/
function AggressionMeterGraphic(x, y, height, length, ctx, meter)
{
	this.ctx = ctx;
	this.x = x;
	this.y = y;
	this.length = length;
	this.height = height;
	this.center = length/2;
	this.increment = (length - 2)/100;
	this.monitoredObject = meter;
}

AggressionMeterGraphic.prototype.draw = function()
{ 
	var currentSize = this.monitoredObject.read() - 50;
	var barSize = currentSize * this.increment;

	this.ctx.save();
	this.ctx.translate(this.x, this.y); 

  // Draw a border around the meter
	this.ctx.strokeStyle = "rgb(200, 200, 200)";
	this.ctx.strokeRect(0, 0, this.length, this.height);

  // Create a linear gradient from the center to the edge
	var endColour;
	var endPoint;
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
	var linearGrad = ctx.createLinearGradient(this.center, 0, endPoint, 0);
	linearGrad.addColorStop(0, 'rgb(100, 100, 100)');
	linearGrad.addColorStop(1, endColour);
	this.ctx.fillStyle = linearGrad;
	this.ctx.fillRect(this.center, 1, barSize, this.height-2);

	this.ctx.restore();
}
