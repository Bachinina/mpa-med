$(document).ready(function () {

  $('[data-range-line]').each(function () {
    const input = $(this).find('[data-range-line-input]');
    const slider = $(this).find('[data-range-line-slider]');
    const result = $(this).find('[data-range-line-hidden]');

    const saveResult = function (value) {
      result.val(value);
      onParamsChange();
    };


    let reloadSliderOnInputChange = function () {
      slider.data("ionRangeSlider").update({
        to: input.val()
      });
      saveResult(input.val());
    };

    // Если есть форматирование данных
    if (input.data('with-mask')) {
      // Инициализация поля ввода и связка его со слайдером
      input.inputmask();
      reloadSliderOnInputChange = function () {
        const currentValue = input.inputmask('unmaskedvalue').slice(0, -3);
        // const formated = parseFloat(currentValue);
        slider.data("ionRangeSlider").update({
          to: currentValue
        });
        saveResult(currentValue);
      };

      // Инициализация слайдера и связка его с полем ввода
      slider.ionRangeSlider({
        onStart: function (data) {
          input.inputmask("setvalue", data.to);
          // saveResult(data.to);
        },
        onChange: $.debounce(20, function (data) {
          input.inputmask("setvalue", data.to);
          saveResult(data.to);
        })
      });

      input.on('change', reloadSliderOnInputChange);
    }
    // Если нет форматирования данных
    else {
      let min = parseFloat(input.prop('min'));
      min = min == min ? min : 0;
      const max = parseFloat(input.prop('max'));

      // Проверка вводимых данных
      const onValidateProps = function () {
        let value = parseFloat(input.val());

        if (value < min) {
          value = min;
        } else if (value > max) {
          value = max;
        } else if (isNaN(value)) {
          value = min;
        }
        input.val(value);
        saveResult(value);
      };

      const onValidatePropsDiap = function () {
        let value = parseFloat(input.val());

        if (value < min) {
          value = value;
          saveResult(min);

        } else if (value > max) {
          value = max;
          saveResult(value);
        } else if (isNaN(value)) {
          value = 0;
          saveResult(min);
        }
        input.val(value);
      };

      input.on('input', function () {
        if (typeof input.attr('data-input-diap') === "undefined") {
          onValidateProps();
        } else {
          onValidatePropsDiap();
        }

      });

      input.on('change', reloadSliderOnInputChange);


      slider.ionRangeSlider({
        onStart: function (data) {
          input.val(data.to);
          // saveResult(data.to);
        },
        onChange: function (data) {
          input.val(data.to);
          saveResult(data.to);
        }
      });
    }
    // input.on('change', reloadSliderOnInputChange);
    input.on('keydown', function (evt) {
      if (evt.keyCode === 13) {
        $(this).blur();
        reloadSliderOnInputChange();
      }
    });
    input.on('blur', function () {
      setTimeout(function () {
        reloadSliderOnInputChange();
      }, 0);
    });
  });


  // Функция для написания логики калькулятора
  var onParamsChange = function () {
    const price = $('#calc-price').val();
    const percent = $('#calc-per').val();
    const month = $('#calc-month').val();
    console.log(price, percent, month);
  };

});
