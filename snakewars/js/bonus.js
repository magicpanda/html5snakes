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

Bonus.prototype.action = function(snake) {
 	switch (this.type) {
        case BONUS_TYPE.FREEZE: {alert("FREEZE");break;}
        case BONUS_TYPE.GROW: {alert("GROW");break;}
        case BONUS_TYPE.SHORTEN:  {alert("SHORTEN");break;}
        case BONUS_TYPE.HIDING:  {alert("HIDING");break;}
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
        	ctx2d.fillRect(this.x, this.y, 8, 8);
}