var CANVAS_WIDTH  = 800;
var CANVAS_HEIGHT = 640;
var GRID_WIDTH = 40;
var MAX_ROUND_TIME = 2*60*1000;// 2 minutes
var RANDOM_X = 10,RANDOM_Y = 5,RNADOM_TYPE = 5;

var GAME_STATE = {
    PLAYING : 0,
    STOPPED : 1
};

var SnakeWarsGame = {
    name: "Snake Wars",
    frameCounter: 0,
    snake1: new Snake([{x: 5, y:7},{x: 5, y:8},{x: 5, y:9},{x: 5, y:10},{x: 5, y:11}]),
    snake2: new Snake([{x:14, y:7},{x:14, y:8},{x:14, y:9},{x:14, y:10},{x:14, y:11}]),
	bonus: new Bonus(RNADOM_TYPE,RANDOM_X,RANDOM_Y),
    timer: new CountdownTimer(MAX_ROUND_TIME), 
    state: GAME_STATE.STOPPED,
    winner: null,

    start: function() {
        this.state = GAME_STATE.PLAYING;
        this.timer.reset();
        this.snake1 = new Snake([{x: 5, y:7},{x: 5, y:8},{x: 5, y:9},{x: 5, y:10},{x: 5, y:11}]);
        this.snake2 = new Snake([{x:14, y:7},{x:14, y:8},{x:14, y:9},{x:14, y:10},{x:14, y:11}]);
    },
    update: function(canvas) {
        this.frameCounter++;
    	var ctx2d = canvas.getContext('2d');
        if (this.state == GAME_STATE.PLAYING) {
            this.timer.update();
            if (this.timer.timeLeft == 0) {
                //alert("time out!");
                this.state = GAME_STATE.STOPPED;
                if (this.snake1.sections.length > this.snake2.sections.length) {
                    this.winner = this.snake1;
                } else if (this.snake2.sections.length > this.snake1.sections.length) {
                    this.winner = this.snake2;
                } else {
                    this.winner = null;
                }
            } else {
                this.snake1.move();
                this.snake2.move();
            	this.snake1.eat(ctx2d,this.bonus,this.snake2);                
                this.snake2.eat(ctx2d,this.bonus,this.snake1);
                if(this.frameCounter % 50 == 0){
                	this.snake1.defreeze();
                	this.snake2.defreeze();
                } 
                if (!this.snake1.bite(this.snake2)) {
                    this.snake2.bite(this.snake1);
                }
            }
        }
    },
    
    draw: function(canvas) {
        var ctx2d = canvas.getContext('2d');
        if (this.state == GAME_STATE.PLAYING) {
            // draw background
            ctx2d.drawImage(document.getElementById("bg"), 0, 0);
            ctx2d.fillText("Playfish", 20, 30);
            //ctx2d.drawImage(document.getElementById("pflogo"), 0, 0);
            // draw snakes
            this.drawSnake(ctx2d, this.snake1, 1);
            this.drawSnake(ctx2d, this.snake2, 2);
            this.drawBonus(ctx2d, this.frameCounter);
            // draw timer
            if (this.state == GAME_STATE.PLAYING) {
                this.drawTimer(ctx2d);
            }
        } else {
            ctx2d.drawImage(document.getElementById("start"), 0, 0);
            if (this.frameCounter % 10 < 5) {
                ctx2d.fillText("Press Enter to Start !", CANVAS_WIDTH - 120, 30);
            }
            if (this.winner == this.snake1) {
                ctx2d.drawImage(document.getElementById("win"), 0, 0);
            } else if (this.winner == this.snake2) {
                ctx2d.drawImage(document.getElementById("win"), 400, 0);
            }
        }
    },
    drawSnake: function(ctx2d, snake, playerId) {
        for (var i = 0; i < snake.sections.length; i++) {
            var x = snake.sections[i].x*GRID_WIDTH;
            var y = snake.sections[i].y*GRID_WIDTH;
            if (i == 0) {
                // draw head
                ctx2d.drawImage(document.getElementById("p" + playerId), x+2, y+5);
            } else {
                // draw body
                ctx2d.drawImage(document.getElementById("c" + playerId + (i%4+1)), x+2, y+5);
            }
        }
    },
    drawTimer: function(ctx2d) {
        ctx2d.fillStyle = "gray";
        ctx2d.fillText(this.timer.getTimeLeft(), CANVAS_WIDTH - 100, 30);
    },
    drawBonus : function(ctx2d, time) {
		if (time % 50 == 0) {
			RANDOM_X = Math.ceil(Math.random() * CANVAS_WIDTH / GRID_WIDTH);
			RANDOM_Y = Math.ceil(Math.random() * CANVAS_HEIGHT / GRID_WIDTH) + 2;
			RNADOM_TYPE = Math.ceil(Math.random() * 1000) % 4 + 1;
		}
        this.bonus = new Bonus(RNADOM_TYPE,RANDOM_X,RANDOM_Y);
        this.bonus.draw(ctx2d);
    },
    keyDown: function(keyCode) {
        //alert("keyDown:" + keyCode);
        switch (keyCode) {
            case 37:this.snake1.changeDirectionOrSpeedUp(DIRECTION.WEST);break; // left arrow
            case 38:this.snake1.changeDirectionOrSpeedUp(DIRECTION.NORTH);break; // up arrow
            case 39:this.snake1.changeDirectionOrSpeedUp(DIRECTION.EAST);break; // right arrow
            case 40:this.snake1.changeDirectionOrSpeedUp(DIRECTION.SOUTH);break; // down arrow
            case 65:this.snake2.changeDirectionOrSpeedUp(DIRECTION.WEST);break; // A
            case 68:this.snake2.changeDirectionOrSpeedUp(DIRECTION.EAST);break; // D
            case 83:this.snake2.changeDirectionOrSpeedUp(DIRECTION.SOUTH);break; // S
            case 87:this.snake2.changeDirectionOrSpeedUp(DIRECTION.NORTH);break; // W
        }
    },
    keyUp: function (keyCode) {
        //alert("keyUp:" + keyCode);
        switch (keyCode) {
            case 13: // Enter
                if (this.state == GAME_STATE.STOPPED) {
                    this.start();
                }
                break;
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