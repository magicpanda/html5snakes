var countDownTime = MAX_ROUND_TIME;
function CountDown(ctx2d) {
	if (countDownTime >= 0) {
		minutes = "0" + Math.floor(countDownTime / 60);
		seconds = Math.floor(countDownTime % 60);
		if(seconds<10)
			msg = minutes + ":0" + seconds + " ";
		else
			msg = minutes + ":" + seconds + " ";
		ctx2d.font = '15px sans-serif';
		ctx2d.textAlign = 'left';
		ctx2d.textBaseline = 'middle';
		ctx2d.fillText(msg, CANVAS_WIDTH - 100, 30);
		if (countDownTime <= 1 * 60) {
			ctx2d.fillText('Notice,time will be out!', CANVAS_WIDTH / 2,
					CANVAS_HEIGHT / 2);
		}
		--countDownTime;
	} else {
		ctx2d.font = '15px sans-serif';
		ctx2d.textAlign = 'left';
		ctx2d.textBaseline = 'middle';
		ctx2d.fillText('Time is out!Snake ' + " Win!", CANVAS_WIDTH / 2,
				CANVAS_HEIGHT / 2);
	}
}
