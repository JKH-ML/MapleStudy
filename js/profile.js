const button = document.getElementById('myButton');
const resultDiv = document.getElementById('result');
const nicknameInput = document.getElementById('nickname');
const links = [
  "img/maple_images_2/pc배경화면_겨울풍경.png",
  "img/maple_images_2/pc배경화면_굴뚝.png",
  "img/maple_images_2/pc배경화면_눈사람.png",
  "img/maple_images_2/pc배경화면_붕어빵.png",
  "img/maple_images_2/pc배경화면_선물배달.png",
  "img/maple_images_2/pc배경화면_트리.png"
]

function randomImage() {
  return links[Math.floor(Math.random() * links.length)];
}


button.addEventListener('click', handleSubmit);
nicknameInput.addEventListener('keydown', handleEnterKey);

async function handleSubmit() {
  try {
    const nickname = nicknameInput.value;
    if (!nickname.trim()) {
      resultDiv.innerHTML = `
      <div class="text-red-500 text-center">
      닉네임을 입력해주세요.
      </div>
      `;
      return;
    }

    resultDiv.innerHTML = '<div class="text-center text-gray-600 flex justify-center items-center h-full"><br/><br/><br/><br/>검색 중...</div>';
    
    const baseUrl = `https://maplestory.nexon.com/N23Ranking/World/Total?c=${encodeURIComponent(nickname)}&w=0`;
    const proxyUrl = "https://corsproxy.io/?" + baseUrl;
    
    const response = await fetch(proxyUrl);
    const htmlText = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, "text/html");
    const characterRow = doc.querySelector("tr.search_com_chk");

    // 영어 닉네임의 경우, 대소문자가 정확하게 일치 하지 않으면 검색에 실패함
    // -> 아직 이유를 찾지 못함...
    
    if (!characterRow) {
      resultDiv.innerHTML = `
    <div class="w-full h-full bg-gray-100 px-10 pt-10">
      <div class="relative mt-16 mb-16 max-w-sm mx-auto">
        <div class="rounded overflow-hidden shadow-md bg-white">
          <div class="absolute -mt-20 w-full flex justify-center">
            <div class="h-50 w-50 flex justify-center">
              <img src="img/profile.jpg" class="rounded-full h-full w-full max-w-[120px] shadow-md" alt="캐릭터가 없음" />
            </div>
          </div>
          <div class="px-6 mt-16">
            <p class="text-center text-gray-600 text-base pt-3 mb-3 font-normal">
              닉네임 "${nicknameInput.value}"를 찾을 수 없다옹 😿 <br /><br />
            </p>
          </div>
        </div>
      </div>
    </div>
    `;
      return;
    }

    const ranking = characterRow.querySelector("td:first-child p:first-child")?.textContent.trim() || '순위 정보 없음';
    const charImg = characterRow.querySelector(".char_img img")?.src || '';
    const charName = characterRow.querySelector("dt a")?.textContent.trim() || '이름 정보 없음';
    const job = characterRow.querySelector("dd")?.textContent.trim() || '직업 정보 없음';
    const level = characterRow.querySelector("td:nth-child(3)")?.textContent.trim() || '레벨 정보 없음';
    const exp = characterRow.querySelector("td:nth-child(4)")?.textContent.trim() || '경험치 정보 없음';
    const popularity = characterRow.querySelector("td:nth-child(5)")?.textContent.trim() || '인기도 정보 없음';
    const guild = characterRow.querySelector("td:nth-child(6)")?.textContent.trim() || '정보 없음';

    resultDiv.innerHTML = `
    <div 
      class="w-full h-full bg-gray-100 px-10 pt-10"
      style="background-image: url(${randomImage()}); background-size: cover; background-position: center;"
      >
      <div class="relative mt-4 mb-16 max-w-sm mx-auto mt-24">
        <div class="rounded overflow-hidden shadow-md bg-white/70  py-8">
          <div class="absolute -mt-20 w-full flex justify-center">
            <div class="h-50 w-50">
              <img src="${charImg}" class="rounded-full object-cover h-full w-full" alt="캐릭터 이미지" />
            </div>
          </div>
          <div class="px-6 mt-16">
            <h2 class="font-bold text-3xl text-center text-black mb-1">${nickname}</h2>
            <p class="text-gray-800 text-sm text-center">${job}</p>
            <p class="text-center text-gray-900 text-base pt-3 mb-3 font-normal">
              ${level} (랭킹: ${ranking}위) <br />
              인기도: ${popularity} <br />
              길드: ${guild} <br />
            </p>
          </div>
        </div>
      </div>
    </div>
    `;
  } catch (error) {
    resultDiv.innerHTML = '<div class="text-red-500 text-center">데이터를 불러오는 중 오류가 발생했습니다.</div>';
    console.error('Error:', error);
  }
}

function handleEnterKey(event) {
  if (event.key === 'Enter') {
    handleSubmit();
  }
}