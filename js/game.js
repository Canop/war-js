<<<<<<< HEAD
(function(){
 'use strict';
 var players = [],
     objects = [],
     map     = [], // Map is an array
     waypoints = [];
})();
=======
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

	var players = [],
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
	function makeAction(name){
		actions[name] = {
			active:false,
			bindedTo:null,
			binded:false
		};
	}
	function handleKeyDown(e) {
		if( keys[ e.keyCode ] != undefined ) {
			actions[keys[e.keyCode ]].active = true;
		}
		return e.overkill();
	};

	function handleKeyUp(e) {
		if( keys[ e.keyCode ] != undefined ) {
			actions[keys[e.keyCode ]].active = false;
		}
		return e.overkill();
	};

	function handleMouseDown(e) {
		if( mouse[e.button] != undefined ) {
			actions[mouse[e.button]].active = true;
		}
		return e.overkill();
	};

	function handleMouseUp(e) {
		if( mouse[e.button] != undefined ) {
			actions[mouse[e.button]].active = false;
		}
	};
	function unBindKey(code){
		keys[code] = undefined;
	}
	function unBindMouse(code){
		mouse[code] = undefined;
	}

	function bindKey(key,action) {
		if( actions[action] == undefined){
			console.log("Action not defined");
			return;
		}
		if( actions[action].binded == true){
			unBindKey(actions[action].boundTo);
		}
		key = (special_keys[key] != undefined)?special_keys[key]: key.toUpperCase().charCodeAt(0);
		actions[action].binded = true;
		actions[action].bindedTo = 	key;
		keys[key] = action;
	};

	function bindMouse(buttonCode,action) {
		if( actions[action] == undefined){
			console.log("Action not defined");
			return;
		}
		if( actions[action].binded == true){
			unBindKey(actions[action].boundTo);
		}
		actions[action].binded = true;
		actions[action].bindedTo = buttonCode;
		mouse[buttonCode] = action;
	};
	["shoot","secondary","walk_forward","walk_backward","strafe_left","strafe_right","activate","reload","primary","sidearm","meelee","crouch","dash",
	"jump","pause"
	].forEach(function(act){
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
	
	function GameLoop(){
		if( actions.shoot.active ){

		}
		if( actions.walk_forward.active ){
			enviro.gMove(0,0,10);
		}
		if( actions.walk_backward.active){
			enviro.gMove(0,0,-10);
		}
		if( actions.strafe_left.active ){
			enviro.gMove(-10,0,0);
		}
		if( actions.strafe_right.active){
			enviro.gMove(10,0,0);
		}
		window.requestAnimationFrame( GameLoop );
	};
	GameLoop();
	document.addEventListener('keydown',handleKeyDown);
	document.addEventListener('keyup',handleKeyUp);
	document.addEventListener('mousedown',handleMouseDown);
	document.addEventListener('mouseup',handleMouseUp);
};
>>>>>>> master
