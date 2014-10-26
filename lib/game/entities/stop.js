ig.module(
    'game.entities.stop'
)
.requires(
    'impact.entity'
)
.defines(function(){

    EntityStop = ig.Entity.extend({

        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A,
        peoples: 0,

        init: function( x, y, settings ) {
            this.parent( x, y, settings );
        },

        update: function() {
            this.parent();
            if((Math.random()*100) < 5) this.peoples += 1;
        }

    });

});