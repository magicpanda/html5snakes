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
        case DIRECTION.NORTH: head.y--; break;
        case DIRECTION.SOUTH: head.y++; break;
        case DIRECTION.EAST:  head.x++; break;
        case DIRECTION.WEST:  head.x--; break;
    }
}

// Bite another snake and return true if bite successful.
Snake.prototype.bite = function(snake2) {
    var myHead = this.sections[0];
    for (var i = 0; i < snake2.sections.length; i++) {
        var section = snake2.sections[i];
        if (myHead.x == section.x && myHead.y == section.y) {
            if (i == 0) {
                alert("!");
                // bite snake2's head
                this.reverse();
                snake2.reverse();
                //this.move();
                //snake2.move();
            } else {
                var lost = snake2.sections.length - i;
                snake2.shrink(lost);
                this.grow(lost);
            }
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
