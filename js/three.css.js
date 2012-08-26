window.three = function(id,xWid,yWid,res,noSun) {
	'use strict';
	var world = document.getElementById(id),
	objects = [],
	lights  = [],
	terrain = world.getElementsByClassName('terrian')[0],
	xWidth  = xWid,
	yWidth  = yWid,
	resolution = res; // The resolution of terrain

	this.AddObject = function( domNode , properties ) {
	};
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
		var tPatch =  document.createElement('li');
		tPatch.className += ' tile ';
		tPatch.className += terrain_type;
		tPatch.style.height = tPatch.style.width = resolution + 'px';

		var map_z = []
		,tempNode,
		xMax = Math.ceil(xWidth/resolution),
		yMax = Math.ceil(yWidth/resolution);
		for( var i = 0; i < yMax ; i++ ) {
			map_z[i] = [];
			for( var j= 0; j < xMax ; j++ ) {
				tempNode = tPatch.cloneNode();
				/* okay fixing it only in 1 axis now */

				var z = (map_z[0][j]===undefined)?(( Math.random()*10 )- 5): (map_z[0][j]);
				map_z[i][j] = z;

				if( map_z[i][j-1] != undefined && map_z[i][j-1] !== z ) {
					var dz = map_z[i][j-1] - z,
					slop = dz/resolution,
					ln = Math.sqrt(dz*dz + resolution*resolution),
					scale = ln/resolution;
					z += dz/2;
					var angle = Math.atan2(dz,resolution);
					tempNode.style.webkitTransform = 'scaleX('+scale+') rotateY( '+ angle +'rad)';
				}
				tempNode.style.left = j*resolution+'px';
				tempNode.style.top  = i*resolution+'px';
				tempNode.style.webkitTransform += ' translateZ('+z+'px)';
				terrain.appendChild(tempNode);
			}
		}
	};
	
	
	this.gMove = function(){};
};