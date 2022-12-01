map = {}
facing = 2
facingCA = ["^", ">", "v", "<"]
ToppleGet()
ToppleGridAs()
function ToppleGet() {
	for (let i = grid.rows.length; i < 9; i++) {
		grid.insertRow()
		for (let j = grid.rows[i].cells.length; j < 13; j++) {grid.rows[i].insertCell()}
	}
	firebase.database().ref("map/").on("value", (snapshot) => {
		map = snapshot.val();
		// document.getElementById("Name").innerHTML = "It's-a me, <b>" + pName + "</b>"
		ToppleVisualise(2);
	})
}
function ToppleGridAs() {
	gridAX = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
	gridAY = [0, 1, 2, 3, 4, 5, 6, 7, 8]
}
function ToppleVisualise(Look) {
	facing = Look
	document.getElementById("player").innerHTML = facingCA[Look]
	document.getElementById("coordsxy").innerText = "Coords: " + gridAX[6] + ", " + gridAY[4] // Displays Coords
	grid.rows[4].cells[6].innerText = "Ello!!!\nTopple" // Displays Player
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 13; j++) {grid.rows[i].cells[j].setAttribute('id', 'Wid_' + map[gridAY[i]][gridAX[j]])}
	} // Add Wall IDs
}
function ToppleChecks() {
	CheckList = [map[gridAY[3]][gridAX[6]], // Up
		map[gridAY[4]][gridAX[7]], // Right
		map[gridAY[5]][gridAX[6]], // Down
		map[gridAY[4]][gridAX[5]], map[gridAY[4]][gridAX[6]]
	] // Left
	if (!document.getElementById("CollisionCheck").checked) {CheckList = [true, true, true, true]}
}
function ToppleMove(D) {
	ToppleChecks()
	for (let i = 0; i < 9; i++) {
		if (D === 0 && CheckList[D] !== 9) {gridAY[i] -= 1;} // Up
		if (D === 2 && CheckList[D] !== 9) {gridAY[i] += 1} // Down
	}
	for (let j = 0; j < 13; j++) {
		if (D === 1 && CheckList[D] !== 9) {gridAX[j] += 1} // Right
		if (D === 3 && CheckList[D] !== 9) {gridAX[j] -= 1} // Left
	}
	ToppleVisualise(D)
}
function ToppleTP() {
	ToppleGridAs()
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 13; j++) {gridAX[i][j] += parseInt(document.getElementById("x").value) - 6}
		gridAY[i] += parseInt(document.getElementById("y").value) - 4
	}
	ToppleVisualise(2)
}
function ToppleSwitch() {
	if (document.getElementById("PadSwitch").checked) {document.getElementsByClassName("d-pad")[0].setAttribute("class", "o-pad")}
	else {document.getElementsByClassName("o-pad")[0].setAttribute("class", "d-pad")}
}


var fished = 0


function ToppleRNG(type) {
	if (type === "Fish") {
		if (Math.random() * 100 < 80) {fished += 1}
	}
}

fish = true


function ToppleGive(item) {
	Slots[getSlot()].innerText = item
}


function ToppleFish() {
	ToppleChecks()

	if (fish === true && ActS.innerText === "Fishing Rod") {
		if ((CheckList[facing] === 6) || (map[gridAY[4]][gridAX[6]] === 6)) {
			ToppleRNG("Fish")
			console.log("fishing...", fished);
			fish = false
			Slots[getSlot()].innerText = fished
		}
		setTimeout(() => {
			fish = true
		}, 5000);
	}
}
