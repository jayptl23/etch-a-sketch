import {colorFactory} from './color-factory'
import {gridFactory} from './grid-factory'

export const displayController = (function () {
	const gridController = gridFactory()
	const colorController = colorFactory()

	let activeSize
	let activeMode

	function setup() {
		const body = document.querySelector('body')

		const container = document.createElement('div')
		container.setAttribute('class', 'container')
		body.appendChild(container)

		const canvas = generateCanvas()
		canvas.classList.add('small')

		const controls = generateControls()
		container.append(canvas, controls)

		activeSize.classList.add('active')
		activeMode.classList.add('active')

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
		clearButton.classList.add('clear')
		controls.append(generateCanvasSizing(), generateDrawingModes(), clearButton)
		return controls
	}

	function generateCanvasSizing() {
		const container = document.createElement('article')
		container.setAttribute('class', 'sizing')

		const label = document.createElement('p')
		label.textContent = 'Grid Size'

		container.appendChild(label)

		const sizes = ['Small', 'Medium', 'Large']
		sizes.forEach(size => {
			const button = document.createElement('button')
			button.textContent = size
			button.setAttribute('data-size', size.toLowerCase())
			if (size === 'Small') {
				activeSize = button
			}
			container.appendChild(button)
		})

		container.addEventListener('click', handleSizingClick)

		return container
	}

	function generateDrawingModes() {
		const container = document.createElement('article')
		container.setAttribute('class', 'mode')

		const label = document.createElement('p')
		label.textContent = 'Mode'

		container.appendChild(label)

		const modes = ['Rainbow', 'Grayscale', 'Erase']
		modes.forEach(mode => {
			const button = document.createElement('button')
			button.textContent = mode
			button.setAttribute('data-mode', mode.toLowerCase())
			if (mode === 'Rainbow') {
				activeMode = button
			}
			container.appendChild(button)
		})

		container.addEventListener('click', handleModeClick)

		return container
	}

	function handleTileHover(e) {
		const target = e.target
		if (!target.classList.contains('tile')) return
		if (colorController.getMode() === 'erase') {
			target.removeAttribute('style')
		} else {
			target.style.backgroundColor = `rgba(${colorController.generateColor().join(',')})`
		}
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

		activeSize.classList.toggle('active')
		activeSize = e.target
		activeSize.classList.toggle('active')
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
		activeMode.classList.toggle('active')
		activeMode = e.target
		activeMode.classList.toggle('active')
		colorController.setMode(mode)
	}

	function handleClearGrid() {
		clearGrid()
	}

	return {
		setup,
	}
})()
