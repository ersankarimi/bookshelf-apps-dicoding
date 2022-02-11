// imported modules
import { getDataFromLocalStorage, setDataToLocalStorage } from './storage.js'

// seleksi element parent rak buku
const rakBukuSelesai = document.querySelector('#incompleteBookshelfList')
const rakBukuBelumSelesai = document.querySelector('#completeBookshelfList')

const makeNewList = (param = getDataFromLocalStorage()) => {
	rakBukuBelumSelesai.innerHTML = ''
	rakBukuSelesai.innerHTML = ''
	const dataBuku = param

	dataBuku.map((buku) => {
		!buku.inputBookIsComplete
			? rakBukuSelesai.appendChild(listBuku(buku))
			: rakBukuBelumSelesai.appendChild(listBuku(buku))
	})
}

const listBuku = (param) => {
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

	// parent dari tiap buku list
	const article = document.createElement('article')
	article.setAttribute('id', id)
	article.setAttribute('class', 'book_item')

	article.innerHTML = `
        <input type="text" value="${inputBookTitle}" style="font-size:2rem;font-weight:bold; border:transparent; cursor:pointer;"></input>
        <p>Penulis : ${inputBookAuthor}</p>
        <p>Tahun&nbsp;  : ${inputBookYear}</p>

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
		.addEventListener('click', handlehapusBuku)

	article
		.querySelector('input[type=text]')
		.addEventListener('change', handleUpdateTitleBuku)

	return article
}

const handleSelesaiBaca = (e) => {
	const id = e.target.parentElement.parentElement.id
	updatebukuComplete(id)
}

const handlehapusBuku = (e) => {
	const id = e.target.parentElement.parentElement.id
	hapusBuku(id)
}

const handleUpdateTitleBuku = (e) => {
	const id = e.target.parentElement.id
	updateBukuTitle(id, e.target.value)
}

// update title buku
const updateBukuTitle = (id, value) => {
	const dataBuku = getDataFromLocalStorage()
	dataBuku.forEach((buku) => {
		if (buku.id === id) {
			buku.inputBookTitle = value
		}
	})

	setDataToLocalStorage(dataBuku)
	makeNewList()
}

// update data buku selesai dibaca atau tidak
const updatebukuComplete = (id) => {
	const dataBuku = getDataFromLocalStorage()
	dataBuku.forEach((buku) => {
		if (buku.id === id) {
			buku.inputBookIsComplete = !buku.inputBookIsComplete
		}
	})
	setDataToLocalStorage(dataBuku)
	makeNewList()
}

// menghapus buku
const hapusBuku = (id) => {
	const dataBuku = getDataFromLocalStorage()
	setDataToLocalStorage(dataBuku.filter((buku) => buku.id !== id))
	makeNewList()
}

export { makeNewList, rakBukuSelesai, rakBukuBelumSelesai }
