let todos = ['buy milk', 'do homework']

// elements selected

const addForm = $(".add");
const list = $(".todos");
const search = $(".search input");
const clearBtn = $(".button-clear");

const renderTodos = (todos) => {
    html = ''
    todos.forEach((element, index) =>{
        html += `<li class="list-group-item d-flex justify-content-between align-items-center">
                <span>${element}</span>
                <i id="test-${index}" class="far fa-trash-alt delete"></i>
                </li>`
    })
    list.html(html); // jquery html method on element
}

renderTodos(todos);

// wait for an enter in the new todo input which sucmits the form
// jquery submit method replaces event listenr in vanila

addForm.submit(e =>{
    e.preventDefault(); // prevent refresh
    search.value = '';
    const newTodo = addForm.find("input").val().trim().toLowerCase() // val() jquery method instead of value property

    if (newTodo.length){
        todos.unshift(newTodo);
        renderTodos(todos);
        addForm.trigger("reset");
    } else{
        alert("it's empty!");
    }
})

// delegation, when class="delete" element is lickced inside of class="todos" element

$(".todos").on("click", ".delete", function(e) {
    let index = todos.indexOf($(this).parent().text())
    todos.splice(index, 1);

    $(this).parent().remove()
    // e.target.parentElement.remove();
});

search.keyup(() => {
    const term = search.val().trim().toLowerCase();
    const filtered = todos.filter(element =>{
        return element.includes(term)
    })
    renderTodos(filtered)
})

clearBtn.dblclick(e => {
    e.preventDefault();

    todos = [];
    clearBtn.css('background', 'red')
    clearBtn.css('color', 'white')
    
    search.value = ''
    renderTodos(todos)
})

clearBtn.click(e => {
    e.preventDefault();

    clearBtn.css('background', 'red')
    clearBtn.css('color', 'white')
})