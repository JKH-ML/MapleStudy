const clock = document.querySelector("h2#clock");

function getClock() {
  const date = new Date();
  let hours = date.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  // 12시간 형식으로 변환
  hours = hours % 12;
  hours = hours ? hours : 12; // 0시를 12시로 표시
  
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];

  clock.innerHTML = `${hours}:${minutes}<span class="ampm">${ampm}</span> | ${month}월 ${day}일 (${dayOfWeek})`;
}

getClock();
setInterval(getClock, 1000);