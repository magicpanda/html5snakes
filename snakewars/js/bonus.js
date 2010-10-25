// Bonus's type.
var BONUS_TYPE = {
    FREEZE: 1,
    GROW: 2,
    SHORTEN: 3,
    HIDING: 4
}
function Bonus(type,x,y) {
    this.type = type;
    this.x = x;
    this.y = y;
    return this;
}

Bonus.prototype.action = function(snake1,snake2) {
 	switch (this.type) {
        case BONUS_TYPE.FREEZE: {break;}
        case BONUS_TYPE.GROW: {snake1.grow(1);break;}
        case BONUS_TYPE.SHORTEN:  {snake1.grow(1);snake2.shrink(1);break;}
        case BONUS_TYPE.HIDING:  {snake1.grow(2);break;}
    }
}

Bonus.prototype.draw = function(ctx2d) {
			if(this.type == BONUS_TYPE.FREEZE){
        		ctx2d.fillStyle = "red";
        	}else if(this.type == BONUS_TYPE.GROW){
        	    ctx2d.fillStyle = "blue";
        	}else if(this.type == BONUS_TYPE.SHORTEN){
        	    ctx2d.fillStyle = "green";
        	}else if(this.type == BONUS_TYPE.HIDING){
        	    ctx2d.fillStyle = "yellow";
        	}
        	var x = this.x*10;
        	var y = this.y*10;
        	ctx2d.fillRect(x, y, 8, 8);
}

Bonus.prototype.destory = function(ctx2d) {
			var x = this.x*10;
        	var y = this.y*10;
        	ctx2d.fillRect(x, y, 8, 8);
        	this.x = -100;
        	this.y = -100;
}