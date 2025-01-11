const menuButton = document.querySelector("#menu-button");
const menuModal = document.querySelector("#menu-modal");
const savedTodosDiv = document.querySelector("#saved-todos");

function toggleMenu() {
    menuModal.classList.toggle("show");
    menuButton.classList.toggle("active");
    if (menuModal.classList.contains("show")) {
        updateSavedTodos();
    }
}

function updateSavedTodos() {
    savedTodosDiv.innerHTML = "";
    const savedTodos = localStorage.getItem("toDos");
    
    if (savedTodos) {
        const todoList = JSON.parse(savedTodos);
        todoList.forEach(todo => {
            const todoDiv = document.createElement("div");
            todoDiv.innerText = todo.text;
            savedTodosDiv.appendChild(todoDiv);
        });
    } else {
        const emptyMessage = document.createElement("div");
        emptyMessage.innerText = "저장된 할 일이 없습니다.";
        savedTodosDiv.appendChild(emptyMessage);
    }
}

menuButton.addEventListener("click", toggleMenu);

// 메뉴 외부 클릭 시 닫기
document.addEventListener("click", (e) => {
    if (!menuModal.contains(e.target) && 
        !menuButton.contains(e.target) && 
        menuModal.classList.contains("show")) {
        toggleMenu();
    }
}); 