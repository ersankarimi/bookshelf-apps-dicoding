const storageKey = 'BOOK_LIST'

const setDataToLocalStorage = (data) => {
	localStorage.setItem(storageKey, JSON.stringify(data))
}

const getDataFromLocalStorage = () => {
	return JSON.parse(localStorage.getItem(storageKey))
}

const addDataToLocalStorage = (newData) => {
	const data = getDataFromLocalStorage()
	data.push(newData)
	setDataToLocalStorage(data)
}

export {
	storageKey,
	setDataToLocalStorage,
	getDataFromLocalStorage,
	addDataToLocalStorage,
}
