const displayController = (function () {
	const canvas = document.querySelector('.canvas')

	function setup() {
		canvas.classList.add('small')
		generateGrid()
	}

	function generateGrid() {
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				// make a new tile and append to canvas
				const tile = document.createElement('div')
				tile.style.border = '1px solid black'
				canvas.appendChild(tile)
			}
		}
	}

	return {
		setup,
	}
})()

displayController.setup()
