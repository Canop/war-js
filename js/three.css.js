/*
 * Three.css.js 
 * (C) - Abhishek Hingnikar
 * This product is freely distrubuted under MIT licence
 * Attribution Required.
 * Three is a library to provide 2d css a little bit 3d touch 
 * for games and stuff.
 */

window.three = function(id,xWid,yWid,res,noSun) {
	'use strict';
	var PI = Math.PI;
	function toDegree(rad){
		return (rad*180)/PI;
	}
	function jstransform(){
		var self = this;
		var rotateX = 0,
			rotateY = 0,
			rotateZ = 0,
			translateX = 0,
			translateY = 0,
			translateZ = 0;
		this.getString = function(){
			var str = ' translateX(';
			str += translateX + 'px) translateY(';
			str += translateY + 'px) translateZ(';
			str += translateZ + 'px) rotateX(';
			str += rotateX + 'deg) rotateY(';
			str += rotateY + 'deg) rotateZ(';
			str += rotateZ + 'deg)';
			return str;
		}
		this.setRot = function(rX,rY,rZ){
			if( rX != undefined && rX != null){
				rotateX = rX;
			}
			if( rY != undefined && rY != null){
				rotateY = rY;	
			}
			if( rZ != undefined && rZ != null){
				rotateZ = rZ;
			}
			return self;
		}
		this.Rotate = function(dRX,dRY,dRZ){
			if( dRX != undefined && dRX != null){
				rotateX += dRX;
			}
			if( dRY != undefined && dRY != null){
				rotateY += dRY;
			}
			if( dRZ != undefined && dRZ != null){
				rotateZ += dRZ;
			}
			return self;
		}
		
		this.move  = function(dx,dy,dz){
			if( dx != undefined && dx != null){
				translateX += dx;	
			}
			if( dy != undefined && dy != null){
				translateY += dy;
			}
			if( dz != undefined && dz != null){
				translateZ += dz;
			}
			return self;
		}
		this.setPos = function(x,y,z){
			if( x != undefined && x != null){
				translateX = x;	
			}
			if( y != undefined && y != null){
				translateY = y;
			}
			if( z != undefined && z != null){
				translateZ = z;
			}
			return self;
		}
	}
	var world = document.getElementById(id),
	objects = [],
	lights  = [],
	terrain = world.getElementsByClassName('terrian')[0],
	xWidth  = xWid,
	yWidth  = yWid,
	// The resolution of terrain
	resolution = res,
	gCam  = new jstransform(); 
	this.create3dObject = function(){
	 	var xPos = 0,
	 		yPos = 0,
	 		transforms = new jstransform(),
	 		domNode = document.createElement('div');
	 		domNode.className += ' object';
	 		world.appendChild(domNode);
	 	// This adds changes	
	 	function render(){
	 		// The x , y are so because to save :hover :P
	 		domNode.style.left = xPos + 'px';
	 		domNode.style.top  = yPos + 'px';
	 		domNode.style.webkitTransform  = transforms.getString();
	 	};
	 	this.Rotate = function(dRX,dRY,dRZ){
	 		transforms.Rotate(dRX,dRY,dRZ);
	 		render();
	 	}
	 	this.move   = function(dx,dy,dz){
	 		if( dx != undefined )
	 		xPos += dx;
			if( dy != undefined )	 	
	 		yPos += dy;
	 		if( dz != undefined )
	 		transforms.move(0,0,dz);
	 		
	 		render();
	 	}	 	
	 	this.setPos = function(x,y,z){
	 		transforms.move(x,y,z);
	 		render();
	 	}
	 	this.setRot = function(rX,rY,rZ){
	 		transforms.setRot(rX,rY,rZ);
	 		render();
	 	}
	 	this.pointToXY = function(x,y){
	 		var dx  = x - xPos,
	 			dy =  y - yPos,
	 			angle = toDegree(Math.atan2(dy,dx));
	 			//console.log("rot:",angle);
	 			transforms.setRot(0,0,angle);
	 			render();
	 	}
	 	render();
	};
	this.AddObject = function( object , properties ) {
		
	};
	// 2d. results
	this.AddLight  = function(x,y,z,color,brightness) {
		lights.push({
			x:x,
			y:y,
			z:z,
			color:color|| {
				r:255,
				g:255,
				b:255
			},
			brightness:brightness||10000,
			getLuminanceAt: function(_x,_y,_z) {
				var dx = _x -x,
				dy = _y -y ,
				dz = _z - z,
				a  =  (this.color.brightness/Math.sqrt( dx*dx + dy*dy + dz*dz ));
				a  = ( a > 1)?1:a; // Normalize
				return {
					r:this.color.r,
					g:this.color.g,
					b:this.color.a,
					a:a // Inverse Square rule at the moment
				};
			},
			getEffectAt: function(_x,_y,_z) {
				// Actually raycasts for calculations.

			}
		});
	};
	if( !noSun ) { // If some satanic devil wants no sun and wants his club lights allover
		this.AddLight(xWid/4,yWid/2,10000,'#fff',100); // The god forsaken sun whose presense shall be felt everywhere
	}

	this.createMap   = function ( terrain_type ) {
		/* finish this */
		terrain.style.width = xWidth;
		terrain.style.height = yWidth;
	};
	function updateCam(){
			terrain.style.webkitTransform = gCam.getString();
	}
	
	this.gMove = function(dx,dy,dz){
	 gCam.move(dx,dy,dz);
	 updateCam();
	};
};