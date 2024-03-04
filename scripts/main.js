const homeCarouselContainer = document.querySelector(
  ".home-carousel-container"
);
const btnHomeCarouselLeft = document.querySelector(".btn-carousel-left");
const btnHomeCarouselRight = document.querySelector(".btn-carousel-right");
const homeTextCarouselPrev = document.querySelector(".text-carousel-prev");
const homeTextCarouselNext = document.querySelector(".text-carousel-next");
const homeCarouselSlider = document.querySelector(".home-carousel-slider");
const homeCarouselSliderSpan = document.querySelector(".home-carousel-slider");

const collectionCarouselContainer = document.querySelector(
  ".collection-carousel"
);
const collectionCarouselButtonsContainer = document.querySelector(
  ".collection-carousel-buttons"
);

const createCarouselCard = (i) => {
  return `
    <div class="home-carousel-item w-100 h-100 position-absolute ${
      i == 0 ? "active" : ""
    }" data-id=${i}>
        <div class="home-carousel-body position-relative h-100 w-100 overflow-hidden ">
            <img class="" src="../assets/static/plant_${i}.png" alt="home plant">
            <span class="position-absolute text-uppercase ">PILEA PEPEROMIOIDES</span>
        </div>
    </div>`;
};
function createSliderSpan(i) {
  return `<span class="home-carousel-slider-span h-100  border-0 ${
    i == 0 ? "active" : ""
  }" data-id=${i}>
    </span>`;
}
function createCollectionCarouselCard(i) {
  return `
    <div class="collection-carousel-item h-100 w-100 position-absolute p-1 p-md-2 p-lg-3 " data-id=${i}>
        <div class="carousel-item-body h-100 w-100 d-flex flex-column">
            <div class="carousel-image-container flex-grow-1 overflow-hidden ">
                <img class="object-fit-cover " src="../assets/static/plant_0.png" alt="plant">
            </div>
            <h4 class="fw-semibold m-0 d-flex align-items-center ">Bird of paradise
            </h4>
        </div>
    </div>
    `;
}

const totalHomeCarouselItem = 3;
for (let i = 0; i < totalHomeCarouselItem; i++) {
  homeCarouselContainer.insertAdjacentHTML("beforeend", createCarouselCard(i));
  homeCarouselSlider.insertAdjacentHTML("beforeend", createSliderSpan(i));
}

let currentHomeCarouselItem = 0;

// for carousel movement
function displayCarouselItem(
  carouselContainer,
  translateFactor,
  totalCarouselItem,
  currentCarouselItem,
  translateY = true
) {
  for (let i = 0; i < totalCarouselItem; i++) {
    const currentItem = carouselContainer.children[i];

    currentItem.style.transform = `translateX(${
      (+currentItem.dataset.id - currentCarouselItem) * translateFactor
    }%) ${translateY ? "translateY(-50%)" : ""}`;

    currentItem.classList.remove("active");

    if (i < currentCarouselItem) currentItem.style.opacity = 0;
    else currentItem.style.opacity = 1;
  }

  carouselContainer.children[currentCarouselItem].classList.add("active");
}

// for left button click
function onLeftCarouselButton(carouselContainer, translateFactor) {
  if (currentHomeCarouselItem === 0)
    currentHomeCarouselItem = totalHomeCarouselItem - 1;
  else currentHomeCarouselItem--;

  displayCarouselItem(
    carouselContainer,
    translateFactor,
    totalHomeCarouselItem,
    currentHomeCarouselItem
  );
}
// for right button click
function onRightCarouselButton(carouselContainer, translateFactor) {
  if (+currentHomeCarouselItem === totalHomeCarouselItem - 1)
    currentHomeCarouselItem = 0;
  else currentHomeCarouselItem++;

  displayCarouselItem(
    carouselContainer,
    translateFactor,
    totalHomeCarouselItem,
    currentHomeCarouselItem
  );
}

// for home carousel
const setHomeSliderActiveAndChangeNumber = () => {
  [...homeCarouselSlider.children].forEach((el) =>
    +el.dataset.id === +currentHomeCarouselItem
      ? el.classList.add("active")
      : el.classList.remove("active")
  );
  homeTextCarouselPrev.textContent =
    +currentHomeCarouselItem === 0 ? 3 : +currentHomeCarouselItem;
  homeTextCarouselNext.textContent =
    +currentHomeCarouselItem === 2 ? 1 : +currentHomeCarouselItem + 2;
};
btnHomeCarouselLeft.addEventListener("click", () => {
  onLeftCarouselButton(
    homeCarouselContainer,
    window.innerWidth >= 768 ? 90 : 100
  );
  setHomeSliderActiveAndChangeNumber();
});
btnHomeCarouselRight.addEventListener("click", () => {
  onRightCarouselButton(
    homeCarouselContainer,
    window.innerWidth >= 768 ? 90 : 100
  );
  setHomeSliderActiveAndChangeNumber();
});
homeCarouselSlider.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() !== "span") return;
  currentHomeCarouselItem = e.target.dataset.id;

  displayCarouselItem(
    homeCarouselContainer,
    window.innerWidth >= 768 ? 90 : 100,
    totalHomeCarouselItem,
    currentHomeCarouselItem
  );
  setHomeSliderActiveAndChangeNumber();
});

// for collection carousel
const totalCollectionCarouselItem = 6;
for (let i = 0; i < totalCollectionCarouselItem; i++) {
  collectionCarouselContainer.insertAdjacentHTML(
    "beforeend",
    createCollectionCarouselCard(i)
  );
}

let currentCollectionCarouselItem = 0;

// for left button click
function onLeftCollectionCarouselButton(carouselContainer, translateFactor) {
  if (+currentCollectionCarouselItem === 0)
    currentCollectionCarouselItem = totalCollectionCarouselItem - 1;
  else currentCollectionCarouselItem--;

  displayCarouselItem(
    carouselContainer,
    translateFactor,
    totalCollectionCarouselItem,
    currentCollectionCarouselItem,
    false
  );
}
// for right button click
function onRightCollectionCarouselButton(carouselContainer, translateFactor) {
  if (+currentCollectionCarouselItem === totalCollectionCarouselItem - 1)
    currentCollectionCarouselItem = 0;
  else currentCollectionCarouselItem++;

  console.log("helllo false");
  displayCarouselItem(
    carouselContainer,
    translateFactor,
    totalCollectionCarouselItem,
    currentCollectionCarouselItem,
    false
  );
}

collectionCarouselButtonsContainer.addEventListener("click", (e) => {
  if (!e.target.closest("button")) return;

  if (e.target.classList.contains("btn-collection-prev")) {
    onLeftCollectionCarouselButton(collectionCarouselContainer, 100);
  }
  if (e.target.classList.contains("btn-collection-next")) {
    onRightCollectionCarouselButton(collectionCarouselContainer, 100);
  }
});
// IIFE
(function () {
  displayCarouselItem(
    homeCarouselContainer,
    window.innerWidth >= 768 ? 90 : 100,
    totalHomeCarouselItem,
    currentHomeCarouselItem
  );
  displayCarouselItem(
    collectionCarouselContainer,
    100,
    totalCollectionCarouselItem,
    currentCollectionCarouselItem,
    false
  );
})();
