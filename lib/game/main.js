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
	'impact.font',

	// maps
	'game.levels.p1'
)
.defines(function(){

MyGame = ig.Game.extend({

	font: 		new ig.Font( 'media/04b03.font.png' ),
	tram: {
		sprite: 	new ig.Image( 'media/tram.png' ),
		pos: {
			x: 20,
			y: 16
		},
		engine: 0,
		reverse: false
	},
	STATE: 		'intro',
	timer: 		new ig.Timer(),
	score: 	0,

	init: function() {
		ig.input.bind( ig.KEY.ENTER, 'action' );
		ig.input.bind( ig.KEY.A, 'engine_up' );
		ig.input.bind( ig.KEY.Z, 'engine_down' );
		ig.input.bind( ig.KEY.S, 'brake' );
		ig.input.bind( ig.KEY.X, 'doors' );

		this.loadLevel( LevelP1 );
	},

	update: function() {
		this.parent();

		if(this.STATE == 'intro'){

			if(ig.input.released('action') || ig.input.released('engine_up')){
				this.STATE = 'game';
				return;
			}
		}

		if(this.STATE == 'game'){
			if(ig.input.released('engine_up')){
				this.tram.engine += 1;
			}
			if(ig.input.released('engine_down')){
				this.tram.engine -= 1;
			}

			if(this.tram.engine > 10) this.tram.engine = 10;
			if(this.tram.engine < 0) this.tram.engine = 0;

			if(ig.input.released('brake')){
				this.tram.engine = 0;
			}




			this.screen.x += (this.tram.engine*0.1) * (this.tram.reverse? -1 : 1);


			if(this.screen.x > (76*16)){
				this.tram.reverse = true;
			}
			if(this.screen.x < 0){
				this.tram.reverse = false;
			}


			var stops = this.getEntitiesByType( EntityStop );
			if(this.tram.engine !== 0){
				this.score += 100;
				for (var i = 0; i < stops.length; i++) {
					if(stops[i].pos.x === this.tram.pos.x) this.score += 9999;
				};
			}

		}

	},

	draw: function() {
		this.parent();
		var lx = ig.system.width*0.5,
			ly = (ig.system.height*0.5)+16;

		if(this.STATE == 'intro'){
			this.font.draw( 'Tram, I am!', lx, ly, ig.Font.ALIGN.CENTER );
			this.font.draw( 'by P1X for 0h GameJam 14', lx, ly+8, ig.Font.ALIGN.CENTER );
			if( (this.timer.delta()*3).toFixed(0) % 2 == 0){
				this.font.draw('PRESS ENTER TO START', lx, ly+20, ig.Font.ALIGN.CENTER );
			}
		}
		if(this.STATE == 'game'){
			this.font.draw( 'ENGINE: '+this.tram.engine, 10, 65, ig.Font.ALIGN.LEFT );
			this.font.draw( '[A] up; [Z] down; [S] brake', 10, 73, ig.Font.ALIGN.LEFT );
			this.tram.sprite.draw(this.tram.pos.x, this.tram.pos.y);

			this.font.draw( 'SCORE: '+this.score, ig.system.width - 10, 65, ig.Font.ALIGN.RIGHT );
		}
	}
});

var w = 320,
	h = 96,
	z = 3,
	fps = 60;

	//ig.Sound.enabled = false;
	ig.main( '#canvas', MyGame, fps, w, h, z);
});
