var countDownTime = MAX_ROUND_TIME;
function CountDown(ctx2d, snake1, snake2) {
	ctx2d.font = '15px sans-serif';
	ctx2d.textAlign = 'left';
	ctx2d.textBaseline = 'middle';
	if (countDownTime >= 0) {
		minutes = "0" + Math.floor(countDownTime / 60);
		seconds = Math.floor(countDownTime % 60);
		if (seconds < 10)
			msg = minutes + ":0" + seconds + " ";
		else
			msg = minutes + ":" + seconds + " ";
		ctx2d.fillText(msg, CANVAS_WIDTH - 100, 30);
		if (countDownTime <= 1 * 60) {
			ctx2d.fillText('Notice,time will be out!', CANVAS_WIDTH / 2 - 100,
					CANVAS_HEIGHT / 2);
		}
		--countDownTime;
	} else {
		var winSnake;
		if (snake1.sections.length > snake2.sections.length)
			winSnake = 1;
		else if (snake1.sections.length < snake2.sections.length)
			winSnake = 2;
		else if (snake1.sections.length == snake2.sections.length)
			winSnake = 3;
		if (winSnake != 3)
			ctx2d.fillText('Time is out!Snake ' + winSnake + ' Win!',
					CANVAS_WIDTH / 2 - 100, CANVAS_HEIGHT / 2);
		else
			ctx2d.fillText('Time is out!Draw Game!', CANVAS_WIDTH / 2 - 100,
					CANVAS_HEIGHT / 2);
		ctx2d.clearRect(0, 0, canvas.width, canvas.height);
	}
	return countDownTime;
}
