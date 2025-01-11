const images = [];

for (let i = 1; i <= 129; i++) {
  images.push(`maple_image_${i}.png`);
}

const images_2 = [
  "pc배경화면_겨울풍경.png",
  "pc배경화면_굴뚝.png",
  "pc배경화면_눈사람.png",
  "pc배경화면_붕어빵.png",
  "pc배경화면_선물배달.png",
  "pc배경화면_트리.png",
];



const chosenImage = images_2[Math.floor(Math.random() * images_2.length)];

const bgImage = document.createElement("img");

bgImage.src = `img/maple_images_2/${chosenImage}`;

document.body.appendChild(bgImage);














