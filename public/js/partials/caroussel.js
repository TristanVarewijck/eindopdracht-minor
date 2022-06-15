const swiper1 = new Swiper(".swiper-1", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  breakpoints: {
    400: {
      slidesPerView: 1,
      spaceBetweenSlides: 100,
    },
    499: {
      slidesPerView: 3,
      spaceBetweenSlides: 100,
    },
    999: {
      slidesPerView: 5,
      spaceBetweenSlides: 50,
    },
  },
  // If we need pagination
  pagination: {
    el: ".swiper-pagination1",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next1",
    prevEl: ".swiper-button-prev1",
  },
});

export { swiper1 };
