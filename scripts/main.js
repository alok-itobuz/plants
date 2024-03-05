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
            <img class="" src="../assets/static/home/plant_${i}.png" alt="home plant">
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
            <div class="carousel-image-container flex-grow-1 overflow-hidden position-relative">
                <img class="object-fit-cover " src="../assets/static/collection/plant_${
                  i % 3
                }.svg" alt="plant">
                <img class="object-fit-cover position-absolute start-0 top-0 w-100 h-100" src="../assets/static/collection/wrap_plant_${
                  i % 3
                }.png" alt="plant">
            </div>
            <h4 class="fw-semibold m-0 d-flex align-items-center ">Bird of paradise
            </h4>
        </div>
    </div>
    `;
}

// change slide according to the current page

const totalHomeCarouselItem = 5;
for (let i = 0; i < totalHomeCarouselItem; i++) {
  homeCarouselContainer.insertAdjacentHTML("beforeend", createCarouselCard(i));
  homeCarouselSlider.insertAdjacentHTML("beforeend", createSliderSpan(i));
}
let currentHomeCarouselItem = 0;

// for carousel movement
const displayCarouselItem = (
  carouselItems,
  translateFactor,
  totalCarouselItem,
  currentCarouselItem,
  translateY = true
) => {
  for (let i = 0; i < totalCarouselItem; i++) {
    const currentItem = carouselItems[i];

    currentItem.style.translate = `${
      (+currentItem.dataset.id - currentCarouselItem) * translateFactor
    }% ${translateY ? "-50%" : ""}`;
    // currentItem.style.transform = `translateX(${(+currentItem.dataset.id - currentCarouselItem) * translateFactor
    //     }%) ${translateY ? "translateY(-50%)" : ""}`;

    currentItem.classList.remove("active");

    if (!translateY) continue;

    if (i < currentCarouselItem) currentItem.style.opacity = 0;
    else currentItem.style.opacity = 1;
  }

  if (translateY) carouselItems[currentCarouselItem].classList.add("active");
};

const updateCurrentSlide = (choice, currentSlide, totalSlide) => {
  switch (choice) {
    case "left":
      if (+currentSlide === 0) currentSlide = totalSlide - 1;
      else currentSlide--;
      break;
    case "right":
      if (+currentSlide === +totalSlide - 1) currentSlide = 0;
      else currentSlide++;
      break;
  }
  return currentSlide;
};

const removeActiveClasses = (container, currentSlide) =>
  [...container.children].forEach((el) =>
    +el.dataset.id === +currentSlide
      ? el.classList.add("active")
      : el.classList.remove("active")
  );

// for home carousel
const setHomeSliderActiveAndChangeNumber = () => {
  removeActiveClasses(homeCarouselSlider, currentHomeCarouselItem);
  homeTextCarouselPrev.textContent =
    +currentHomeCarouselItem === 0
      ? totalHomeCarouselItem
      : +currentHomeCarouselItem;
  homeTextCarouselNext.textContent =
    +currentHomeCarouselItem === totalHomeCarouselItem - 1
      ? 1
      : +currentHomeCarouselItem + 2;
};

const changeHomeSlide = (choice, toUpdateCurrentSlide = true) => {
  if (toUpdateCurrentSlide)
    currentHomeCarouselItem = updateCurrentSlide(
      choice,
      currentHomeCarouselItem,
      totalHomeCarouselItem
    );

  displayCarouselItem(
    homeCarouselContainer.children,
    window.innerWidth >= 768 ? 90 : 100,
    totalHomeCarouselItem,
    currentHomeCarouselItem
  );

  setHomeSliderActiveAndChangeNumber();
};

btnHomeCarouselLeft.addEventListener("click", () => changeHomeSlide("left"));
btnHomeCarouselRight.addEventListener("click", () => changeHomeSlide("right"));
homeCarouselSlider.addEventListener("click", (e) => {
  currentHomeCarouselItem = e.target.dataset.id;
  changeHomeSlide("", false);
});

//////////////////////////////////////////
//////////////////////////////////////////
// for collection carousel
const totalCollectionCarouselItem = 6;
let currentCollectionCarouselItem = 0;
for (let i = 0; i < totalCollectionCarouselItem; i++) {
  collectionCarouselContainer.insertAdjacentHTML(
    "beforeend",
    createCollectionCarouselCard(i)
  );
}

const changeCollectionSlide = (choice) => {
  currentCollectionCarouselItem = updateCurrentSlide(
    choice,
    currentCollectionCarouselItem,
    totalCollectionCarouselItem
  );

  displayCarouselItem(
    collectionCarouselContainer.children,
    100,
    totalCollectionCarouselItem,
    currentCollectionCarouselItem,
    false
  );
};

collectionCarouselButtonsContainer.addEventListener("click", (e) => {
  if (!e.target.closest("button")) return;

  if (e.target.classList.contains("btn-collection-prev")) {
    changeCollectionSlide("left");
  }
  if (e.target.classList.contains("btn-collection-next")) {
    changeCollectionSlide("right");
  }
});

//////////////////////////////
//////////////////////////////
//////////Client Carousel///////////////
let currentClientCarouselItem = 0;
const totalClientCarousalItem = 3;
const carouselMediumButtons = document.querySelectorAll(
  ".clients-button-wrapper button"
);
console.log(carouselMediumButtons);
const clientCarouselContainer = document.querySelector(
  ".clients-carousel-container"
);
const clientCarouselWrapper = document.querySelector(
  ".clients-carousel-container>.carousel-wrapper"
);

let isInitialDone = false,
  isMedium = window.innerWidth >= 768;
clientCarouselContainer.addEventListener("click", (e) => {
  const btn = e.target.closest(".client-carousel-button");
  if (!btn) return;

  if (btn.classList.contains("prev")) {
    currentClientCarouselItem =
      (currentClientCarouselItem + totalClientCarousalItem - 1) %
      totalClientCarousalItem;
  } else {
    currentClientCarouselItem =
      (currentClientCarouselItem + 1) % totalClientCarousalItem;
  }

  let translationFactor = isMedium ? 0 : currentClientCarouselItem * 100;

  if (isMedium) {
    if (!currentClientCarouselItem) {
      console.log(currentClientCarouselItem);
      translationFactor = 0;
    } else translationFactor = 45 + (currentClientCarouselItem - 1) * 65;

    console.log(currentClientCarouselItem);
    carouselMediumButtons.forEach((el, i) => {
      if (i < currentClientCarouselItem) {
        el.classList.remove("next");
        el.classList.add("prev");
      } else {
        el.classList.remove("prev");
        el.classList.add("next");
      }
    });
  }

  clientCarouselWrapper.style.transform = `translateX(-${translationFactor}%)`;
});
// IIFE
(function () {
  displayCarouselItem(
    homeCarouselContainer.children,
    window.innerWidth >= 768 ? 90 : 100,
    totalHomeCarouselItem,
    currentHomeCarouselItem
  );
  setHomeSliderActiveAndChangeNumber();
  displayCarouselItem(
    collectionCarouselContainer.children,
    100,
    totalCollectionCarouselItem,
    currentCollectionCarouselItem,
    false
  );
})();
