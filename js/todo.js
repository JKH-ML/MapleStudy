const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");

function onTodoSubmit(event) {
  event.preventDefault();
  console.log(`${todoInput.value} 추가 완료`);
  const newTodo = todoInput.value;
  todoInput.value = "";

  // 2. 추가할 li element 생성
  // 2-1. 추가할 li element 생성
  const li = document.createElement("li");
  
  // 2-2. li에 id 속성 추가 
  li.setAttribute('id',newTodo);
  
  // 2-3. li에 text node 추가 
  const textNode = document.createTextNode(newTodo);
  li.appendChild(textNode);
  
  // 3. 생성된 li를 ul에 추가
  todoList.appendChild(li);
}

todoForm.addEventListener("submit", onTodoSubmit);