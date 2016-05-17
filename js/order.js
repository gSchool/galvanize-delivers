(function() {
  'use strict';

  $('.button-collapse').sideNav();

  var items = [];
  var $tbody = $('tbody');
  var $subtotal = $('#subtotal');
  var $tax = $('#tax');
  var $total = $('#total');

  var renderOrder = function() {
    var subtotal = 0;
    var tax;
    var total;
    var $tr;
    var $tdName;
    var $tdPrice;


    $tbody.empty();

    for (var item of items) {
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

  $('.addItem').on('click', function(event) {
    var item = {};
    var $target = $(event.target);
    var $cardContent = $target.parent().siblings('.card-content');

    item.name = $cardContent.children('.card-title').text();
    item.price = parseFloat($cardContent.children('p').text().slice(1));

    items.push(item);

    renderOrder();

    event.preventDefault();
  });

  $('#name, #phone_number, #address').on('blur', function(event) {
    var $target = $(event.target);
    var value = $target.val();

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

  $('#placeOrder').on('click', function(event) {
    if (items.length === 0) {
      Materialize.toast('Please add an item to your order.', 4000);
      return;
    }

    var $name = $('#name');
    var $phoneNumber = $('#phone_number');
    var $address = $('#address');

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
