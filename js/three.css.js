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
		var tPatch =  document.createElement('li');
		tPatch.className += ' tile ';
		tPatch.className += terrain_type;
		tPatch.style.height = tPatch.style.width = resolution + 'px';
		
		var map_z = []
		,tempNode,
		xMax = Math.ceil(xWidth/resolution),
		yMax = Math.ceil(yWidth/resolution);
		for( var i = 0; i < 1 ; i++ ){
			map_z[i] = [];
			for( var j= 0; j < xMax ; j++ ){
				tempNode = tPatch.cloneNode();
				/* okay fixing it only in 1 axis now */
				var z = ( Math.random()*10 )- 5;
				map_z[i][j] = z;
				
				if( map_z[i][j-1] != undefined && map_z[i][j-1] !== z ){
					console.log("Z value:",z," Preceders value:",map_z[i][j-1]);
					var dz = map_z[i][j-1] - z,
						slop = dz/resolution,
						ln = Math.sqrt(dz*dz + resolution*resolution),
						scale = ln/resolution;
						z += dz/2;
						var angle = Math.acos(1/scale);
						console.log( "Delta Z : ",dz,"slope : ",slop,"Assigned Z :",z);
						tempNode.style.webkitTransform = 'scaleX('+scale+') rotateY( '+ angle +'rad)';	
				}
				tempNode.style.left = j*resolution+'px';
				tempNode.style.top  = i*resolution+'px';
				tempNode.style.webkitTransform += ' translateZ('+z+'px)';
				terrain.appendChild(tempNode);
			}
		} 
	};
};
