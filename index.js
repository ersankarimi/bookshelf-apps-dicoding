// imported modules
import { state, handleChange, handleSubmit } from './modules/form.js'
import { handleCariBuku } from './modules/searchTodo.js'
import {
	getDataFromLocalStorage,
	setDataToLocalStorage,
} from './modules/storage.js'
import { makeNewList } from './modules/todoList.js'

// seleksi semua element html
// * Input Buku
const formInputBuku = document.querySelector('#inputBook')
const inputBuku = formInputBuku.querySelectorAll('input')
const tombolSubmitBuku = document.querySelector('#bookSubmit')

// * Cari Buku
const cariBuku = document.querySelector('#searchBookTitle')

//  Event Listener
// * Input buku
inputBuku.forEach((input) => {
	input.addEventListener('change', handleChange)
})

inputBuku.forEach((input) => {
	input.addEventListener('click', () => {
		cariBuku.value = ''
		makeNewList()
	})
})

// * Submit Buku
tombolSubmitBuku.addEventListener('click', handleSubmit)

// * Cari Buku
cariBuku.addEventListener('input', handleCariBuku)

// * saat pertama kali membuka website, setel local storage dengan array kosong jika tidak ada data didalamnya
window.addEventListener('load', () => {
	if (!getDataFromLocalStorage()) setDataToLocalStorage([])
	// render data dari local storage kalo ada todo yang dibuat sebelumnya
	Boolean(getDataFromLocalStorage().length) && makeNewList()
	// disabledTombolStyle(tombolSubmitBuku.disabled)
})

export { inputBuku, tombolSubmitBuku, cariBuku }
