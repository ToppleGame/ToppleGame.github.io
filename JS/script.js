init()
function init() {
	login = document.getElementById("Login")
	grid = document.getElementById("grid")
	document.getElementsByClassName("vignette")[0].style.pointerEvents = "none"
	grid.style.marginTop = '75px'
	grid.style.marginLeft = '75px'

}
function keyCheck() {
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
