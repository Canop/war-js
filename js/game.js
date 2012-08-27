// The whole game is in herei
window.onload = function() {
	'use strict';

	Event.prototype.overkill = function() {
		this.stopPropagation();
		this.preventDefault();
		return false;
	}
	// Prepare Environment
	var enviro = new three('war',1200,600,50);
	enviro.createMap('sand');

	var player ={ 
			body:(new enviro.create3dObject()),
			legs:(new enviro.create3dObject())
		},
	objects = [],
	map     = [], // Map is an array
	waypoints = [],
	keys = [],
	mouse=[],
	actions = {
	},
	special_keys = {
		"ESC":27,
		"CTRL":17,
		"SHIFT":16,
		"LEFTARROW":37,
		"UPARROW":38,
		"DOWNARROW":39,
		"RIGHTARROW":40
	};
	// Add legs to body
	player.legs.appendChild(player.body);
	player.body.setPos(25,25);
	function makeAction(name) {
		actions[name] = {
			active:false,
			bindedTo:null,
			binded:false
		};
	}

	function handleKeyDown(e) {
		if( keys[e.keyCode] !== undefined ) {
			actions[keys[e.keyCode]].active = true;
		}
		return e.overkill();
	};

	function handleKeyUp(e) {
		if( keys[e.keyCode] !== undefined ) {
			actions[keys[e.keyCode]].active = false;
		}
		return e.overkill();
	};

	function handleMouseDown(e) {
		if( mouse[e.button] !== undefined ) {
			actions[mouse[e.button]].active = true;
		}
		return e.overkill();
	};

	function handleMouseUp(e) {
		if( mouse[e.button] !== undefined ) {
			actions[mouse[e.button]].active = false;
		}
		return e.overkill();
	};
	function handleMouseMove(e){
		actions.mouseX = e.clientX;
		actions.mouseY = e.clientY;
		return e.overkill();
	}

	function unBindKey(code) {
		keys[code] = undefined;
	}

	function unBindMouse(code) {
		mouse[code] = undefined;
	}

	function bindKey(key,action) {
		if( actions[action] === undefined) {
			console.log("Action not defined");
			return;
		}
		if( actions[action].binded === true) {
			unBindKey(actions[action].boundTo);
		}
		key = (special_keys[key] !== undefined)? special_keys[key]: key.toUpperCase().charCodeAt(0);
		actions[action].binded = true;
		actions[action].bindedTo = 	key;
		keys[key] = action;
	};

	function bindMouse(buttonCode,action) {
		if( actions[action] === undefined) {
			console.log("Action not defined");
			return;
		}
		if( actions[action].binded === true) {
			unBindKey(actions[action].boundTo);
		}
		actions[action].binded = true;
		actions[action].bindedTo = buttonCode;
		mouse[buttonCode] = action;
	};

	["shoot","secondary","walk_forward","walk_backward","strafe_left","strafe_right","activate","reload","primary","sidearm","meelee","crouch","dash",
	"jump","pause"
	].forEach( function(act) {
		makeAction(act);
	});
	console.log(actions);
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
	bindKey(" ","jump");
	bindKey("ESC","pause");

	function GameLoop() {
		if( actions.shoot.active ) {
		}
		if( actions.walk_forward.active ) {
			player.legs.move(0,-10);
		}
		if( actions.walk_backward.active) {
			player.legs.move(0,10);
		}
		if( actions.strafe_left.active ) {
			player.legs.move(-10);
		}
		if( actions.strafe_right.active) {
			player.legs.move(10);
		}
		player.body.pointToXY(actions.mouseX,actions.mouseY);
		
		window.requestAnimationFrame( GameLoop );
	};

	GameLoop();
	document.addEventListener('keydown',handleKeyDown);
	document.addEventListener('keyup',handleKeyUp);
	document.addEventListener('mousedown',handleMouseDown);
	document.addEventListener('mouseup',handleMouseUp);
	document.addEventListener('mousemove',handleMouseMove);
};