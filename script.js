var model = {

	size : 3,

	field : [ [ "", "", "" ], [ "", "", "" ], [ "", "", "" ] ],

	filledCells : 0,

	setCell : function(i, j, sign) {
		this.field[i][j] = sign;
		this.filledCells++;
	},

	isOnMainDiagonal : function(i, j) {
		return i === j;
	},

	isOnSecondaryDiagonal : function(i, j) {
		return i === this.size - 1 - j;
	},

	checkTheMainDiagonal : function(sign) {
		for ( var i = 0; i < this.size; i++) {
			if (this.isNotASign(i, i, sign)) {
				return false;
			}
		}
		return true;
	},

	checkTheSecondaryDiagonal : function(sign) {
		for ( var i = 0; i < this.size; i++) {
			var j = this.size - 1 - i;
			if (this.isNotASign(i, j, sign)) {
				return false;
			}
		}
		return true;
	},

	checkTheRow : function(i, sign) {
		for ( var j = 0; j < this.size; j++) {
			if (this.isNotASign(i, j, sign)) {
				return false;
			}
		}
		return true;
	},

	checkTheColumn : function(j, sign) {
		for ( var i = 0; i < this.size; i++) {
			if (this.isNotASign(i, j, sign)) {
				return false;
			}
		}
		return true;
	},

	isFillAllCells : function() {
		for ( var i = 0; i < this.size; i++) {
			for ( var j = 0; j < this.size; j++) {
				if (this.field[i][j] === "") {
					return false;
				}
			}
		}
		return true;
	},

	isNotASign : function(i, j, sign) {
		return this.field[i][j] === "" || this.field[i][j] !== sign;
	}
};

var view = {

	setX : function(choice) {
		document.getElementById(choice).setAttribute("class", "setX");
	},

	setO : function(choice) {
		document.getElementById(choice).setAttribute("class", "setO");
	},

	setOverLine : function(i, j, imagePath) {
		var img = document.createElement("img");
		img.setAttribute("src", imagePath);
		if (i >= 0) {
			img.setAttribute("style", "position:relative;top:" + (150 * i + 50)
					+ "px;");
		}
		if (j >= 0) {
			img.setAttribute("style", "position:relative;left:"
					+ (150 * j + 50) + "px;");
		}
		document.body.appendChild(img);
	}

};

var controller = {

	isGameOver : false,

	currentSign : "X",

	start : function(choice) {

		if (this.isGameOver) {
			return;
		}

		var i = parseInt(choice.charAt(0), 10);
		var j = parseInt(choice.charAt(1), 10);
		if (model.field[i][j] != "") {
			return;
		}

		this.setSign(choice);
		model.setCell(i, j, this.currentSign);

		if (model.isOnMainDiagonal(i, j)) {
			if (model.checkTheMainDiagonal(this.currentSign)) {
				view.setOverLine(-1, -1, "img/maindiagonal.png");
				this.isGameOver = true;
				return;
			}
		}

		if (model.isOnSecondaryDiagonal(i, j)) {
			if (model.checkTheSecondaryDiagonal(this.currentSign)) {
				view.setOverLine(-1, -1, "img/diaginSec.png");
				this.isGameOver = true;
				return;
			}
		}

		if (model.checkTheRow(i, this.currentSign)) {
			view.setOverLine(i, -1, "img/across.png");
			this.isGameOver = true;
			return;
		}

		if (model.checkTheColumn(j, this.currentSign)) {
			view.setOverLine(-1, j, "img/down.png");
			this.isGameOver = true;
			return;
		}

		if (model.isFillAllCells()) {
			this.isGameOver = true;
		}
		this.currentSign = this.currentSign === "X" ? "O" : "X";
	},

	setSign : function(choice) {
		if (this.currentSign === "X") {
			view.setX(choice);
		} else {
			view.setO(choice);
		}
	}
};

function startOn(event) {
	document.write(event);
	//controller.start(event.target.id);
}
