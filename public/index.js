const startButton = document.querySelector('#startButton');
const timer = document.querySelector('#timer');
const pausePlay = document.querySelector('#pause-play');
const stopSave = document.querySelector('#stop-save');
const recordForm = document.querySelector('#recordForm');
const recordList = document.querySelector('.recordList');
const popup = document.querySelector('#popup');
let popupClicked = 0;

popup.addEventListener('click', () => {
	popupClicked = 1;
	popup.style.display = 'none';
});

pausePlay.addEventListener('click', () => {
	if (pausePlay.innerHTML === 'Pause') {
		pausePlay.innerHTML = 'Play';
		pausePlay.style.background = '#166b63';
	} else {
		pausePlay.innerHTML = 'Pause';
		pausePlay.style.background = '#009688';
	}
});

startButton.addEventListener('click', () => {
	let timestamp = new Date();
	let totalSeconds = 1;
	let remainder = 0, hours = 0, minutes = 0, seconds = 0;
	let hoursText, minutesText, secondsText;
	startButton.style.display = 'none';
	recordList.style.display = 'none';
	timer.style.display = 'block';
	// pausePlay.style.display = 'initial';
	stopSave.style.display = 'initial';
	recordForm.style.display = 'block';
	let currentTime, millisecDifference, secondsDiffence;

	setInterval(() => {
		currentTime = new Date();
		millisecDifference = currentTime.getTime() - timestamp.getTime();
		secondsDiffence = Math.floor(millisecDifference / 1000);
		// if (minutes === 1 && popupClicked === 0) {
		// 	popup.style.display = 'block';
		// }
		hours = Math.floor(secondsDiffence / 3600);
		minutes = Math.floor((secondsDiffence - (hours * 3600)) / 60);
		seconds = Math.floor(secondsDiffence - (hours * 3600) - (minutes * 60));
		secondsText = seconds < 10 ? `0${seconds}` : `${seconds}`;
		minutesText = minutes < 10 ? `0${minutes}` : `${minutes}`;
		hoursText = hours < 10 ? `0${hours}` : `${hours}`;
		timer.innerHTML = `${hoursText}:${minutesText}:${secondsText}`;
	}, 1000);
});