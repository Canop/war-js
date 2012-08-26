// The whole game is in herei
(function() {
	'use strict';
	Event.prototype.overkill = function() {
		this.stopPropagation();
		this.preventDefault();
		return false;
	}
	var players = [],
	objects = [],
	map     = [], // Map is an array
	waypoints = [],
	keys = [],
	mouse=[],
	special_keys = {
		"ESC":27,
		"CTRL":17,
		"SHIFT":16,
		"LEFTARROW":37,
		"UPARROW":38,
		"DOWNARROW":39,
		"RIGHTARROW":40
	};
	function handleKeyDown(e) {
		if( keys[ e.keyCode ] != undefined ) {
			console.log(keys[e.keyCode].act);
			keys[e.keyCode ].pressed = true;
		}
		return e.overkill();
	};

	function handleKeyUp(e) {
		if( keys[ e.keyCode ] != undefined ) {
			keys[e.keyCode ].pressed = false;
		}
		return e.overkill();
	};

	function handleMouseDown(e) {
		if( mouse[e.button] != undefined ) {
			mouse[e.button].pressed = true;
		}
		return e.overkill();
	};

	function handleMouseUp(e) {
		if( mouse[e.button] != undefined ) {
			mouse[e.button].pressed = false;
		}
	};

	function bindKey(key,action) {
		if( special_keys[key] )
			keys[	special_keys[key] ] = {
				act:action,
				pressed:false
			};
		else if( key.length == 1)
			keys[key.toUpperCase().charCodeAt(0)] = {
				act:action,
				pressed:false
			};
	};

	function bindMouse(buttonCode,action) {
		mouse[buttonCode] = {
			act:action,
			pressed:false
		};
	};

	bindMouse(0,"shoot");
	bindMouse(2,"secondary");
	bindKey('w',"walk_forward");
	bindKey('s',"walk_backward");
	bindKey('a',"strafe_left");
	bindKey('d',"strafe_right");
	bindKey('e',"activate");
	bindKey('r',"reload");
	bindKey('1',"primary");
	bindKey('2',"sidearm");
	bindKey('3',"meelee");
	bindKey('c',"crouch");
	bindKey('SHIFT',"dash");
	bindKey(" ","Jump");
	
	document.addEventListener('keydown',handleKeyDown);
	document.addEventListener('keyup',handleKeyUp);
	document.addEventListener('mousedown',handleMouseDown);
	document.addEventListener('mouseup',handleMouseUp);
})();