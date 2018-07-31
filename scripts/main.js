var orders = [];

var saveOrder = function () {
    localStorage.setItem('coffee-orders', JSON.stringify(orders));
};

var createOrder = function() {
    var orderCompletedSection = document.createElement('div');
    orderCompletedSection.classList.add('orderCompletedSection');

    var checkOrders = [];

    var coffee = document.querySelector('[name="coffee"]');
    var email = document.querySelector('[name="emailAddress"]');
    var flavorShot = document.querySelector('[name="flavor"]');
    var strengthLevel = document.querySelector('[name="strength"]');
    var size = document.querySelector('[name="size"]:checked');
    var incomingOrders = document.querySelector('.incomingOrders');
    var coffeeOrder = `${coffee.value}, email: ${email.value}, ${size.value}, ${flavorShot.value}, ${strengthLevel.value}`;

    var row = document.createElement('div');
    row.classList.add('coffeeOrder');
    row.textContent = coffeeOrder;
    orders.push(coffeeOrder);

    var createButton = function () {
        var completeButton = document.createElement('button');
        completeButton.setAttribute('type', 'submit');
        completeButton.classList.add('completeButton')
        completeButton.textContent = 'Order Completed!';
        orderCompletedSection.appendChild(completeButton);
        completeButton.addEventListener('click', removeOrder);
    };

    var removeOrder = function () {
        incomingOrders.removeChild(row);
        orders.forEach(function (order) {
            if (order !== coffeeOrder) {
                checkOrders.push(order);
            }
        })
        orders = checkOrders;
        saveOrder(orders);
    };

    row.appendChild(orderCompletedSection);
    incomingOrders.appendChild(row);

    createButton();

};

var coffeeOrderForm = document.querySelector('.coffeeOrderForm');

coffeeOrderForm.addEventListener('submit', function(event) {
    event.preventDefault();
    createOrder();
    saveOrder();
});

// var displayOrder = function () {
//     for (var i = 0; i < orders.length; i++) {
//         console.log(orders[i]);
//         coffeeOrderString = orders[i];
//         row.appendChild(coffeeOrderString);
//         incomingOrders.appendChild(row);
// };

// var retrieveOrder = function () {
//     var orderString = localStorage.getItem('coffee-orders');
//     if (orderString !== null) {
//         orders = JSON.parse(orderString);
//         console.log(orders);
//         displayOrder();
//         }
//     }
// };