$('ul').on('click', 'li', function () {
  $(this).toggleClass('completed');

  /* $(this).css('color', 'gray');
  $(this).css('text-decoration', 'line-through'); */
});

$('ul').on('click', 'span', function (event) {
  // removing entire li - parent of span
  $(this)
    .parent()
    .fadeOut(500, function () {
      $(this).remove();
    });
  // event bubbling prevention via event: class completed is not firing up
  event.stopPropagation();
});

$("input[type='text']").keypress(function (event) {
  if (event.which === 13) {
    let todoText = $(this).val();
    $(this).val('');
    $('ul').append('<li><span><i class="far fa-trash-alt"></i></span> ' + todoText + '</li>');
  }
});

$('.fa-plus').click(function () {
  $("input[type='text']").fadeToggle();
});
