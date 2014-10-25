/*
*
*
*   P1X, Krzysztof Jankowski
*   TRAM, I AM
*
*   abstract: Game for 0h GameJam
*   engine: ImpactJS
*   created: 26.10.2014
*   license: do what you want and dont bother me
*
*   webpage: http://p1x.in
*   twitter: @w84death
*
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

ig.module(
	'game.main'
)
.requires(
	'impact.game',
	'impact.font'
)
.defines(function(){

MyGame = ig.Game.extend({

	count: 0,

	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),


	init: function() {
		ig.input.bind( ig.KEY.X, 'kick');
	},

	update: function() {
		this.parent();
	},

	draw: function() {
		this.parent();

		var x = ig.system.width/2,
			y = ig.system.height/2;

		if( ig.input.pressed('kick')) {
			this.count++;
		}
		this.font.draw( this.count, x, y, ig.Font.ALIGN.CENTER );
	}
});

var w = 320,
	h = 137,
	z = 3,
	fps = 60;

	//ig.Sound.enabled = false;
	ig.main( '#canvas', MyGame, fps, w, h, z);
});
