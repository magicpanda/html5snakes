var CountdownTimer = function(duration) {
    this.duration = duration;
    this.reset();
}

CountdownTimer.prototype.reset = function() {
    this.startTime = new Date().getTime();
    this.timeLeft = this.duration;
}

CountdownTimer.prototype.update = function() {
    if (this.timeLeft > 0) {
        var now = new Date().getTime();
        var timeElapsed = now - this.startTime;
        this.timeLeft = this.duration - timeElapsed;
        if (this.timeLeft < 0) {
            this.timeLeft = 0;
        }
    }
}

CountdownTimer.prototype.getTimeLeft = function() {
    var minutesLeft = Math.floor(this.timeLeft / 1000 / 60);
    var secondsLeft = Math.round(this.timeLeft / 1000 % 60);
    var millisLeft = this.timeLeft % 60 % 100;
    return (minutesLeft < 10 ? "0" : "") + minutesLeft + ":" +
           (secondsLeft < 10 ? "0" : "") + secondsLeft + ":" + millisLeft;
}