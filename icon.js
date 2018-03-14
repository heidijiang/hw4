let width = $(document).width();
let height = $(document).height();
let w,h,x,y,a,b;

function setup() {
	let canvas = createCanvas(width,height);
	canvas.parent("poop");
	w = width/10;
	h = width/10;
	x = w;
	y = h;
	a = width;
	b = h;

	frameRate(25);
}


function draw() {

	
	makeFire(w,h,x,y)
	x = x + random(0, 6);
	y = y +random(0, 4);


	makeFire(w,h,a,b)
	a = a - random(0,6);
	b = b +random(0, 4);
	// if (y < 0) {
	// y = height;
	// }

}

function makeFire(w,h,x,y) {
	let y2 = y/2;
	noStroke();
	fill(89,48,1);
  	ellipse(x-x/10, y+y2, w, h/3);
  	fill(89,48,1);
  	ellipse(x-x/10, y*.85+y2, w*.8, h/3*.9);
  	fill(89,48,1);
  	ellipse(x-x/10, y*.7+y2, w*.6, h/3*.8);
  	fill(89,48,1);
  	ellipse(x-x/10, y*.55+y2, w*.4, h/3*.6);

  	fill(89,48,1);
  	arc(x-x/10, y*.5+y2, w*.2, h/3*.6,PI, TWO_PI);

  	fill(255);
  	ellipse(x-x/10-y/10,h/2+y2+y2/2,w/20,h/10);
  	fill(255);
  	ellipse(x-x/10+y/10,h/2+y2+y2/2,w/20,h/10);

  	fill(0);
  	arc(x-x/10, y*.5+y2*2, w*.2, h/3*.6,PI, TWO_PI);


}
// function draw() {
// 	ellipse
// }