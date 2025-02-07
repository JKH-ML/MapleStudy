const menuButton = document.getElementById('menuButton');
const closeMenuButton = document.getElementById('closeMenuButton');
const slideMenu = document.getElementById('slideMenu');

const myForm = document.getElementById('login-form');
const userID = document.getElementById('login-id');
const hello = document.getElementById('sayHello');
const afterLogin = document.getElementById('after-login');
const currentTime = document.getElementById('current-time');
const logoutBtn = document.getElementById('logout-btn');

// Open menu
menuButton.addEventListener('click', () => {
  slideMenu.classList.remove('translate-x-full');
});

// Close menu
closeMenuButton.addEventListener('click', () => {
  slideMenu.classList.add('translate-x-full');
});

function idCheck() {
  if (window.localStorage.getItem('name')) {
    myForm.classList.add('hidden');
    afterLogin.classList.remove('hidden');
    hello.innerText = `Hello, ${window.localStorage.getItem('name')}!`;
  } else {
    myForm.classList.remove('hidden');
    afterLogin.classList.add('hidden');
  }
}
userID.addEventListener('change', () => {
  window.localStorage.setItem('name', userID.value)
});

myForm.addEventListener('submit', (event) => {
  event.preventDefault();
  hello.innerText = `Hello, ${window.localStorage.getItem('name')}!`;
  idCheck();
});

logoutBtn.addEventListener('click', () => {
  window.localStorage.removeItem('name');
  userID.value = '';
  idCheck();
});

function updateTime() {
  const now = new Date();
  const formattedTime = now.toLocaleTimeString(); // 현재 시간을 HH:MM:SS 형식으로 변환
  currentTime.innerText = `현재 시간: ${formattedTime}`;
}

// 페이지 로드 시 즉시 실행 & 매초마다 업데이트
updateTime();
setInterval(updateTime, 1000);

idCheck();