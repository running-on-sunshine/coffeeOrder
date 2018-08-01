var coffeeOrderForm = document.querySelector('.coffeeOrderForm');
var incomingOrders = document.querySelector('.incomingOrders');
var orders = [];
var url = 'https://dc-coffeerun.herokuapp.com/api/coffeeorders';

var retrieveOrders = function () {
    orders = []
    $.ajax(url, {
        success: function (data) {
            for (key in data) {
                orders.push(data[key]);
            }
            displayOrders();
        }
    })
};

retrieveOrders();

var addOrder = function (newOrder) {
    $.ajax(url, {
        method: 'POST', 
        data: newOrder,
        success: function () {
            retrieveOrders();
        }
    })
};

var removeOrder = function (order) {
    $.ajax(url + "/" + order.emailAddress, {
        method: 'DELETE',
        success: function () {
            retrieveOrders();
        }
    })
};

var clearDisplay = function () {
    var orderScreen = document.querySelectorAll('.orders-container');
    orderScreen.forEach(function (item) {
        item.remove();
    })
};

var displayOrders = function () {
    clearDisplay();
    orders.forEach(function (order) {
        incomingOrders.appendChild(ordersSummaryContainer(order));
    })
};

var ordersSummaryContainer= function (order) {
    var ordersContainer = document.createElement('div');
    ordersContainer.classList.add('orders-container');

    ordersContainer.appendChild(orderSummary(order));
    ordersContainer.appendChild(buildButton(order));

    return ordersContainer;
};

var buildButton = function (order) {
    var buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    var completeButton = document.createElement('button');
    completeButton.setAttribute('type', 'submit');
    completeButton.classList.add('complete-button')
    completeButton.textContent = 'Order Completed!';
    completeButton.addEventListener('click', function(){
        this.parentElement.parentElement.classList.add('order-completed');
        this.remove();
        setTimeout(function() {
            removeOrder(order);
        }, 2000);
    });

    buttonContainer.appendChild(completeButton);
    
    return buttonContainer;
};

var orderSummary = function (order) {
    var coffeeOrder = `${order.coffee}, ${order.emailAddress}, ${order.size}, ${order.flavor}, ${order.strength}`;

    var row = document.createElement('div');
    row.classList.add('coffee-order');
    row.textContent = coffeeOrder;

    return row;
};

coffeeOrderForm.addEventListener('submit', function(event) {
    event.preventDefault();
    var coffee = document.querySelector('[name="coffee"]');
    var email = document.querySelector('[name="emailAddress"]');
    var flavor = document.querySelector('[name="flavor"]');
    var strength = document.querySelector('[name="strength"]');
    var size = document.querySelector('[name="size"]:checked');

    var newOrder = {
        "coffee": coffee.value,
        "emailAddress": email.value,
        "flavor": flavor.value,
        "strength": strength.value,
        "size": size.value,
    };

    addOrder(newOrder);
});