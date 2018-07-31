var coffee = document.querySelector('[name="coffee"]');
var email = document.querySelector('[name="emailAddress"]');
var flavorShot = document.querySelector('[name="flavor"]');
var strengthLevel = document.querySelector('[name="strength"]');
var incomingOrders = document.querySelector('.incomingOrders');

var orders = [];

var createOrder = function() {
    var row = document.createElement('div');
    row.classList.add('coffeeOrder');
    var size = document.querySelector('[name="size"]:checked');
    var coffeeOrder = `${coffee.value}, email: ${email.value}, ${size.value}, ${flavorShot.value}, ${strengthLevel.value}`;
    row.textContent = coffeeOrder;
    orders.push(coffeeOrder);

    var orderCompletedSection = document.createElement('div');
    orderCompletedSection.classList.add('orderCompletedSection');

    var createButton = function () {
        var completeButton = document.createElement('button');
        completeButton.setAttribute('type', 'submit');
        completeButton.classList.add('completeButton')
        completeButton.textContent = 'Order Completed!';
        orderCompletedSection.appendChild(completeButton);
        completeButton.addEventListener('click', removeOrder);
    };

    var saveOrder = function () {
        localStorage.setItem('coffee-orders', JSON.stringify(orders));
    };

    var removeOrder = function () {
        incomingOrders.removeChild(row);
    }

    row.appendChild(orderCompletedSection);
    incomingOrders.appendChild(row);

    createButton();
    saveOrder();
};

var coffeeOrderForm = document.querySelector('.coffeeOrderForm');

coffeeOrderForm.addEventListener('submit', function(event) {
    event.preventDefault();
    createOrder();
});

// var retrieveOrder = function () {
//     var orderString = localStorage.getItem('coffee-orders');
//     orders = JSON.parse(orderString);
//     for (var i = 0; i < orders.length; i++) {
//         createOrder(orders[i]);
//     }
// };