$(document).ready(function () {
  // SLIDERS
  const screenWidth = $(document).width();
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

  const mainSlider = $('[data-main-slider]');
  const timer = mainSlider.parent().find('[data-slider-timer]');
  let timerWidth = 0;

  mainSlider.slick({
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
    responsive: [{
      breakpoint: 1199,
      settings: {
        draggable: true,
      }
    }]
  });

  if (timer.length > 0) {
    timerWidth = 100 * 1 / mainSlider.find('.slick-slide').length;
    timer.width(`calc(${timerWidth}% + 2px)`);
  }

  mainSlider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    timerWidth = 100 * (nextSlide + 1) / $(this).find('.slick-slide').length;
    timer.width(`calc(${timerWidth}% + 2px)`);
  });


  $('[data-simple-slider]').each(function () {
    const simpleSlider = $(this);
    simpleSlider.countOfSlides = 0;
    if (screenWidth > 1199) {
      simpleSlider.countOfSlides = 4;
    } else if (screenWidth <= 1199 && screenWidth > 991) {
      simpleSlider.countOfSlides = 4;
    } else if (screenWidth <= 991 && screenWidth > 767) {
      simpleSlider.countOfSlides = 3;
    } else {
      simpleSlider.countOfSlides = 2
    }

    simpleSlider.slick({
      arrows: true,
      infinite: false,
      slidesToShow: simpleSlider.countOfSlides,
      speed: 800,
      waitForAnimate: true,
      customPaging: 50,
      accessibility: false,
      draggable: false,
      margin: 30,
    });
  });

  $('[data-price]').each(function () {
    const priceSlider = $(this).find('[data-price-slider]');
    const containerForBtns = $(this).find('[data-slider-btns]');
    priceSlider.countOfSlides = 0;
    const realCountOfSlides = priceSlider.children().length;
    if (screenWidth > 1199) {
      priceSlider.countOfSlides = 4;
    } else if (screenWidth <= 1199 && screenWidth > 991) {
      priceSlider.countOfSlides = 3;
    } else if (screenWidth <= 991 && screenWidth > 767) {
      priceSlider.countOfSlides = 2;
    } else {
      priceSlider.countOfSlides = 1
    }

    if (realCountOfSlides > priceSlider.countOfSlides) {
      priceSlider.slick({
        arrows: true,
        infinite: false,
        slidesToShow: priceSlider.countOfSlides,
        speed: 800,
        waitForAnimate: true,
        customPaging: 50,
        accessibility: false,
        draggable: false,
        appendArrows: containerForBtns
      });
    } else {
      priceSlider.children().width(`calc(100% / ${realCountOfSlides})`)
    }
  });

  $('[data-reviews]').each(function () {
    const reviewSlider = $(this).find('[data-reviews-slider]');
    const containerForBtns = $(this).find('[data-slider-btns]');
    reviewSlider.countOfSlides = 0;
    if (screenWidth > 1199) {
      reviewSlider.countOfSlides = 2;
    } else {
      reviewSlider.countOfSlides = 1
    }


    reviewSlider.slick({
      arrows: true,
      infinite: false,
      slidesToShow: reviewSlider.countOfSlides,
      speed: 800,
      waitForAnimate: true,
      customPaging: 50,
      customPaging: 24,
      accessibility: false,
      draggable: false,
      appendArrows: containerForBtns,
    });
  });


  $('[data-auto-slider]').slick({
    arrows: true,
    speed: 1200,
    slidesToShow: 4,
    slidesToScroll: 1,
    touchTreshold: 30,
    autoplay: true,
    autoplaySpeed: 3000,
    accessibility: false,
    swipeToSlide: true,
    responsive: [{
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          arrows: true,

        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          speed: 800,
          arrows: false,
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          speed: 500,
          arrows: false,
          autoplay: true,
          autoplaySpeed: 4000,

        }
      }
    ]
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


  const chronologies = $('[data-chronology]');

  chronologies.each(function () {
    const chronology = $(this);
    const chronologyProgress = chronology.find('[data-chronology-progress]');
    const chronologySlider = chronology.find('[data-chronology-slider]');
    const slides = chronologySlider.find('.chronology__item');
    const realCountOfSlides = slides.length;

    const containerForBtns = chronology.find('[data-slider-btns]');
    chronologySlider.countOfSlides = 0;

    if (screenWidth > 1199) {
      chronologySlider.countOfSlides = 4;
    } else if (screenWidth <= 1199 && screenWidth > 991) {
      chronologySlider.countOfSlides = 3;
    } else if (screenWidth <= 991 && screenWidth > 575) {
      chronologySlider.countOfSlides = 2;
    } else {
      chronologySlider.countOfSlides = 1
    }

    const isEnding = chronologySlider.attr('data-chronology-end') === 'true' ?
      true : false
    chronologySlider.isEnding = isEnding;


    if (realCountOfSlides <= chronologySlider.countOfSlides && realCountOfSlides !== 1) {
      const widthOfProgressBar = 100 / chronologySlider.countOfSlides * (realCountOfSlides - 1);
      chronologyProgress.width(`calc(${widthOfProgressBar}% + 40px)`);
    }


    chronologySlider.slick({
      arrows: true,
      infinite: false,
      slidesToShow: chronologySlider.countOfSlides,
      speed: 600,
      waitForAnimate: true,
      customPaging: 50,
      accessibility: false,
      draggable: false,
      appendArrows: containerForBtns,
      focusOnSelect: false,
      touchMove: false,
    });


    chronologySlider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {

      if (nextSlide === 0) {
        chronologyProgress.addClass('start')
        chronologyProgress.removeClass('middle')
        chronologyProgress.removeClass('end')
      } else if (nextSlide === $(this).find('.slick-slide').length - chronologySlider.countOfSlides) {
        if (chronologySlider.isEnding) {
          chronologyProgress.addClass('end'); // end
          chronologyProgress.removeClass('middle');
          chronologyProgress.removeClass('start');
        }
      } else {
        chronologyProgress.addClass('middle');
        chronologyProgress.removeClass('start');
        chronologyProgress.removeClass('end');
      }
    });
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
    responsive: [{
        breakpoint: 1199,
        settings: {
          speed: 1200,
          focusOnSelect: false,
          touchMove: false,
        }
      },
      {
        breakpoint: 767,
        settings: {
          speed: 800,
          focusOnSelect: false,
          touchMove: false,
        }
      }
    ]
  });

  centredSlider.find('.slick-slide').on('click', function (evt) {
    if ($(this)[0] === centredSlider.find('.slick-active').next()[0]) {
      centredSlider.slick('slickNext');
    }
    if ($(this)[0] === centredSlider.find('.slick-active').prev()[0]) {
      centredSlider.slick('slickPrev');
    }
  });

  const doubleSliders = $('[data-double-slider]');
  doubleSliders.each(function () {
    const doubleSlider = $(this);
    let slideCount = doubleSlider.attr('data-slide-count');
    const parentSlider = doubleSlider.find('[data-parent-slider]');
    const childSlider = doubleSlider.find('[data-child-slider]');
    const isChildStatic = slideCount <= 4;

    if (slideCount <= 4) {
      childSlider.addClass('non-transform');
    } else {
      slideCount = 4;
    }

    parentSlider.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: childSlider,
      draggable: false,
      infinite: !isChildStatic,
    });


    parentSlider.on('click', function () {
      parentSlider.slick('slickNext');
    });

    childSlider.slick({
      slidesToShow: slideCount,
      slidesToScroll: 1,
      arrows: true,
      asNavFor: parentSlider,
      focusOnSelect: true,
      draggable: false,
      touchMove: false,
      infinite: !isChildStatic,
      variableWidth: isChildStatic,
      focusOnSelect: true,
    });
  })

});
