(function() {
  'use strict';

  $('.button-collapse').sideNav();

  const items = [];
  const $tbody = $('tbody');
  const $subtotal = $('#subtotal');
  const $tax = $('#tax');
  const $total = $('#total');

  const renderOrder = function() {
    let subtotal = 0;
    let tax;
    let total;
    let $tr;
    let $tdName;
    let $tdPrice;

    $tbody.empty();

    for (const item of items) {
      $tr = $('<tr>');
      $tdName = $('<td>');
      $tdPrice = $('<td>');

      $tdName.text(item.name);
      $tdPrice.text(`$${item.price.toFixed(2)}`);
      $tdPrice.addClass('right-align');

      $tr.append($tdName);
      $tr.append($tdPrice);
      $tbody.append($tr);

      subtotal += item.price;
    }

    tax = subtotal * 0.1;
    total = subtotal + tax;

    $subtotal.text(`$${subtotal.toFixed(2)}`)
    $tax.text(`$${tax.toFixed(2)}`)
    $total.text(`$${total.toFixed(2)}`)
  }

  renderOrder();

  $('.addItem').on('click', (event) => {
    const item = {};
    const $target = $(event.target);
    const $cardContent = $target.parent().siblings('.card-content');

    item.name = $cardContent.children('.card-title').text();
    item.price = parseFloat($cardContent.children('p').text().slice(1));

    items.push(item);

    renderOrder();

    event.preventDefault();
  });

  $('#name, #phone_number, #address').on('blur', (event) => {
    const $target = $(event.target);
    const value = $target.val();

    if (value.length === 0) {
      $target.removeClass('valid');
      $target.removeClass('invalid');
    }
    else if (value.trim() === '') {
      $target.removeClass('valid');
      $target.addClass('invalid');
    }
    else {
      $target.removeClass('invalid');
      $target.addClass('valid');
    }
  });

  $('#placeOrder').on('click', (event) => {
    if (items.length === 0) {
      Materialize.toast('Please add an item to your order.', 4000);
      return;
    }

    const $name = $('#name');
    const $phoneNumber = $('#phone_number');
    const $address = $('#address');

    if ($name.val().trim() === '') {
      Materialize.toast('Please type a name.', 4000);
      return;
    }

    if ($phoneNumber.val().trim() === '') {
      Materialize.toast('Please type a phone number.', 4000);
      return;
    }

    if ($address.val().trim() === '') {
      Materialize.toast('Please type an address.', 4000);
      return;
    }

    Materialize.toast('Order placed. Thank you!', 4000);

    event.preventDefault();
  })
})();
