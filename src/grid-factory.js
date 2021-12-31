export function gridFactory() {
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
		for (let key in gridSizing) {
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
