// imported modules
import { getDataFromLocalStorage, setDataToLocalStorage } from './storage.js'

// seleksi element parent rak buku
const rakBukuSelesai = document.querySelector('#incompleteBookshelfList')
const rakBukuBelumSelesai = document.querySelector('#completeBookshelfList')

const makeNewList = (param = getDataFromLocalStorage()) => {
	rakBukuBelumSelesai.innerHTML = ''
	rakBukuSelesai.innerHTML = ''
	const dataTodos = param

	dataTodos.map((todo) => {
		!todo.inputBookIsComplete
			? rakBukuSelesai.appendChild(listTodo(todo))
			: rakBukuBelumSelesai.appendChild(listTodo(todo))
	})
}

const listTodo = (param) => {
	const {
		inputBookTitle,
		inputBookAuthor,
		inputBookYear,
		id,
		inputBookIsComplete,
	} = param

	const textButton = inputBookIsComplete
		? 'Belum Selesai dibaca'
		: 'Selesai dibaca'

	// parent dari tiap todo list
	const article = document.createElement('article')
	article.setAttribute('id', id)
	article.setAttribute('class', 'book_item')

	article.innerHTML = `
        <h3>${inputBookTitle}</h3>
        <p>Penulis: ${inputBookAuthor}</p>
        <p>Tahun: ${inputBookYear}</p>

        <div class="action">
            <button class="green" data-complete=${inputBookIsComplete}>${textButton}</button>
            <button class="red">Hapus buku</button>
        </div>
    `

	article
		.querySelector('button[class=green]')
		.addEventListener('click', handleSelesaiBaca)

	article
		.querySelector('button[class=red]')
		.addEventListener('click', handleHapusTodo)

	return article
}

const handleSelesaiBaca = (e) => {
	const id = e.target.parentElement.parentElement.id
	updateTodo(id)
}

const handleHapusTodo = (e) => {
	const id = e.target.parentElement.parentElement.id
	hapusTodo(id)
}

// update data todo selesai dibaca atau tidak
const updateTodo = (id) => {
	const dataTodos = getDataFromLocalStorage()
	dataTodos.forEach((todo) => {
		if (todo.id === id) {
			todo.inputBookIsComplete = !todo.inputBookIsComplete
		}
	})
	setDataToLocalStorage(dataTodos)
	makeNewList()
}

// menghapus todo
const hapusTodo = (id) => {
	const dataTodos = getDataFromLocalStorage()
	setDataToLocalStorage(dataTodos.filter((todo) => todo.id !== id))
	makeNewList()
}

export { makeNewList, rakBukuSelesai, rakBukuBelumSelesai }
