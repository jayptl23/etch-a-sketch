const displayController = (function () {
	const gridSizing = {
		small: 8,
		medium: 16,
		large: 32,
	}

	function setup() {
		const body = document.querySelector('body')

		const container = document.createElement('div')
		container.setAttribute('class', 'container')
		body.appendChild(container)

		const canvas = generateCanvas()
		canvas.classList.add('small')

		const controls = generateControls()
		container.append(canvas, controls)

		generateGrid(gridSizing.small)
	}

	function generateCanvas() {
		const canvas = document.createElement('section')
		canvas.classList.add('canvas')
		return canvas
	}

	function generateGrid(size) {
		const canvas = document.querySelector('.canvas')
		for (let i = 0; i < size; i++) {
			for (let j = 0; j < size; j++) {
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

	function handleSizingClick(e) {
		const size = e.target.getAttribute('data-size')
		if (!size) return

		const oldCanvas = document.querySelector('.canvas')
		const classes = oldCanvas.classList
		if (size === classes[1]) {
			// Same as curent size
			return
		}

		const mainContainer = document.querySelector('.container')
		mainContainer.removeChild(mainContainer.childNodes[0])

		const canvas = generateCanvas()
		canvas.classList.add(size)

		mainContainer.prepend(canvas)
		generateGrid(gridSizing[size])
	}

	return {
		setup,
	}
})()

displayController.setup()
