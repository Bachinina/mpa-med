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
        }

        const onDocumentClick = (evt) => {
          if (evt.target !== toggle
            && evt.target !== dropdownMenu
            && !dropdownMenu.contains(evt.target)
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

  // ACCORDION
  $(`.acc__title`).on('click', function () {
    if ($(this).closest('.acc').hasClass('one')) {
      $(`.acc__title`).not($(this)).removeClass('active');
      $(`.acc__text`).not($(this).next()).slideUp(500);
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



  // SCROLL ANCHOR
  $("a[href^='#']").on("click", function(e){
    var fixed_offset = 35;
    $('html,body').stop().animate({
      scrollTop: $(this.hash).offset().top - fixed_offset
    }, 1000);
    e.preventDefault();
    return false;
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
  (function () {
    const modals = document.querySelectorAll('.modal');
    if (modals.length > 0) {
      modals.forEach((modal) => {
        const modalCloseBtn = modal.querySelector('.modal__close');

        const closeModalByClick = (evt) => {
          if (evt.target === modal) {
            closeModal();
          }
        };

        const closeModalByEsc = (evt) => {
          if (evt.keyCode === 27) {
            closeModal();
          }
        };

        const closeModal = () => {
          modal.classList.remove('active');


          const form = modal.querySelector('form');
          if (form) {
            // CLEAR FORM
            form.reset();

            // CLEAR FIELDS
            const fieldsToClear = modal.querySelectorAll('[data-filled]');
            if (fieldsToClear.length > 0) {
              fieldsToClear.forEach((field) => {
                field.textContent = '';
              });
            }

            // CLEAR LABEL OF FILE INPUT
            const fileInputLabels = form.querySelectorAll('input[type="file"] + label');
            if (fileInputLabels.length > 0) {
              fileInputLabels.forEach((label) => {
                const placeholder = label.getAttribute('data-placeholder');
                label.textContent = placeholder;
              })
            }
          }
        };

        modal.addEventListener('click', closeModalByClick);
        modalCloseBtn.addEventListener('click', closeModal);
        document.addEventListener('keydown', closeModalByEsc);
      });
    }
  })();

  //MODAL --VACANCY
  $('.vacancy__btn').on('click', function () {
    const id = $(this).closest('.vacancy__item').attr('data-vacancy-id');
    const title = $(this).closest('.vacancy__item').attr('data-vacancy-title');

    const inputId = $('#vacancy-id');
    const inputTitle = $('#vacancy-title');

    inputId.attr('value', id);
    inputTitle.text(title);
  });
});

