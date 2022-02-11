// imported modules
import { makeNewList, rakBukuBelumSelesai, rakBukuSelesai } from './todoList.js'
import { getDataFromLocalStorage } from './storage.js'

const handleCariBuku = (e) => {
	const dataBuku = getDataFromLocalStorage()
	const regex = new RegExp(e.target.value, 'gi')
	// filter data dari local storage sesuai dengan inputan pencarian buku
	const finalData = dataBuku.filter((buku) =>
		buku.inputBookTitle.match(regex)
	)
	makeNewList(finalData)
}

export { handleCariBuku }
