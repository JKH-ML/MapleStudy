const images = [];

for (let i = 1; i <= 129; i++) {
  images.push(`maple_image_${i}.png`);
}

const chosenImage = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img");

bgImage.src = `img/maple_images/${chosenImage}`;

document.body.appendChild(bgImage);














