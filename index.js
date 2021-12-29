const displayController = (function () {
	function setup() {
		const body = document.querySelector('body')

		const container = document.createElement('div')
		container.setAttribute('class', 'container')
		body.appendChild(container)

		const canvas = generateCanvas()
		const controls = generateControls()
		container.append(canvas, controls)

		generateGrid()
	}

	function generateCanvas() {
		const canvas = document.createElement('section')
		canvas.classList.add('canvas', 'small')
		return canvas
	}

	function generateGrid() {
		const canvas = document.querySelector('.canvas')
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				const tile = document.createElement('div')
				tile.setAttribute('class', 'tile')
				canvas.appendChild(tile)
			}
		}
	}

	function generateControls() {
		const controls = document.createElement('section')
		controls.setAttribute('class', 'controls')
		controls.appendChild(generateCanvasSizing())
		return controls
	}

	function generateCanvasSizing() {
		const container = document.createElement('article')
		container.setAttribute('class', 'sizing')

		const small = document.createElement('button')
		small.textContent = 'Small'
		const medium = document.createElement('button')
		medium.textContent = 'Medium'
		const large = document.createElement('button')
		large.textContent = 'Large'
		container.append(small, medium, large)

		return container
	}

	return {
		setup,
	}
})()

displayController.setup()
