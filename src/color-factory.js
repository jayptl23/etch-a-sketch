export function colorFactory() {
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

	return {
		generateColor,
		setMode,
		getMode,
	}
}
