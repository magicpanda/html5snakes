// Snake's movement direction.
var DIRECTION = {
    NORTH: 1,
    SOUTH: 4,
     EAST: 2,
     WEST: 3
}

// Snake's movement speed.
var SPEED = {
    NORMAL: 0,
      FAST: 1
}

function Snake(sections) {
    this.skipMove = false;
    this.speed = SPEED.NORMAL;
    this.direction = DIRECTION.NORTH;
    this.newDirection = DIRECTION.NORTH;
    this.sections = sections || [{x:10, y:5},{x:10, y:6},{x:10, y:7},{x:10, y:8},{x:10, y:9}];
}

Snake.prototype.changeDirectionOrSpeedUp = function(dir) {
    if (dir == this.direction) {
        this.speed = SPEED.FAST;
    } else {
        this.newDirection = dir;
    }
}

// Reverse snake's movement direction.
Snake.prototype.reverse = function() {
    this.direction = 5 - this.direction;
    this.sections.reverse();
}

Snake.prototype.slowDown = function() {
    this.speed = SPEED.NORMAL;
}

Snake.prototype.move = function() {
	var coordinate = document.getElementById("coordinate");
	coordinate.value="0";
    // snake at NORMAL movement speed will skip odd frames
    if (this.speed == SPEED.NORMAL) {
        this.skipMove = !this.skipMove;
        if (this.skipMove) {
            return;
        }
    }

    // change direction ?
    if (this.newDirection + this.direction != 5) {
        this.direction = this.newDirection;
    }
    // go ahead
    for (var i = this.sections.length - 1; i > 0 ; i--) {
    	this.sections[i].x = this.sections[i - 1].x;
        this.sections[i].y = this.sections[i - 1].y;
    }
    var head = this.sections[0];
    switch (this.direction) {
        case DIRECTION.NORTH: {head.y--;if(head.y + 0 == 0 + 0){head.y = CANVAS_HEIGHT/10 - 1;} break;}
        case DIRECTION.SOUTH: {head.y++;if(head.y + 0 == CANVAS_HEIGHT/10 + 0){head.y = 1;} break;}
        case DIRECTION.EAST:  {head.x++;if(head.x + 0 == CANVAS_WIDTH/10 + 0){head.x = 1;} break;}
        case DIRECTION.WEST:  {head.x--;if(head.x + 0 == 0 + 0){head.x = CANVAS_WIDTH/10 - 1} break;}
    }
}

// Bite another snake and return true if bite successful.
Snake.prototype.bite = function(snake2) {
    var myHead = this.sections[0];
    var s2Head = snake2.sections[0];

    // reverse snakes' movement direction if their heads collide
    if (// 2 heads have collided
           myHead.x==s2Head.x && myHead.y==s2Head.y
        // 2 heads want to collide and 2 snakes are in reverse vertical movement direction
        || myHead.x==s2Head.x && Math.abs(myHead.y-s2Head.y)==1 && this.direction+snake2.direction==5 && Math.abs(this.direction-snake2.direction)==3
        // 2 heads want to collide and 2 snakes are in reverse horizontal movement direction
        || myHead.y==s2Head.y && Math.abs(myHead.x-s2Head.x)==1 && this.direction+snake2.direction==5 && Math.abs(this.direction-snake2.direction)==1
        ) {

        //alert("!");
        this.reverse();
        snake2.reverse();
        return true;
    }

    for (var i = 0; i < snake2.sections.length; i++) {
        var s2section = snake2.sections[i];
        if (myHead.x == s2section.x && myHead.y == s2section.y) {
            var lost = snake2.sections.length - i;
            snake2.shrink(lost);
            this.grow(lost);
            return true;
        }
    }
    return false;
}

Snake.prototype.grow = function(num) {
    var length = this.sections.length;

    var deltaX = 0;
    var deltaY = 0;
    
    if (length > 1) {
        deltaX = this.sections[length - 1].x - this.sections[length - 2].x;
        deltaY = this.sections[length - 1].y - this.sections[length - 2].y;
    } else {
        switch (this.direction) {
            case DIRECTION.NORTH: deltaY =  1; break;
            case DIRECTION.SOUTH: deltaY = -1; break;
            case DIRECTION.EAST:  deltaX =  1; break;
            case DIRECTION.WEST:  deltaX = -1; break;
        }
    }

    for (var i = 0; i < num; i++) {
        var tail = this.sections[length - 1];
        this.sections[length++] = {x:tail.x + deltaX, y:tail.y + deltaY};
    }
}

Snake.prototype.shrink = function(num) {
    if (this.sections.length > num) {
        this.sections.length -= num;
    }
}
