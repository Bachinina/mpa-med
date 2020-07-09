$(document).ready(function () {
  // SLIDERS
  const prevArrow = '<button class="slider-counter__btn slider-counter__btn--prev" type="button" aria-label="Предыдущий слайд"><span></span></button>';
  const nextArrow = '<button class="slider-counter__btn slider-counter__btn--next" type="button" aria-label="Следующий слайд"><span></span></button>';

  const counter = function (slider, i) {
    const current = i + 1;
    const total = slider.slideCount;

    return (
      `<span class="current">${current}</span>/
      <span class="total">${total}</span>`
    );
  };

  $('#info-slider').slick({
    appendArrows: $('#info-slider').closest('.slider-counter').find('.slider-counter__btns'),
    appendDots: $('#info-slider').closest('.slider-counter').find('.slider-counter__counter'),
    fade: true,
    speed: 2000,
    draggable: false,
    waitForAnimate: false,
    prevArrow: prevArrow,
    nextArrow: nextArrow,
    dots: true,
    autoplay: true,
    autoplaySpeed: 4500,
    customPaging: counter,
  });


  $('#brands-slider').slick({
    arrows: false,
    speed: 1500,
    slidesToShow: 4,
    slidesToScroll: 1,
    touchTreshold: 30,
    autoplay: true,
    autoplaySpeed: 4500,
  });

  $('#projects-slider').slick({
    appendArrows: $('#projects-slider').closest('.slider-counter').find('.slider-counter__btns'),
    appendDots: $('#projects-slider').closest('.slider-counter').find('.slider-counter__counter'),
    fade: true,
    speed: 2000,
    waitForAnimate: false,
    dots: true,
    prevArrow: prevArrow,
    nextArrow: nextArrow,
    customPaging: counter,
  });
});
