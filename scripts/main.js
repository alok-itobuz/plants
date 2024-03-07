//scroll animation
const allSections = document.querySelectorAll("section");
allSections.forEach((section, i) => {
  i % 2 === 0
    ? section.classList.add("left-translate")
    : section.classList.add("right-translate");

  i % 2 === 0
    ? (section.dataset.classTranslate = "left-translate")
    : (section.dataset.classTranslate = "right-translate");
});

const removeSectionTranslation = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.remove(entry.target.dataset.classTranslate);
      observer.unobserve(entry.target);
    }
  });
};

const sectionObserver = new IntersectionObserver(removeSectionTranslation, {
  root: null,
  rootMargin: `-${
    document.querySelector("nav").getBoundingClientRect().height
  }px`,
  threshold: 0.1,
});
allSections.forEach((section) => sectionObserver.observe(section));

////////////

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
      i === 0 ? "active" : ""
    }" data-id=${i}>
        <div class="home-carousel-body position-relative h-100 w-100 overflow-hidden ">
            <img class="" src="./assets/static/home/plant_${i}.png" alt="home plant">
            <span class="position-absolute text-uppercase ">PILEA PEPEROMIOIDES</span>
        </div>
    </div>`;
};

function createSliderSpan(i) {
  return `<span class="home-carousel-slider-span h-100  border-0 ${
    i === 0 ? "active" : ""
  }" data-id=${i}>
    </span>`;
}

function createCollectionCarouselCard(i) {
  return `
    <div class="collection-carousel-item h-100 w-100 position-absolute p-1 p-md-2 p-lg-3 " data-id=${i}>
        <div class="carousel-item-body h-100 w-100 d-flex flex-column">
            <div class="carousel-image-container flex-grow-1 overflow-hidden position-relative">
                <img class="object-fit-cover " src="./assets/static/collection/plant_${
                  i % 3
                }.svg" alt="plant">
                <img class="object-fit-cover position-absolute start-0 top-0 w-100 h-100" src="./assets/static/collection/wrap_plant_${
                  i % 3
                }.png" alt="plant">
            </div>
            <h4 class="fw-semibold m-0 d-flex align-items-center ">Bird of paradise
            </h4>
        </div>
    </div>
    `;
}

function createClientButtonWrapper() {
  return `
    <div class="clients-button-wrapper d-none d-md-flex flex-column align-items-center justify-content-center">
        <button
            class="client-carousel-button d-none d-md-flex justify-content-center align-items-center rounded-circle">
            <img class="h-100 w-100" src="./assets/static/clients/arrow_right.svg" alt="right arrow" />
        </button>
    </div>
  `;
}

function createClientCard(i) {
  return `
    <div
        class="client-carousel-item ${
          i === 0 ? "active" : ""
        } h-100 w-100 position-relative d-flex flex-column flex-md-row justify-content-around align-items-center p-4">
        <div class="client-image rounded-circle overflow-hidden">
            <img class="h-100 w-100" src="./assets/static/clients/client_${i}.svg" alt="" />
        </div>
        <div class="client-description ${
          i === 0 ? "active" : ""
        } d-flex flex-column justify-content-center position-relative w-100">
            <span class="d-inline-flex align-items-center justify-content-center  double-quotes"><img
                                class="h-100 w-100 " src="./assets/static/clients/double_quotes.png" alt=""></span>
            <p class="fw-normal m-0">
                1It is a long established fact that a reader will be distracted
                by the readable content of a page when It is a long .It is a
                long .It is a long established fact that a reader will be . It
                is a long established fact that a reader .
            </p>
            <span class="d-inline-flex align-items-center justify-content-center  double-quotes position-absolute"><img
                                class="h-100 w-100 " src="./assets/static/clients/double_quotes.png" alt=""></span>
        </div>
        <button
            class="prev client-carousel-button d-flex d-md-none position-absolute justify-content-center align-items-center rounded-circle">
            <img src="./assets/static/clients/arrow_right.svg" alt="right arrow" />
        </button>
        <button
            class="next client-carousel-button d-flex d-md-none position-absolute justify-content-center align-items-center rounded-circle">
            <img src="./assets/static/clients/arrow_right.svg" alt="right arrow" />
        </button>
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

const clientCarouselContainer = document.querySelector(
  ".clients-carousel-container"
);
const clientCarouselWrapper = document.querySelector(
  ".clients-carousel-container>.carousel-wrapper"
);
for (let i = 0; i < totalClientCarousalItem; i++) {
  if (i > 0)
    clientCarouselWrapper.insertAdjacentHTML(
      "beforeend",
      createClientButtonWrapper()
    );
  clientCarouselWrapper.insertAdjacentHTML("beforeend", createClientCard(i));
}
const carouselMediumButtons = document.querySelectorAll(
  ".clients-button-wrapper button"
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
      translationFactor = 0;
    } else translationFactor = 45 + (currentClientCarouselItem - 1) * 65;

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
  const items = clientCarouselWrapper.querySelectorAll(".client-carousel-item");
  const descriptions = clientCarouselWrapper.querySelectorAll(
    ".client-carousel-item .client-description"
  );
  items.forEach((item, i) => {
    if (i === currentClientCarouselItem) {
      item.classList.add("active");
      descriptions[i].classList.add("active");
    } else {
      item.classList.remove("active");
      descriptions[i].classList.remove("active");
    }
  });
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
