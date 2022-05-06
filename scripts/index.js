const formSelectInput = document.querySelector('.formselect__input');
const formSelect = document.querySelector('.formselect');
const todoList = document.querySelector('.todo__list');
let todoArray = [];

//========Функция для рендеринга новых задач на дисплее ================

function renderTodo(todo) {
	const todoItem = document.querySelector(`[data-key='${todo.id}']`);
	const isChecked = todo.checked ? 'done' : '';
	const newlist = document.createElement('li');

	localStorage.setItem('todoArray', JSON.stringify(todoArray));

	if (todo.deleted) {
		todoItem.remove();
		return;
	}

	newlist.setAttribute('class', `todo__item ${isChecked}`);
	newlist.setAttribute('data-key', todo.id);
	newlist.innerHTML = `
	<input class='todo__checkbox' id='${todo.id}' type='checkbox' />
	<label for='${todo.id}' class='todo__label'></label>
	<span class='todo__text'>${todo.todoText}</span>
	<button class='todo__delete'>
	<svg class='todo__delete-pic' fill='var(--svgcolor)' xmlns='http://www.w3.org/2000/svg' width='24'
	height='24' viewBox='0 0 24 24'>
	<path d='M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z' />
	</svg>
	</button>
`;
	if (todoItem) {
		todoList.replaceChild(newlist, todoItem);
	} else {
		todoList.append(newlist);
	}
}

//=========Функция добавления новых задач ============================

function addTodo(todoText, id) {
	const todoobject = {
		todoText: formSelectInput.value,
		checked: false,
		id: Date.now(),
	};
	console.log(todoobject);
	todoArray.push(todoobject);
	renderTodo(todoobject);
}

//===========функционал для пометки задач как выполненных и удаления todo==========

function toggleDone(key) {
	const index = todoArray.findIndex((myitem) => myitem.id === Number(key));
	todoArray[index].checked = !todoArray[index].checked;
	renderTodo(todoArray[index]);
	console.log(todoArray[index]); // for demo purpose 
	console.log(index);  // for demo purpose 
}

function deleteTodo(key) {
	const index = todoArray.findIndex((myitem) => myitem.id === Number(key));
	const emptytodo = {
		deleted: true,
		...todoArray[index],
	};
	todoArray = todoArray.filter((myitem) => myitem.id !== Number(key));
	renderTodo(emptytodo);
}

//========Прослушиватель событий отправить в форму=====================

formSelect.addEventListener('submit', (event) => {
	event.preventDefault();
	addTodo();
	formSelect.reset();
});

//========Прослушиватель событий добавление и удалени задач=====================

todoList.addEventListener('click', (event) => {
	if (event.target.classList.contains('todo__label')) {
		const itemKey = event.target.parentElement.dataset.key;
		toggleDone(itemKey);
	};

	if (event.target.classList.contains('todo__delete')) {
		const itemKey = event.target.parentElement.dataset.key;
		deleteTodo(itemKey);
	};
});

//======Данные todo в локальном хранилище браузера=====================

document.addEventListener('DOMContentLoaded', () => {
	const ref = localStorage.getItem('todoArray');
	if (ref) {
		todoArray = JSON.parse(ref);
		todoArray.forEach((t) => {
			renderTodo(t);
		});
	}
});

