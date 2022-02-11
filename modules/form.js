// imported modules
import { inputBuku, tombolSubmitBuku } from './../index.js'
import { addDataToLocalStorage } from './storage.js'
import { makeNewList } from './todoList.js'

const state = {
	inputBookTitle: '',
	inputBookAuthor: '',
	inputBookYear: '',
	id: '',
	inputBookIsComplete: false,
}

const handleChange = (e) => {
	// cek apakah input itu checkbox?
	e.target.id === 'inputBookIsComplete'
		? (state.inputBookIsComplete = e.target.checked)
		: (state[`${e.target.id}`] = e.target.value)

	// ubah text dalam button submit
	tombolSubmitBuku.innerHTML = state.inputBookIsComplete
		? `Masukkan Buku ke rak <span>Selesai dibaca</span>`
		: `Masukkan Buku ke rak <span>Belum selesai dibaca</span>`
}

const handleSubmit = (e) => {
	e.preventDefault()

	// sebelum submit dilakukan pengecekan apakah user mengisi semua inputan yang tersedia atau tidak
	if (cekInputBuku()) {
		return alert('Semua Input Buku Harus Terisi!')
	}

	state.id = new Date().getTime().toString().substring(8)

	// simpan kedalam local storage
	addDataToLocalStorage(state)

	// make list
	makeNewList()

	// reset value state
	inputBuku.forEach((input) => {
		state.id = ''
		if (input.id === 'inputBookIsComplete') {
			input.checked = false
			state.inputBookIsComplete = false
		} else {
			input.value = ''
			state[`${input.id}`] = input.value
		}
	})
}

const cekInputBuku = () => {
	const result = []
	for (const x in state) {
		if (state[x] === false || state[x] === true || x === 'id') continue
		state[x] === '' ? result.push(true) : result.push(false)
	}
	return result.find((el) => el === true)
}

export { state, handleChange, handleSubmit }
