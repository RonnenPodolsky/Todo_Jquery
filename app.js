let todos = ['buy milk', 'do homework']
let changeIndex = 0;
// selecting elements

const addForm = $(".add");
const list = $(".todos");
const searchForm = $(".search")
const search = $(".search input");
const clearBtn = $(".button-clear");

const renderTodos = (todos) => {
    html = ''
    todos.forEach((element, index) =>{
        html += `<li class="list-group-item d-flex justify-content-between align-items-center" >
                <span class="editable_text">${element}</span>
                <i id="test-${index}" class="far fa-trash-alt delete"></i>
                </li>`
    })
    list.html(html); // jquery html method on element
}

renderTodos(todos); // when page loads

// wait for an enter in the new todo input which submits the form
// jquery submit method replaces event listenr in vanila

addForm.submit(e =>{
    e.preventDefault(); // prevent refresh after form submit
    search.value = ''; // reset input text
    const newTodo = addForm.find("input").val().trim().toLowerCase() // val() jquery method instead of value property

    if (newTodo.length){ // validating the text is not empty
        todos.unshift(newTodo);
        renderTodos(todos);
        addForm.trigger("reset"); // clear submit input
        search.val("") // clear search input
    } else{
        alert("it's empty!");
    }
})

// delegation, when class="delete" element is clicked inside of class="todos" element
// meaning when clicking on the delete icon

$(".todos").on("click", ".delete", function() {
    let index = todos.indexOf($(this).parent().text().trim())
    todos.splice(index, 1); // remove from todos array
    $(this).parent().remove() // same as e.target.parentElement.remove();
});

$(".todos").on("click", ".editable_text", function(e) {
    let curText = $(this).text()
    
    let new_input = $("<input class=\"text_editor\"/>");
    new_input.val(curText);
    
    $(this).replaceWith(new_input);
    
    new_input.focus();

    changeIndex = todos.indexOf(curText)
});

$(".todos").on("blur", ".text_editor", function() {
    console.log(todos)
    let new_input = $(this).val();
    if (new_input === null || new_input === "") {new_input = curText}

    let updated_text = $("<span class=\"editable_text\">");
    updated_text.text(new_input);
    console.log($(this))
    $(this).replaceWith(updated_text);
    console.log($(this))

    todos[changeIndex] = new_input;
    renderTodos(todos)
});

searchForm.submit(function(e) {
    e.preventDefault()
})

search.keyup(function(e) {
    const term = search.val().trim().toLowerCase();
    const filtered = todos.filter(element =>{
        return element.includes(term)
    })
    renderTodos(filtered)
})


const keepButtonColor = () => {
    clearBtn.css('background', 'red')
    clearBtn.css('color', 'white')
}

clearBtn.dblclick(() => {
    keepButtonColor()

    todos = [];
    search.value = ''
    renderTodos(todos)
})

clearBtn.click(() => {
    keepButtonColor()
})