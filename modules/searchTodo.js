// imported modules
import { makeNewList, rakBukuBelumSelesai, rakBukuSelesai } from './todoList.js'
import { getDataFromLocalStorage } from './storage.js'

const handleCariBuku = (e) => {
	const dataTodos = getDataFromLocalStorage()
	const regex = new RegExp(e.target.value, 'gi')
	// filter data dari local storage sesuai dengan inputan pencarian todo
	const finalData = dataTodos.filter((todo) =>
		todo.inputBookTitle.match(regex)
	)
	makeNewList(finalData)
}

export { handleCariBuku }
