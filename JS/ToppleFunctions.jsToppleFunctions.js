function ToppleTP() {
	grid.style.marginTop = '-140px'
	grid.style.marginLeft = '-675px'
	nR = 8
	nC = 21
	move(nR, nC)
	ToppleWhere()
}

function ToppleNewUser() {
	email = document.getElementById("email").value;
	username = document.getElementById("username").value;
	password = document.getElementById("password").value;

	firebase.auth().createUserWithEmailAndPassword(email, password)
	.then((userCredential) => {
		// Signed in
		var user = userCredential.user;
		ToppleSaveToDB(user.uid, 325, 210, 1, 1)
		console.log(user);
		console.log(userCredential);
		// ...
	})
	.catch((error) => {
		var errorCode = error.code;
		var errorMessage = error.message;
		console.log(errorCode);
		console.log(errorMessage);
	});
}
function ToppleLogin() {
	email = document.getElementById("email").value;
	username = document.getElementById("username").value;
	password = document.getElementById("password").value;

	firebase.auth().signInWithEmailAndPassword(email, password)
	.then((userCredential) => {
		// Signed in
		var user = userCredential.user;
		ToppleGetData(user.uid)
		console.log(user);
		console.log(userCredential);
		// ...
	})
	.catch((error) => {
		var errorCode = error.code;
		var errorMessage = error.message;
		console.log(errorCode);
		console.log(errorMessage);
	});

	
}
function ToppleOut() {
	firebase.auth().signOut().then(() => {console.log("ToppleOut");}).catch((error) => {console.log(error);});
}

function ToppleInit() {
	mTop = parseInt(grid.style.marginTop)
	mLeft = parseInt(grid.style.marginLeft)
	ToppleWhere()
}

function ToppleWhere() {
	document.getElementById("coordspx").innerText = "Coords in px: " + grid.style.marginTop + ", " + grid.style.marginLeft
	document.getElementById("coordsxy").innerText = "Coords: " + nC + ", " + nR
}

function ToppleInitGame() {
	document.getElementById("Name").innerHTML = "It's-a me, <b>" + pName + "</b>"

	document.getElementsByClassName("vignette")[0].style.pointerEvents = "all"

	login.outerHTML = ""
	for (let i = 0; i < maxRows; i++) {
		grid.insertRow()
		for (let j = 0; j < maxCols*14; j++) {
			grid.rows[i].insertCell()
		}
	}
	grid.rows[nR].cells[nC].innerText = "Ello!!!\nTopple"
	
	for (let i = 1; i < maxRows; i++) {
		for (let j = 0; j < maxCols*14; j++) {
			if ((map[i-1][j] === 9) && (map[i][j] != 9)) {
				map[i][j] = 1
			}
		}
	}
	for (let i = 0; i < maxRows-1; i++) {
		for (let j = 0; j < maxCols*14; j++) {
			if ((map[i][j-1] === 9) && (map[i][j] != 9)) {
				map[i][j] = 4
			}
		}
	}

	for (let i = 0; i < maxRows-1; i++) {
		for (let j = 0; j < maxCols*14; j++) {
			if ((map[i+1][j] === 9) && (map[i][j] != 9)) {
				map[i][j] = 3
			}
		}
	}
	for (let i = 0; i < maxRows-1; i++) {
		for (let j = 0; j < maxCols*14; j++) {
			if ((map[i][j+1] === 9) && (map[i][j] != 9)) {
				map[i][j] = 2
			}
		}
	}
	for (let i = 0; i < maxRows-1; i++) {
		for (let j = 0; j < maxCols*14; j++) {
			if (((map[i][j+1] === 9) && (map[i+1][j] === 9)) && (map[i][j] != 9)) {
				map[i][j] = 7
			} else if (((map[i][j-1] === 9) && (map[i+1][j] === 9)) && (map[i][j] != 9)) {
				map[i][j] = 8
			}
		}
	}
	for (let i = 1; i < maxRows; i++) {
		for (let j = 0; j < maxCols*14; j++) {
			if (((map[i][j+1] === 9) && (map[i-1][j] === 9)) && (map[i][j] != 9)) {
				map[i][j] = 6
			} else if (((map[i][j-1] === 9) && (map[i-1][j] === 9)) && (map[i][j] != 9)) {
				map[i][j] = 5
			}
		}
	}
	Object.keys(map).forEach(coordy => {
		Object.keys(map[coordy]).forEach(coordx => {
			grid.rows[coordy].cells[coordx].setAttribute('id', 'Wid_' + map[coordy][coordx])
		})
	})
}

UserId = ""

function ToppleSaveToDB(uid, mLeft, mTop, nR, nC) {
	firebase.database().ref('users/' + uid).set({
		username: username,
		position : {
			left : mLeft,
			top : mTop,
			x : nC,
			y : nR
		}
	});
}
function ToppleGetData(uid) {
	firebase.database().ref("users/" + uid).on("value", (snapshot) => {
		mLeft = snapshot.val()["position"]["left"];
		mTop = snapshot.val()["position"]["top"];
		nC = snapshot.val()["position"]["x"];
		nR = snapshot.val()["position"]["y"];
		grid.style.marginLeft = mLeft + "px";
		grid.style.marginTop = mTop + "px";
		pName = snapshot.val()["username"];
		UserId = uid;
		oR = nR
		oC = nC
	})
	firebase.database().ref("map/").on("value", (snapshot) => {
		map = snapshot.val();
		maxRows = map["rows"];
		maxCols = map["TilesX"];

		ToppleInitGame();
	})
}
