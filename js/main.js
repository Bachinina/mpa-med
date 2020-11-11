$(document).ready(function () {
  // HEADER
  (function () {
    const NavClasses = {
      nav: '#navbar-menu',
      dropdown: '.dropdown',
      toggle: '.dropdown__toggle',
      dropdownMenu: '.dropdown__menu',
    }

    const nav = document.querySelector(NavClasses.nav);
    const dropdowns = nav.querySelectorAll(NavClasses.dropdown);


    if (dropdowns.length > 0) {
      let isDropdownMenuOpen = false;

      dropdowns.forEach((dropdown) => {
        const toggle = dropdown.querySelector(NavClasses.toggle);
        const dropdownMenu = dropdown.querySelector(NavClasses.dropdownMenu);

        const openDropdownMenu = (evt) => {
          evt.stopPropagation();

          // Check if dropdown is opened --------
          if (isDropdownMenuOpen) {
            dropdowns.forEach((el) => {
              if (el !== dropdown) {
                el.classList.remove('show');
              }
            })
            isDropdownMenuOpen = false;
          }
          // -------------------------------------


          // Open current ------------------------
          dropdown.classList.toggle('show');

          if (dropdown.classList.contains('show')) {
            isDropdownMenuOpen = true;
            document.addEventListener('click', onDocumentClick);
            document.addEventListener('keydown', onEscKeydown);
          } else {
            closeDropdownMenu();
          }
        }

        const closeDropdownMenu = () => {
          dropdown.classList.remove('show');
          document.removeEventListener('click', onDocumentClick);
          document.removeEventListener('keydown', onEscKeydown);
          isDropdownMenuOpen = false;
          toggle.blur();


          if (dropdown.classList.contains('big')) {
            const items = dropdown.querySelectorAll('.dropdown__item');
            items.forEach(function (el, index) {
              if (index === 0) {
                el.classList.add('show');
              } else {
                el.classList.remove('show');
              }
            })
          }
        }

        const onDocumentClick = (evt) => {
          if (evt.target !== toggle &&
            evt.target !== dropdownMenu &&
            !dropdownMenu.contains(evt.target)
          ) {
            closeDropdownMenu();
          }
        }

        const onEscKeydown = (evt) => {
          if (evt.keyCode === 27) {
            closeDropdownMenu();
          }
        }


        toggle.addEventListener('click', openDropdownMenu);
      })
    }
  })();



  $('.dropdown:not(.big) .dropdown-hover').each(function () {
    const wrap = $(this);
    const drop = $(this).children('.dropdown__menu-hover');
    const link = $(this).children('.dropdown__link');

    function showDrop(evt) {
      link.addClass('show');
      drop.addClass('show');
    }

    function hideDrop() {
      link.removeClass('show');
      drop.removeClass('show');
    }

    wrap.on('mouseover', showDrop);
    wrap.on('mouseout', hideDrop);
    wrap.on('focusin', showDrop);
    wrap.on('focusout', hideDrop);
  });


  $('.dropdown.big').each(function () {
    const el = $(this);
    const items = el.find('.dropdown__item');


    items.each(function () {
      $(this).on('mouseover', function () {
        items.not($(this)).removeClass('show');
        $(this).addClass('show');
      });
      $(this).on('focusin', function () {
        items.not($(this)).removeClass('show');
        $(this).addClass('show');
      });
    });
  });


  // TABS
  $('[data-tabs]').each(function () {
    const tabToggles = $(this).find('[data-tabs-toggle]');
    const content = $(`[data-tabs-content='${$(this).attr('data-tabs')}']`);

    let activeTab = 0;

    tabToggles.each(function (i) {
      if ($(this).hasClass('active')) {
        activeTab = i;
      }

      $(this).on('click', function (e) {
        e.preventDefault();

        const tabContent = $(content).find(`[data-tabs-item='${$(this).attr('data-tabs-toggle')}']`);

        // DEL ACTIVE CLASS
        tabToggles.not($(this)).removeClass('active');
        content.find('[data-tabs-item]').removeClass('active');

        // ADD ACTIVE CLASS
        $(this).addClass('active');
        $(tabContent).addClass('active');
      });
    });
    tabToggles[activeTab].click();
  });


  // ACCORDION
  $(`.acc__title`).on('click', function () {
    const acc = $(this).closest('.acc');
    if (acc.hasClass('one')) {
      acc.find(`.acc__title`).not($(this)).removeClass('active');
      acc.find(`.acc__body`).not($(this).next()).slideUp(500);
    }

    if ($(this).hasClass('active')) {
      $(this).trigger('blur');
    }

    $(this).toggleClass('active');
    if ($(this).hasClass('active')) {
      $(this).next().slideDown(500);
    } else {
      $(this).next().slideUp(500);
    }
  });

  $('.acc__title.active').next().slideDown(0);


  // SCROLL MOBILE
  const scrolledBlocks = $('[data-scroll-wrap]');
  const addScrollingProps = function () {
    scrolledBlocks.each(function () {
      const container = $(this).find('[data-scroll]');
      const parent = $(this).closest('[data-scroll-container]');
      const width = parent.width();

      container.addClass('scroll-mobile');
      $(this).addClass('scroll-mobile-wrap');

      container.css({
        'padding-left': `${(($(window).width() - width) / 2 - 15)}px`,
      });

      parent.height('auto');
      parent.height(parent.height() + container.height());
    });
  };

  if (scrolledBlocks.length > 0) {
    if ($(window).width() <= 767) {
      addScrollingProps();
    }

    $(window).on('resize', function () {
      scrolledBlocks.each(function () {
        if ($(window).width() <= 767) {
          addScrollingProps();
        } else {
          const container = $(this).find('[data-scroll]');
          const parent = $(this).closest('[data-scroll-container]');

          if (container.hasClass('scroll-mobile')) {
            container.removeClass('scroll-mobile');
            $(this).removeClass('scroll-mobile-wrap');
            container.css({
              'padding-left': '0',
            });

            parent.height('auto');
          }
        }
      });
    });
  }


  // SCROLL ANCHOR
  $("a[href^='#']").on("click", function (e) {
    var fixed_offset = 35;
    $('html,body').stop().animate({
      scrollTop: $(this.hash).offset().top - fixed_offset
    }, 1000);
    e.preventDefault();
    return false;
  });


  // RANGE
  $('[data-range]').each(function () {
    const value = $(this).attr('data-range-value');
    const items = $(this).find('[data-range-item]');

    items.each(function (i) {
      if (i < value) {
        $(this).addClass('active');
      }
    })
  });

  // RANGE SELECT
  $('[data-range-select]').each(function () {
    let selectedValue = '';

    const items = $(this).find('[data-range-item]');
    const input = $($(this).attr('data-range-input'));

    function onRangeMouseover(range) {
      items.removeClass('active');
      items.each(function (i) {
        if (i <= range) {
          $(this).addClass('active');
        }
      });
    };

    function onRangeMouseout() {
      items.removeClass('active');
    };

    function onRangeClick() {
      items.removeClass('active');
      items.each(function (i) {
        if (i < selectedValue) {
          $(this).addClass('active');
        }
      });

      input.val(selectedValue);
    };


    items.each(function (i) {
      $(this).on('mouseover', function () {
        onRangeMouseover(i);
      });
      $(this).on('mouseout', onRangeMouseout);

      $(this).on('click', function () {
        selectedValue = $(this).attr('data-range-value');

        // DEL EVENT LISTENERS
        items.each(function () {
          $(this).off('mouseover');
          $(this).off('mouseout');
        });
        $(this).addClass('active');

        onRangeClick();
      });
    })
  });

  // FORM
  // FILE
  $('input[type="file"]').change(function () {
    let fileNames = [];
    for (let i = 0; i < $(this).get(0).files.length; ++i) {
      let name = $(this).get(0).files[i].name;

      if (name.length > 25) {
        const lastIndexOf = name.indexOf('.', 0);
        const type = name.substr(lastIndexOf);

        name = `${name.substr(0, 25)}...${type}`;
      }
      fileNames.push(name);
    }

    const result = fileNames.join(", ");
    // $(this).next().text(`Выбрано файлов: ${fileNames.length}`);

    if (result.length > 0) {
      $(this).next().text(result);
    } else {
      const placeholder = $(this).next().attr('data-placeholder');
      $(this).next().text(placeholder);
    }
  });

  // SELECT CUSTOM
  $('select').on('change', function () {
    $(this).trigger('blur');
  });


  // MODAL
  // MODAL OPENING
  $('[data-modal]').on('click', function () {
    $($(this).attr('data-modal')).addClass('active');
  });
  // MODAL CLOSING

  $('.modal').each(function () {
    const modalCloseBtn = $(this).find('[data-modal-close]');

    const closeModalByClick = (evt) => {
      if (evt.target.classList.contains('modal')) {
        closeModal();
      }
    };

    const closeModalByEsc = (evt) => {
      if (evt.keyCode === 27) {
        closeModal();
      }
    };

    const closeModal = () => {
      $(this).removeClass('active');


      const form = $(this).find('form');
      if (form) {
        // CLEAR FORM
        form.trigger("reset");

        const ranges = form.find('[data-range-select]');
        if (ranges.length) {
          ranges.each(function () {
            const items = $(this).find('[data-range-item]');
            items.each(function (i) {
              $(this).removeClass('active');
              $(this).off('mouseover');
              $(this).off('mouseout');

              function onRangeMouseover(range) {
                items.removeClass('active');
                items.each(function (i) {
                  if (i <= range) {
                    $(this).addClass('active');
                  }
                });
              };

              function onRangeMouseout() {
                items.removeClass('active');
              };

              $(this).on('mouseover', function () {
                onRangeMouseover(i);
              });
              $(this).on('mouseout', onRangeMouseout);
            });
          });

          form.find('[data-range-result]').each(function () {
            $(this).val(0);
          });
        }

        // CLEAR FIELDS
        const fieldsToClear = $(this).find('[data-filled]');
        if (fieldsToClear.length) {
          fieldsToClear.each(function () {
            $(this).text('');
          });
        }

        // CLEAR LABEL OF FILE INPUT
        const fileInputLabels = $(this).find('input[type="file"] + label');
        if (fileInputLabels.length) {
          fileInputLabels.each(function () {
            const placeholder = $(this).attr('data-placeholder');
            $(this).text(placeholder);
          })
        }
      };
    };

    $(this).on('click', closeModalByClick);
    modalCloseBtn.on('click', closeModal);
    $(document).on('keydown', closeModalByEsc);
  });



  //MODAL --VACANCY
  $('.vacancy__btn').on('click', function () {
    const id = $(this).closest('.vacancy__item').attr('data-vacancy-id');
    const title = $(this).closest('.vacancy__item').attr('data-vacancy-title');

    const inputId = $('#vacancy-id');
    const inputTitle = $('#vacancy-title');

    inputId.attr('value', id);
    inputTitle.text(title);
  });


  (function ($) {
    let numbers = $('.number');
    if (numbers.length > 0) {
      numbers.counterUp({
        time: 1000
      });
    }
  })(jQuery);

  // SHOW MORE
  $('[data-show-more]').on('click', function () {
    $($(this).attr('data-show-more')).slideDown(500);
    $(this).remove();
  });


  // PARALLAX
  const pd = $('#parallax-doc');
  if (pd.length) {
    let block_show = null;
    const l1 = pd.find('.layer-1');
    const l2 = pd.find('.layer-2');

    const l1StartYPos = 115;
    const l2StartYPos = 230;

    const l1FinishYPos = 170;
    const l2FinishYPos = 180;


    function scrollTracking() {
      var wt = $(window).scrollTop();
      var wh = $(window).height();
      var et = pd.offset().top;
      var eh = pd.outerHeight();

      if (wt + wh >= et && wt + wh - eh * 2 <= et + (wh - eh)) {
        if (block_show == null || block_show == false) {
          $(window).bind('mousewheel', function (event) {
            if (event.originalEvent.wheelDelta >= 0) {
              parallaxEffUp();
            } else {
              parallaxEffDown();
            }
          });
        }
        block_show = true;
      } else {
        // if (block_show == null || block_show == true) {

        // }
        block_show = false;
      }
    };


    function parallaxEffUp() {
      l1.css({
        'transform': `translateY(${l1StartYPos}px)`,
      });
      l2.css({
        'transform': `translateY(${l2StartYPos}px)`,
      });
    };

    function parallaxEffDown() {
      l1.css({
        'transform': `translateY(${l1FinishYPos}px)`,
      });
      l2.css({
        'transform': `translateY(${l2FinishYPos}px)`,
      });
    };

    $(window).scroll(function () {
      scrollTracking();
    });

    $(document).ready(function () {
      scrollTracking();
    });
  };




  // SCROLLING 
  const header = $('.header');
  const headerMapHeight = header.find('.header__map').height();
  const headerNav = header.find('.header__nav');
  let isHeaderFixed = false;

  const onWindowChange = function () {
    if ($(window).width() <= 1199) {
      if ($(this).scrollTop() >= headerMapHeight) {
        $('main').css({
          'padding-top': headerNav.height()
        });
        headerNav.addClass('fixed');
        isHeaderFixed = true;

      } else {
        headerNav.removeClass('fixed');
        isHeaderFixed = false;
        $('main').css({
          'padding-top': 0
        });
      }
    }
  }
  $(window).on('scroll', onWindowChange);

  // LIST DROP
  $('[data-list-drop]').each(function () {
    const list = $(this);
    const toggle = list.find('[data-list-item].active');
    const items = list.find('[data-list-item]:not(.active)');

    const onDocumentClick = function (evt) {
      if (evt.target !== list &&
        list.children(evt.target).length > 0) {
        list.removeClass('show');
        $(document).off('click', onDocumentClick);
        $(document).off('scroll', onDocumentScroll);
      }
    };

    const onDocumentScroll = function (evt) {
      list.removeClass('show');
      $(document).off('click', onDocumentClick);
      $(document).off('scroll', onDocumentScroll);
    };


    toggle.on('click', function (evt) {
      evt.stopPropagation();
      list.toggleClass('show');

      if (list.hasClass('show')) {
        $(document).on('click', onDocumentClick);
        $(document).on('scroll', onDocumentScroll);
      } else {
        $(document).off('click', onDocumentClick);
        $(document).off('scroll', onDocumentScroll);
      }
    });

    items.each(function (i) {
      $(this).css({
        top: `calc(100% - 5px + 35px * ${i})`
      })
    });
  });



  // MOBILE NAV
  const navMobile = $('[data-nav-mobile]');
  const list = navMobile.find('> [data-nav-links]');
  const categories = list.find('[data-nav-link]');

  let activelistHeight = 0;


  // SET HEIGHT
  let isHeightSet = false;
  const setHeight = function () {
    // MAX HEIGHT FOR LINKS
    const pxToTop = list.offset().top - $(window).scrollTop();
    const pxToBottom = $('.navbar__bottom').outerHeight();
    const windowHeight = $(window).height();
    const maxHeight = windowHeight - pxToTop - pxToBottom - 15;
    activelistHeight = maxHeight;

    $('.navbar__nav').css({
      'max-height': maxHeight
    });
    list.height(maxHeight);
    isHeightSet = true;
  };

  const resetHeight = function () {
    isHeightSet = false;
  };


  const calcHeightOnResize = function () {
    resetHeight();
    setHeight();
    $('[data-nav-links]').height(activelistHeight);
  };



  // OPEN & CLOSE
  const toggleBtn = $('[data-toggle-nav]');
  toggleBtn.on('click', function () {
    $('[data-nav-links].active').scrollTop(0);
    $('.header__nav').toggleClass('active');
    if (!isHeaderFixed) {
      $('.header__nav').addClass('fixed');
    }
    if (!isHeightSet) {
      setHeight();
    }

    if (!$('.header__nav').hasClass('active')) {
      if (!isHeaderFixed) {
        $('.header__nav').removeClass('fixed');
      }
      resetMobileLinks();
      $('body').css({
        'overflow': 'auto'
      });
      $(window).off('resize', calcHeightOnResize);
      $('.header__nav').off('resize', calcHeightOnResize);
    } else {
      $('body').css({
        'overflow': 'hidden'
      });
      $(window).on('resize', calcHeightOnResize);
      $('.header__nav').on('resize', calcHeightOnResize);
    }
  });


  // MOBILE LINKs 
  categories.each(function () {
    const openBtn = $(this).find(' > [data-nav-control] > button');
    const links = $(this).find(' > [data-nav-links]');
    const goBackBtn = links.find('> [data-nav-back] > button');

    openBtn.on('click', function () {
      links.removeClass('hidden');
      links.addClass('active');
      links.parent().closest('[data-nav-links]').scrollTop(0).addClass('moved-out');
      links.height(activelistHeight);
    });

    goBackBtn.on('click', function () {
      links.addClass('hidden');
      links.removeClass('active');
      links.scrollTop(0);
      links.parent().closest('[data-nav-links]').scrollTop(0).removeClass('moved-out');
      links.height('auto');
    });
  })


  function resetMobileLinks() {
    categories.each(function () {
      const links = $(this).find(' > [data-nav-links]');
      links.parent().closest('[data-nav-links]').removeClass('moved-out');

      links.addClass('hidden');
      links.removeClass('active');
      links.height('auto');
      resetHeight();
    })
  };
});
