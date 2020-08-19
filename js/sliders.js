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

  $('[data-main-slider]').slick({
    appendArrows: $('[data-main-slider]').closest('.slider-counter').find('.slider-counter__btns'),
    appendDots: $('[data-main-slider]').closest('.slider-counter').find('.slider-counter__counter'),
    fade: true,
    speed: 1100,
    draggable: false,
    waitForAnimate: true,
    lazyLoad: 'ondemand',
    prevArrow: prevArrow,
    nextArrow: nextArrow,
    dots: true,
    autoplay: true,
    autoplaySpeed: 5000,
    customPaging: counter,
  });

  $('[data-simple-slider]').slick({
    arrows: true,
    infinite: false,
    slidesToShow: 4,
    speed: 800,
    waitForAnimate: true,
    customPaging: 50,
  });


  $('[data-auto-slider]').slick({
    arrows: false,
    speed: 1500,
    slidesToShow: 4,
    slidesToScroll: 1,
    touchTreshold: 30,
    autoplay: true,
    autoplaySpeed: 3000,
  });

  $('[data-desc-slider]').slick({
    appendArrows: $('[data-desc-slider]').closest('.slider-counter').find('.slider-counter__btns'),
    appendDots: $('[data-desc-slider]').closest('.slider-counter').find('.slider-counter__counter'),
    fade: true,
    speed: 800,
    waitForAnimate: true,
    dots: true,
    prevArrow: prevArrow,
    nextArrow: nextArrow,
    customPaging: counter,
  });


  const centredSlider = $('[data-center-slider]');
  centredSlider.slick({
    arrows: false,
    centerMode: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    waitForAnimate: true,
    initialSlide: 1,
  });

  centredSlider.on('beforeChange', function () {
    const iframe = centredSlider.find('iframe');

    if(iframe) {
      iframe[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
    }
    centredSlider.find('.custom-video').get(0).pause();
  });


  centredSlider.find('.slick-slide').on('click', function() {
    if($(this)[0] === centredSlider.find('.slick-active').next()[0]) {
      centredSlider.slick('slickNext');
    }
    if($(this)[0] === centredSlider.find('.slick-active').prev()[0]) {
      centredSlider.slick('slickPrev');
    }
  })
});
