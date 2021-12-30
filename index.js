function gridFactory() {
	const gridSizing = {
		small: 8,
		medium: 16,
		large: 32,
	}

	let gridSize = gridSizing.small

	function setGridSize(size) {
		gridSize = gridSizing[size]
	}

	function getGridSize() {
		return gridSize
	}

	function getKeyFromSize(size) {
		for (key in gridSizing) {
			if (gridSizing[key] === size) {
				return key
			}
		}
	}

	return {
		setGridSize,
		getGridSize,
		getKeyFromSize,
	}
}

function colorFactory() {
	let mode = 'rainbow'

	function setMode(newMode) {
		mode = newMode
	}

	function getMode() {
		return mode
	}

	function generateColor() {
		switch (mode) {
			case 'rainbow':
				return rainbow()
			case 'grayscale':
				return grayscale()
			case 'erase':
				return clear()
		}
	}

	function rainbow() {
		const values = []
		for (let i = 0; i < 4; i++) {
			if (i === 3) {
				values.push(Math.random() * 2)
			} else {
				values.push(Math.floor(Math.random() * 256))
			}
		}
		return values
	}

	function grayscale() {
		let num = Math.floor(Math.random() * 256)
		while (num < 90 || num > 230) {
			num = Math.floor(Math.random() * 256)
		}
		return [num, num, num, 1]
	}

	function clear() {
		return [255, 255, 255, 0]
	}

	return {
		generateColor,
		setMode,
		getMode,
	}
}

const displayController = (function () {
	const gridController = gridFactory()
	const colorController = colorFactory()

	function setup() {
		const body = document.querySelector('body')

		const container = document.createElement('div')
		container.setAttribute('class', 'container')
		body.appendChild(container)

		const canvas = generateCanvas()
		canvas.classList.add('small')

		const controls = generateControls()
		container.append(canvas, controls)

		generateGrid()
	}

	function generateCanvas() {
		const canvas = document.createElement('section')
		canvas.classList.add('canvas')
		canvas.addEventListener('mouseover', handleTileHover)
		return canvas
	}

	function generateGrid() {
		const canvas = document.querySelector('.canvas')
		let gridSize = gridController.getGridSize()
		for (let i = 0; i < gridSize; i++) {
			for (let j = 0; j < gridSize; j++) {
				const tile = document.createElement('div')
				tile.setAttribute('class', 'tile')
				canvas.appendChild(tile)
			}
		}
	}

	function generateControls() {
		const controls = document.createElement('section')
		controls.setAttribute('class', 'controls')
		const clearButton = document.createElement('button')
		clearButton.textContent = 'Clear'
		clearButton.addEventListener('click', handleClearGrid)
		controls.append(generateCanvasSizing(), generateDrawingModes(), clearButton)
		return controls
	}

	function generateCanvasSizing() {
		const container = document.createElement('article')
		container.setAttribute('class', 'sizing')

		const sizes = ['Small', 'Medium', 'Large']
		sizes.forEach(size => {
			const button = document.createElement('button')
			button.textContent = size
			button.setAttribute('data-size', size.toLowerCase())
			container.appendChild(button)
		})

		container.addEventListener('click', handleSizingClick)

		return container
	}

	function generateDrawingModes() {
		const container = document.createElement('article')
		container.setAttribute('class', 'mode')

		const modes = ['Rainbow', 'Grayscale', 'Erase']
		modes.forEach(mode => {
			const button = document.createElement('button')
			button.textContent = mode
			button.setAttribute('data-mode', mode.toLowerCase())
			container.appendChild(button)
		})

		container.addEventListener('click', handleModeClick)

		return container
	}

	function handleTileHover(e) {
		const target = e.target
		if (!target.classList.contains('tile')) return
		target.style.backgroundColor = `rgba(${colorController.generateColor().join(',')})`
	}

	function handleSizingClick(e) {
		const size = e.target.getAttribute('data-size')
		if (!size) return

		const oldCanvas = document.querySelector('.canvas')
		const classes = oldCanvas.classList
		if (size === classes[1]) {
			// Same as curent size
			return
		}

		gridController.setGridSize(size)
		clearGrid()
	}

	function clearGrid() {
		const mainContainer = document.querySelector('.container')
		mainContainer.removeChild(mainContainer.childNodes[0])

		const canvas = generateCanvas()

		let currGridClass = gridController.getKeyFromSize(gridController.getGridSize())
		canvas.classList.add(currGridClass)

		mainContainer.prepend(canvas)
		generateGrid()
	}

	function handleModeClick(e) {
		const mode = e.target.getAttribute('data-mode')
		if (!mode) return
		if (colorController.getMode() === mode) return
		colorController.setMode(mode)
	}

	function handleClearGrid() {
		clearGrid()
	}

	return {
		setup,
	}
})()

displayController.setup()
