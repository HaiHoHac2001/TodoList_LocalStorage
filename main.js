var input = document.querySelector('#new-task-input')
var button = document.querySelector('#new-task-submit')
var form = document.querySelector('#new-task-form')
var task = document.querySelector('#tasks')

form.addEventListener('submit', (e)=>{
  e.preventDefault()

  let val = input.value.trim()

  if(val) {
    addTodoElement({
      text: val,
    })
  }
  input.value = ''
  input.focus()
  saveTodoList()
})

function addTodoElement(todo){

  var li = document.createElement('li')
  li.innerHTML = `
        <span class="icon">${todo.text}
          <i class="fa-solid fa-trash-can"></i>
        </span>
  `
  li.setAttribute('class', 'icon')
  if(todo.status === 'completed') {
    li.setAttribute('class', 'completed')
  }
  
  li.addEventListener('click',function(){
    this.classList.toggle('completed')
    saveTodoList()
  })

  li.querySelector('i').addEventListener('click', function(){
    this.parentElement.remove()
    saveTodoList()
  })

  task.appendChild(li)
}

function saveTodoList(){
  var todoLists = document.querySelectorAll('li')
  var todoStorage = []

  todoLists.forEach(function(item){
    let text = item.querySelector('span').innerText
    let status = item.getAttribute('class')

    todoStorage.push({
      text,
      status
    })
  })
  console.log(todoStorage)
  localStorage.setItem('todoList', JSON.stringify(todoStorage))
}

function init(){
  let data = JSON.parse(localStorage.getItem('todoList'))

  if(data !== null){
    data.forEach(function(item){
      addTodoElement(item)
  })
  }
}

init()