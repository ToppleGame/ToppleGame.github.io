map = {}
ToppleGet()
function ToppleGet() {
	if (grid.rows.length < 9) {
		for (let i = 0; i < 9; i++) {
			grid.insertRow()
			if (grid.rows[i].cells.length < 13) {
				for (let j = 0; j < 13; j++) {
					grid.rows[i].insertCell()
				}
			}
		}
	}
	
	firebase.database().ref("map/").on("value", (snapshot) => {
		map = snapshot.val();
		maxRows = map["rows"];
		maxCols = map["TilesX"];
		
		// document.getElementById("Name").innerHTML = "It's-a me, <b>" + pName + "</b>"
	
		// ToppleGrid()
		ToppleInitGame();
		console.log(grid.rows.length, grid.rows[0].cells.length);
	})
	// ToppleInitGame()
}

function ToppleInitGame() {
	const start = performance.now();

	document.getElementById("coordsxy").innerText = "Coords: " + gridAY[4] + ", " + gridAX[4][6]
	grid.rows[4].cells[6].innerText = "Ello!!!\nTopple"

	ToppleVisualise()
	const end = performance.now();
	console.log(`Execution time: ${end - start} ms`);
}



gridAX = [
	[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
	[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
	[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
	[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
	[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
	[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
	[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
	[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
	[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
]

gridAY = [0, 1, 2, 3, 4, 5, 6, 7, 8]

function ToppleVisualise() {
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 13; j++) {
			Toppley = gridAY[i]
			Topplex = gridAX[i][j]
			grid.rows[i].cells[j].setAttribute('id', 'Wid_' + map[Toppley][Topplex])
		}
	}
}

function ToppleMove(D) {
	upCheck = map[gridAY[3]][gridAX[4][6]] !== 9
	leftCheck = map[gridAY[4]][gridAX[4][5]] !== 9
	downCheck = map[gridAY[5]][gridAX[4][6]] !== 9
	rightCheck = map[gridAY[4]][gridAX[4][7]] !== 9

	for (let i = 0; i < 9; i++) {
		if (D === 2 && rightCheck) {
			for (let j = 0; j < 13; j++) {
				gridAX[i][j] += 1
			}
		}
		if (D === 4 && leftCheck) {
			for (let j = 0; j < 13; j++) {
				gridAX[i][j] -= 1
			}
		}
		if (D === 1 && upCheck) {
			gridAY[i] -= 1
		}
		if (D === 3 && downCheck) {
			gridAY[i] += 1
		}
	}
	ToppleInitGame()
}



function ToppleSwitch() {
	pad = document.getElementById("wirepad").getAttribute("class")
	if (pad == "d-pad") {
		document.getElementsByClassName("d-pad")[0].setAttribute("class", "o-pad")
	} else {
		document.getElementsByClassName("o-pad")[0].setAttribute("class", "d-pad")
	}
}
