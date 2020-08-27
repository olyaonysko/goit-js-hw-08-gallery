import images from "./gallery-items.js";
const refs = {
  gallery: document.querySelector(".js-gallery"),
  lightbox: document.querySelector(".js-lightbox"),
  lightboxImage: document.querySelector(".lightbox__image"),
  button: document.querySelector('[data-action="close-lightbox"]'),
  index: document.querySelector('[data-action="index"]'),
};

let currentImage = 0;

const createMarkup = images.map((image, index) => {
  const { preview, original, description } = image;
  const listItemRef = document.createElement("li");
  const linkRef = document.createElement("a");
  const imgRef = document.createElement("img");

  listItemRef.classList.add("gallery__item");
  linkRef.classList.add("gallery__link");
  linkRef.href = original;

  imgRef.classList.add("gallery__image");
  imgRef.src = preview;
  imgRef.dataset.source = original;
  imgRef.alt = description;
  imgRef.dataset.index = index;

  listItemRef.appendChild(linkRef);
  linkRef.appendChild(imgRef);
  return listItemRef;
});

refs.gallery.append(...createMarkup);
const listItemsArray = createMarkup;

function onClickHandler(event) {
  event.preventDefault();
  if (event.target.nodeName === "IMG") {
    window.addEventListener("keydown", onEscapeHandler);
    refs.lightbox.classList.add("is-open");
    refs.lightbox.querySelector(".lightbox__image").src =
      event.target.dataset.source;
    refs.lightbox.querySelector(".lightbox__image").alt = event.target.alt;
    currentImage = event.target.dataset.index;
  }
}

function onCloseHandler() {
  window.removeEventListener("keydown", onEscapeHandler);
  refs.lightbox.classList.remove("is-open");
  refs.lightboxImage.src = "";
}

function onEscapeHandler(event) {
  if (event.code === "Escape") onCloseHandler();
  if (event.code === "ArrowLeft") prevImage();
  if (event.code === "ArrowRight") nextImage();
}

function onBackDropHandler(event) {
  if (event.target !== refs.lightboxImage) {
    onCloseHandler();
  }
}

function prevImage() {
  if (currentImage > 0) {
    currentImage -= 1;
    refs.lightboxImage.src = images[currentImage].original;
    refs.lightboxImage.alt = images[currentImage].description;
  }
}

function nextImage() {
  if (currentImage < listItemsArray.length - 1) {
    currentImage += 1;
    refs.lightboxImage.src = images[currentImage].original;
    refs.lightboxImage.alt = images[currentImage].description;
  }
}

refs.gallery.addEventListener("click", onClickHandler);
refs.lightbox.addEventListener("click", onBackDropHandler);
refs.button.addEventListener("click", onCloseHandler);
