<<<<<<< HEAD
window.three = function(id,xWid,yWid,res){
	'use strict';
	var world = document.getElementById(id),
		objects = [],
		lights  = [],
		terrain = world.getElementsByClassName('terrian')[0],
		xWidth  = xWid,
		yWidth  = yWid,
		resolution = res; // The resolution of terrain
		
	this.AddObject =  function( domNode , properties ){};
	this.AddLight  =  function( data ){};
	
	this.createMap   =  function ( terrain_type ){
=======
window.three = function(id,xWid,yWid,res,noSun) {
	'use strict';
	var world = document.getElementById(id),
	objects = [],
	lights  = [],
	terrain = world.getElementsByClassName('terrian')[0],
	xWidth  = xWid,
	yWidth  = yWid,
	resolution = res,
	gCam    = {
		rotateX:60,
		rotateY:0,
		rotateZ:0,
		translateX:0,
		translateY:0,
		translateZ:-100
	}; // The resolution of terrain
	
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
>>>>>>> master
		var tPatch =  document.createElement('li');
		tPatch.className += ' tile ';
		tPatch.className += terrain_type;
		tPatch.style.height = tPatch.style.width = resolution + 'px';
<<<<<<< HEAD
		
=======

>>>>>>> master
		var map_z = []
		,tempNode,
		xMax = Math.ceil(xWidth/resolution),
		yMax = Math.ceil(yWidth/resolution);
<<<<<<< HEAD
		for( var i = 0; i < yMax ; i++ ){
			map_z[i] = [];
			for( var j= 0; j < xMax ; j++ ){
				tempNode = tPatch.cloneNode();
				/* okay fixing it only in 1 axis now */
				
				var z = (map_z[0][j]===undefined)?(( Math.random()*10 )- 5): (map_z[0][j]);
				map_z[i][j] = z;
				
				if( map_z[i][j-1] != undefined && map_z[i][j-1] !== z ){
					console.log("Z value:",z," Preceders value:",map_z[i][j-1]);
					var dz = map_z[i][j-1] - z,
						slop = dz/resolution,
						ln = Math.sqrt(dz*dz + resolution*resolution),
						scale = ln/resolution;
						z += dz/2;
						var angle = Math.atan2(dz,resolution);
						console.log( "Delta Z : ",dz,"slope : ",slop,"Assigned Z :",z);
						tempNode.style.webkitTransform = 'scaleX('+scale+') rotateY( '+ angle +'rad)';	
=======
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
>>>>>>> master
				}
				tempNode.style.left = j*resolution+'px';
				tempNode.style.top  = i*resolution+'px';
				tempNode.style.webkitTransform += ' translateZ('+z+'px)';
				terrain.appendChild(tempNode);
			}
<<<<<<< HEAD
		} 
	};
};
=======
		}
	};
	function updateCam(){
		var str = ' translateX(';
			str += gCam.translateX + 'px) translateY(';
			str += gCam.translateY + 'px) translateZ(';
			str += gCam.translateZ + 'px) rotateX(';
			str += gCam.rotateX + 'deg) rotateY(';
			str += gCam.rotateY + 'deg) rotateZ(';
			str += gCam.rotateZ + 'deg)';
			console.log(str);
		terrain.style.webkitTransform = str;
	}
	
	this.gMove = function(dx,dy,dz){
		if(dx)
		gCam.translateX += dx;
		if(dy)
		gCam.translateY += dy;
		if(dz)
		gCam.translateZ += dz;
		updateCam();
	};
};
>>>>>>> master
