var FPS = 10;

var GameEngine = {
    load: function(game) {
        var canvas = document.getElementById("canvas");
        var paused = false;

        window.setInterval(function() {
            if (!paused) {
                game.update();
                game.draw(canvas);
            }
        }, 1000 / FPS);

        document.addEventListener("keydown", function(e) {
            if (!paused) {
                game.keyDown(e.keyCode)
            }
        }, false);
        document.addEventListener("keyup", function(e) {
            if (e.keyCode == 32) {
                paused = !paused;
            } else {
                game.keyUp(e.keyCode)
            }
        }, false);
    }
};