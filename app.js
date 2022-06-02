
let todos = ['buy milk', 'do homework']

// const addForm = document.querySelector('.add')
// const list = document.querySelector('.todos')
// const search = document.querySelector('.search input')
// const clearBtn = document.querySelector('.button-clear')


const addForm = $(".add");
const list = $(".add");
const search = $(".add");
const clearBtn = $(".add");



const renderTodos = (todos) => {
    html = ''
    todos.forEach(element =>{
        html += `<li class="list-group-item d-flex justify-content-between align-items-center">
                <span>${element}</span>
                <i class="far fa-trash-alt delete"></i>
                </li>`
    })
    list.innerHTML = html;
}

renderTodos(todos)

addForm.addEventListener('submit', e =>{
    e.preventDefault();
    search.value = '';
    const newTodo = addForm.add.value.trim().toLowerCase();
    if (newTodo.length){
        todos.unshift(newTodo);
        renderTodos(todos);
        addForm.reset();
    }else{
        alert("it's empty!");
    }
})

list.addEventListener('click', e => {
    if (e.target.classList.contains('delete')){
        
        e.target.parentElement.remove();
        console.log(e.target.parentElement)

        var index = todos.indexOf(e.target.value);
        todos.splice(index, 1);
    }
})

search.addEventListener('keyup', () => {
    const term = search.value.trim().toLowerCase();
    const filtered = todos.filter(element =>{
        return element.includes(term)
    })
    renderTodos(filtered)
})

clearBtn.addEventListener('dblclick', e => {
    e.preventDefault();
    todos = [];
    clearBtn.style.background = 'red'
    clearBtn.style.color = 'white'
    search.value = ''
    renderTodos(todos)
})


clearBtn.addEventListener('click', e => {
    e.preventDefault();
    clearBtn.style.background = 'red'
    clearBtn.style.color = 'white'
})