init()
Inventory = document.getElementById("HotBar")
let ActS
let Slots
makeHotBar()

function init() {
	login = document.getElementById("Login")
	grid = document.getElementById("grid")

	document.getElementById("vignette").style.pointerEvents = "none"

	grid.style.marginTop = '75px'
	grid.style.marginLeft = '75px'

	
}

function getInventory() {
	ActS.innerText = "Fishing Rod"
}

function keyCheck() {
	if (window.event.keyCode === 87) {ToppleMove(0)} // W
	if (window.event.keyCode === 65) {ToppleMove(3)} // A
	if (window.event.keyCode === 83) {ToppleMove(2)} // S
	if (window.event.keyCode === 68) {ToppleMove(1)} // D

	if (window.event.keyCode === 38) {ToppleMove(0)} // ^
	if (window.event.keyCode === 37) {ToppleMove(3)} // <
	if (window.event.keyCode === 40) {ToppleMove(2)} // >
	if (window.event.keyCode === 39) {ToppleMove(1)} // v
}

function checkKey() {
	if (window.event.keyCode === 69) {ToppleFish()}
}

function rep() {
	document.body.innerHTML = document.body.innerHTML.replace(/Topple/gi, "Player");
}

function makeHotBar() {
	Inventory.insertRow()
	for (let i = 0; i < 9; i++) {
		Inventory.rows[0].insertCell()
		Inventory.rows[0].cells[i].setAttribute("onclick", "activeSlot(" + i + ")")
		Inventory.rows[0].cells[i].setAttribute("id", "Slot")
		Inventory.rows[0].cells[i].setAttribute("class", "Slots")
	}
	Inventory.rows[0].cells[0].setAttribute("id", "activeSlot")
	ActS = document.getElementById("activeSlot")
	Slots = document.getElementsByClassName("Slots")
	getInventory()
}

function activeSlot(Sid) {
	document.getElementById("activeSlot").setAttribute("id", "Slot")
	Inventory.rows[0].cells[Sid].setAttribute("id", "activeSlot")
	ActS = document.getElementById("activeSlot")
}

function getSlot() {
	for (let i = 0; i < Inventory.rows.length; i++) {
		for (let j = 0; j < Inventory.rows[i].cells.length; j++) {
			if (Inventory.rows[i].cells[j].innerHTML == "") {return i + j}
		}
	}
}
