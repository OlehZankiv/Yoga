function slider() {

  let slideIndex = 1,
    slides = document.querySelectorAll(".slider-item"),
    prev = document.querySelector(".prev"),
    next = document.querySelector(".next"),
    dotsWrap = document.querySelector(".slider-dots"),
    dots = document.querySelectorAll(".dot");

  showSlides();

  function showSlides() {
    if (slideIndex > slides.length) {
      slideIndex = 1;
    } else if (slideIndex < 1) {
      slideIndex = slides.length;
    }

    slides.forEach((item) => {
      item.style.display = "none";
    });
    dots.forEach((item) => {
      item.classList.remove("dot-active");
    });

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].classList.add("dot-active");
  }

  dotsWrap.addEventListener("click", (event) => {
    dots.forEach((item, i) => {
      if (event.target == item) {
        slideIndex = i + 1;
        showSlides();
      }
    });
  });

  next.addEventListener("click", () => {
    slideIndex++;
    showSlides();
  });

  prev.addEventListener("click", () => {
    slideIndex--;
    showSlides();
  });
}

module.exports = slider;