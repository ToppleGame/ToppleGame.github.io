init()
function init() {
	login = document.getElementById("Login")
	grid = document.getElementById("grid")
	document.getElementsByClassName("vignette")[0].style.pointerEvents = "none"
	grid.style.marginTop = '210px'
	grid.style.marginLeft = '325px'
	// ToppleWhere()
}


// nR = 1
// nC = 1

// oR = nR
// oC = nC

function keyCheck() {
	ToppleInit()
	
	topWall = [5, 1, 6]
	leftWall = [5, 4, 8]
	downWall = [8, 3, 7]
	rightWall = [6, 2, 7]

	upCheck = !topWall.includes(map[nR][nC])
	leftCheck = !leftWall.includes(map[nR][nC])
	downCheck = !downWall.includes(map[nR][nC])
	rightCheck = !rightWall.includes(map[nR][nC])

	if (window.event.keyCode == 65 && leftCheck) {
		nC -= 1
		move(nR, nC)
		grid.style.marginLeft = mLeft + 50 + "px"
	}
	if (window.event.keyCode == 87 && upCheck) {
		nR -= 1
		move(nR, nC)
		grid.style.marginTop = mTop + 50 + "px"
	}
	if (window.event.keyCode == 68 && rightCheck) {
		nC += 1
		move(nR, nC)
		grid.style.marginLeft = mLeft - 50 + "px"
	}
	if (window.event.keyCode == 83 && downCheck) {
		nR += 1
		move(nR, nC)
		grid.style.marginTop = mTop - 50 + "px"
	}
	
}

function move(nR, nC) {
	grid.rows[oR].cells[oC].innerText = ""
	grid.rows[nR].cells[nC].innerText = "Ello!!!\nTopple"
	console.log(nR, nC);
	oR = nR
	oC = nC
	ToppleInit()
}

function Save() {
	ToppleSaveToDB(UserId, mLeft, mTop, nR, nC)
}