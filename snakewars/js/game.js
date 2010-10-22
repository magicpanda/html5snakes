var CANVAS_WIDTH = 800,CANVAS_HEIGHT = 600;
var MAX_ROUND_TIME = 10 * 60;
var RANDOM_X = 100,RANDOM_Y = 100,RNADOM_TYPE = 1;
var SnakeWarsGame = {
    name: "Snake Wars",
    snake1: new Snake([{x:10, y:5},{x:10, y:6},{x:10, y:7},{x:10, y:8},{x:10, y:9}]),
    snake2: new Snake([{x:20, y:5},{x:20, y:6},{x:20, y:7},{x:20, y:8},{x:20, y:9}]),
	bonus: new Bonus(1,10,10),
    update: function() {
        this.snake1.move();
        this.snake2.move();
        if (!this.snake1.bite(this.snake2)) {
            this.snake2.bite(this.snake1);
        }
    },
    
    draw: function(canvas) {
        var ctx2d = canvas.getContext('2d');
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;
        // clear the canvas
        ctx2d.clearRect(0, 0, canvas.width, canvas.height);
	    var time = CountDown(ctx2d,this.snake1,this.snake2);
        // draw snakes
        this.drawSnake(ctx2d, this.snake1);
        this.drawSnake(ctx2d, this.snake2);
        this.drawBonus(ctx2d,time);
    },
    drawSnake: function(ctx2d, snake) {
        for (var i = 0; i < snake.sections.length; i++) {
            ctx2d.fillStyle = (i == 0 ? "black" : "gray");
            var x = snake.sections[i].x*10;
            var y = snake.sections[i].y*10;
            ctx2d.fillRect(x+1, y+1, 8, 8);
        }
    },
    drawBonus: function(ctx2d,time) {
    	if(time%120 == 0){
    		RANDOM_X = Math.ceil(Math.random()*CANVAS_WIDTH);
    		RANDOM_Y = Math.ceil(Math.random()*CANVAS_HEIGHT);
    		RNADOM_TYPE = (Math.random()*1000)%4 + 1;
    	}
    	if(time != MAX_ROUND_TIME){
        	this.bonus = new Bonus(RNADOM_TYPE,RANDOM_X,RANDOM_Y);
        	this.bonus.draw(ctx2d);
    	}
    },
    keyDown: function(keyCode) {
        //alert("keyDown:" + keyCode);
        switch (keyCode) {
            case 37: this.snake1.changeDirectionOrSpeedUp(DIRECTION.WEST);  break; // left arrow
            case 38: this.snake1.changeDirectionOrSpeedUp(DIRECTION.NORTH); break; // up arrow
            case 39: this.snake1.changeDirectionOrSpeedUp(DIRECTION.EAST);  break; // right arrow
            case 40: this.snake1.changeDirectionOrSpeedUp(DIRECTION.SOUTH); break; // down arrow
            case 65: this.snake2.changeDirectionOrSpeedUp(DIRECTION.WEST);  break; // A
            case 68: this.snake2.changeDirectionOrSpeedUp(DIRECTION.EAST);  break; // D
            case 83: this.snake2.changeDirectionOrSpeedUp(DIRECTION.SOUTH); break; // S
            case 87: this.snake2.changeDirectionOrSpeedUp(DIRECTION.NORTH); break; // W
        }
    },
    keyUp: function (keyCode) {
        //alert("keyUp:" + keyCode);
        switch (keyCode) {
            case 37: // left arrow
            case 38: // up arrow
            case 39: // right arrow
            case 40: // down arrow
                this.snake1.slowDown();
                break;
            case 65: // A
            case 68: // D
            case 83: // S
            case 87: // W
                this.snake2.slowDown();
                break;
        }
    }
};