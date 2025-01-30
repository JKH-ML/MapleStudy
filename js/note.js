const today = new Date();
let currentMonth = today;
let selectedDate = today.toISOString().split('T')[0];
const todos = JSON.parse(localStorage.getItem('todos')) || {};
const holidays = ["2025-03-01", "2025-08-15", "2025-10-03", "2025-12-25"];

function formatDate(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function changeMonth(delta) {
    currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + delta, 1);
    renderCalendar();
}

function renderCalendar() {
    const calendar = document.getElementById("calendar");
    const calendarTitle = document.getElementById("calendar-title");
    
    // 달력 제목 업데이트
    calendarTitle.textContent = `${currentMonth.getFullYear()}년 ${currentMonth.getMonth() + 1}월`;
    
    calendar.innerHTML = "";
    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

    // 빈 칸 추가
    for (let i = 0; i < firstDay.getDay(); i++) {
        calendar.innerHTML += "<div></div>";
    }

    // 날짜 추가
    for (let d = 1; d <= lastDay.getDate(); d++) {
        let dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        let color = "text-black";
        if (new Date(dateStr).getDay() === 0 || holidays.includes(dateStr)) color = "text-red-500";
        else if (new Date(dateStr).getDay() === 6) color = "text-blue-500";
        
        let hasTodo = todos[dateStr] && todos[dateStr].length;
        let completed = hasTodo && todos[dateStr].every(todo => todo.done);
        let isSelected = dateStr === selectedDate;
        
        calendar.innerHTML += `
            <button onclick="selectDate('${dateStr}')" 
                class="p-2 border rounded hover:bg-gray-100 
                ${color} 
                ${hasTodo ? (completed ? 'bg-green-200' : 'bg-yellow-200') : ''} 
                ${isSelected ? 'ring-2 ring-blue-500 font-bold' : ''}"
            >${d}</button>`;
    }
}

function selectDate(date) {
    selectedDate = date;
    document.getElementById('selected-date').textContent = `${date} 선택됨`;
    renderTodoList();
    renderCalendar(); // 선택된 날짜 표시 업데이트를 위해 달력도 다시 렌더링
}

function renderTodoList() {
    const list = document.getElementById("todo-list");
    list.innerHTML = "";
    (todos[selectedDate] || []).forEach((todo, index) => {
        list.innerHTML += `
            <li class="flex justify-between items-center p-2 border rounded hover:bg-gray-50 ${todo.done ? 'line-through text-gray-500' : ''}">
                <span onclick="toggleDone(${index})" class="cursor-pointer">${todo.text}</span>
                <button onclick="deleteTodo(${index})" class="text-red-500 hover:text-red-700">❌</button>
            </li>`;
    });
}

function addTodo() {
    const input = document.getElementById("todo-input");
    if (!input.value.trim()) return;
    if (!todos[selectedDate]) todos[selectedDate] = [];
    todos[selectedDate].push({ text: input.value, done: false });
    input.value = "";
    saveTodos();
}

function toggleDone(index) {
    todos[selectedDate][index].done = !todos[selectedDate][index].done;
    saveTodos();
}

function deleteTodo(index) {
    todos[selectedDate].splice(index, 1);
    if (todos[selectedDate].length === 0) delete todos[selectedDate];
    saveTodos();
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
    renderCalendar();
    renderTodoList();
}

// 초기 렌더링
renderCalendar();
document.getElementById('selected-date').textContent = `${selectedDate} 선택됨`;
renderTodoList();
