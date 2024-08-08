var list
var books = []
var input = document.getElementsByTagName('input')[0]
var tableBody = document.getElementsByTagName('tbody')[0]

//запрос на получение json
var request = new XMLHttpRequest()

request.open("GET", "https://dekabu.github.io/books/list.json")
request.responseType = "json"
request.send()

window.onload = search

request.onload = function() {
	var list = request.response

	window.list = list;
	console.log(list)

	for (i in list) {
		a = document.createElement('tr')

		title = document.createElement('td')
		link = document.createElement('a')
		link.innerText = list[i].title
		link.href = 'files/' + list[i].link
		title.appendChild(link)

		author = document.createElement('td')
		author.innerText = list[i].author

		year = document.createElement('td')
		year.innerText = list[i].year

		pages = document.createElement('td')
		pages.innerText = list[i].pages

		a.appendChild(title)
		a.appendChild(author)
		a.appendChild(year)
		a.appendChild(pages)

		books.push(a)
	}

	books.forEach(book => {
		tableBody.appendChild(book)
	})
};

function search() {
	text = input.value.toLowerCase()
	re = new RegExp(text, 'gi')

	books.forEach(book => {
		show = false;
		[book.children[0].children[0], book.children[1], book.children[2], book.children[3]].forEach(title => {
			i = title.innerText.toLowerCase().indexOf(text)
			if (i == -1)
				title.innerHTML = title.innerText
			else {
				show = true
				title.innerHTML = title.innerText.replace(re, "<mark>$&</mark>")
			}
		})
		if (show) {
			if(book.classList.contains('hidden'))
				book.classList.remove('hidden')
		}
		else
			book.classList.add('hidden')
	})
	delete re
}
