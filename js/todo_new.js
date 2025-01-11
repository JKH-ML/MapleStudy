// localStorage.clear(); for test

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
let toDos = [];

// when del <button> clicked
function delToDo(event){
    event.preventDefault();
    event.stopPropagation();  // 이벤트 전파 중지
    const target_li = event.target.parentElement;
    target_li.remove();
    // toDos에서 삭제   
    toDos = toDos.filter(toDo => toDo.id !== parseInt(target_li.id));
    saveToDo();
}

// 처음 로드될 때, 또는 새로운 할일 추가될 때
function drawToDo(newToDoObj){
    const new_li = document.createElement("li");
    new_li.id = newToDoObj.id;
    const new_span = document.createElement("span");
    const new_button = document.createElement("button");
    new_button.innerText = "삭제";
    new_button.addEventListener("click", (e) => {
        e.stopPropagation();  // 이벤트 전파 중지
        delToDo(e);
    });
    new_li.appendChild(new_span);
    new_li.appendChild(new_button);
    new_span.innerText = newToDoObj.text;
    todoList.appendChild(new_li);
}

// toDos가 변경되면 localStorage에 저장
function saveToDo(){
    localStorage.clear();
    localStorage.setItem("toDos", JSON.stringify(toDos));

}

// when page loaded
function loadToDo(){
    const loadedToDos = localStorage.getItem("toDos");
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        toDos = parsedToDos;
        parsedToDos.forEach(drawToDo);
    }

}

// when todo <input> submitted
function addToDo(event){
    event.preventDefault();
    const newToDo = todoInput.value;
    const newToDoObj = {
        text: newToDo,
        id: Date.now()
    }
    toDos.push(newToDoObj);
    saveToDo();
    drawToDo(newToDoObj);
    todoInput.value = "";
}

loadToDo()
todoForm.addEventListener("submit", addToDo);