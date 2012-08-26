function rayCast(initx,inity,dir,sample,map){
	sample = sample || 20;
	var xpos = initx,
	ypos = inity,
	dist=0,
	dx=0,
	dy=0,
	blockX = Math.floor(initx/50),
	blockY = Math.floor(inity/50),
	hit = false,
	sin = Math.sin(dir),
	cos = Math.cos(dir),
	slop = sin/cos;

	while( !hit ) {
		if( map[blockY][blockX]) {
			hit = true; // This is a hit from X change
			xpos = (( cos > 0)? (blockX * 50 ) + 50 : blockX*50);
			ypos = inity + ( ( xpos - initx )* slop);
			break;
		}
		ypos += sample*sin;
		blockY = Math.floor(ypos/50);
		if( map[blockY][blockX]) {
			hit = true; // This is a hit from Y change
			ypos = (( sin > 0)? (blockY*50) + 50 : blockY*50); // Leet ?
			xpos = initx + ( ( ypos - inity )/slop );
			break;
		}
		xpos += sample*cos;
		blockX = Math.floor(xpos/50);

	}

	dx = xpos - initx;
	dy = ypos - inity

	return {
		x:xpos,
		y:ypos,
		d:Math.sqrt( dx*dx + dy*dy )
	};
}

