init()
function init() {
	login = document.getElementById("Login")
	grid = document.getElementById("grid")

	document.getElementsByClassName("vignette")[0].style.pointerEvents = "none"

	grid.style.marginTop = '75px'
	grid.style.marginLeft = '75px'

}

function keyCheck() {
	// ToppleInit()

	if (window.event.keyCode == 65) {
		ToppleMove(4)
	}
	if (window.event.keyCode == 87) {
		ToppleMove(1)
	}
	if (window.event.keyCode == 68) {
		ToppleMove(2)
	}
	if (window.event.keyCode == 83) {
		ToppleMove(3)
	}
	
}

function Save() {
	ToppleSaveToDB(UserId, mLeft, mTop, nR, nC)
}


document.getElementsByClassName("up")[0].addEventListener('touchstart', upfgh())
function upfgh() {
	num = 0
	document.getElementById("name").innerText = num
	num+=1
}
