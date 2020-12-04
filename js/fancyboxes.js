$('[data-fancybox-reward]').fancybox({
  clickContent: false,
  buttons: [
    "close"
  ],
});


if ($(window).width() <= 575) {
  $('[data-fancybox-photo]').fancybox({
    clickContent: false,
    buttons: [
      "close"
    ],
  });
}
