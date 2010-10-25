// Bonus's type.
var BONUS_TYPE = {
    REVERSE: 1,
    GROW: 2,
    SHORTEN: 3,
    HIDING: 4,
    FREEZE: 5
}
function Bonus(type,x,y) {
    this.type = type;
    this.x = x;
    this.y = y;
    return this;
}

Bonus.prototype.action = function(snake1,snake2) {
 	switch (this.type) {
        case BONUS_TYPE.REVERSE: {snake2.reverse();break;}
        case BONUS_TYPE.GROW: {snake1.grow(1);break;}
        case BONUS_TYPE.SHORTEN:  {snake1.grow(1);snake2.shrink(1);break;}
        case BONUS_TYPE.HIDING:  {snake2.shrink(10);break;}
        case BONUS_TYPE.FREEZE:  {snake2.freeze();break;}
    }
}

Bonus.prototype.draw = function(ctx2d) {
        	var x = this.x*GRID_WIDTH;
        	var y = this.y*GRID_WIDTH;
        	ctx2d.drawImage(document.getElementById("c" + (this.type%4+1)), x+2, y+5);
}

Bonus.prototype.destory = function(ctx2d) {
			var x = this.x*GRID_WIDTH;
        	var y = this.y*GRID_WIDTH;
        	RANDOM_X = -10;RANDOM_Y=-10;
}