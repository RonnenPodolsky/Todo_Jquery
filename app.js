let todos = ['buy milk - example', 'do homework - example'] // just examples to render at first
let changeIndex = 0;
let prevText = ""

// selecting elements
const addForm = $(".add");
const list = $(".todos");
const searchForm = $(".search")
const searchInput = $(".search input");
const clearBtn = $(".button-clear");


// use todos array to add each item to li tag and than update the ul element
// done after changes
const renderTodos = todos => {
    html = ''
    todos.forEach(element =>{
        html += `<li class="list-group-item d-flex justify-content-between align-items-center">
                    <span class="editable_text">${element}</span>
                    <i class="far fa-trash-alt delete"></i>
                 </li>`
    })
    list.html(html); // jquery html method on element
}

$('document').on('ready', renderTodos(todos)); // when page loads show current todos

// wait for an enter in the new todo input bottom of page which "submits" the form
// jquery submit method replaces addeventlistenr in vanila js

addForm.submit(e => {
    e.preventDefault(); // prevent refresh after form submit

    const newTodo = addForm.find("input").val().trim().toLowerCase() // val() jquery method instead of value property

    if (newTodo.length){ // validating the text is not empty
        todos.unshift(newTodo); // add text to beginning of array
        renderTodos(todos);
        addForm.trigger("reset"); // clear submit input
        searchInput.val("") // clear search text when new todo added
    } else{
        alert("Can't add empty todo");
    }
})

// delegation in jQuery, when class="delete" element is clicked inside of class="todos" element
// meaning when clicking on the delete icon

list.on("click", ".delete", function() {
    // this = delete icon
    todoText = $(this).parent().text().trim();
    let index = todos.indexOf(todoText);
    todos.splice(index, 1); // remove from todos array the text of the li element parent of delete icon
    $(this).parent().remove() // remove the li element itself, same as e.target.parentElement.remove();
});


// following three event listeners and functions are for editing todos
list.on("click", ".editable_text", function() {
    // this = span text inside li element inside ul
    
    prevText = $(this).text()
    changeIndex = todos.indexOf(prevText);

    let new_input_element = $("<input class=\"text_editor\"/>"); // dynamic new input element
    new_input_element.val(prevText);
    $(this).replaceWith(new_input_element); // replace span with input, same text
    new_input_element.focus(); // emulate clicking inside the input, alow for blue method later 
});

list.on("blur keyup", ".text_editor", (e) => {
    // blur is triggered upon focusout from input, meaning clicking outside it
    if (e.type === 'focusout' || (e.type === 'keyup' && e.key === "Enter")) {
        changeTodo()
    }
});

// function expression below is not hoisted, but event listners can use it because it's after the .js file loaded and used only after the event fired
const changeTodo = () => {
    let new_input_text = $(".todos .text_editor").val(); 
    if (new_input_text === "") {new_input_text = prevText}

    let updated_text = $("<span class=\"editable_text\">");
    updated_text.text(new_input_text);

    todos[changeIndex] = new_input_text;
    renderTodos(todos)
    // no need to use "replacewith" again because renderTodos creates new li elements based on the new array
}

// searching todos - filtering a new array with items that include the searched term
// and rendering the ul baased on it
searchInput.keyup(() => {
    const searchedTerm = searchInput.val().trim().toLowerCase();
    
    const filtered = todos.filter(element => {
        return element.includes(searchedTerm) // empty string "" always returns true so when deleting the term keeps all items from the original todos array
    })

    renderTodos(filtered)
})

searchForm.submit(function(e) {
    e.preventDefault()
})

// deleting all todos
clearBtn.on("click dblclick", e => {
    buttonColor('red', 'white')
    
    if (e.type === "dblclick"){
        todos = [];
        searchInput.value = ''
        renderTodos(todos)
    }
})

const buttonColor = (btnColor, textColor) => {
    clearBtn.css('background', btnColor)
    clearBtn.css('color', textColor)
}