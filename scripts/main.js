var coffee = document.querySelector('[name="coffee"]');
var email = document.querySelector('[name="emailAddress"]');
var flavorShot = document.querySelector('[name="flavor"]');
var strengthLevel = document.querySelector('[name="strength"]');
var incomingOrders = document.querySelector('.incomingOrders');

var coffeeOrderForm = document.querySelector('.coffeeOrderForm');
coffeeOrderForm.addEventListener('submit', function(event) {
    event.preventDefault();

    var size = document.querySelector('[name="size"]:checked');
    var coffeeOrder = `${coffee.value}, ${size.value}, ${flavorShot.value}, ${strengthLevel.value}`;
    var coffeeOrderContact = `${email.value}`;

    var row;
    var customerOrder;
    var completeOrderSection;
    var completeCheckbox;
    var completeButton;
    var orders = [];
    
    var createOrder = function() {
        row = document.createElement('div');
        row.classList.add('customerOrder');
        row.textContent = `Coffee Order: ${coffeeOrder} | Contact: ${coffeeOrderContact}`;
        customerOrder = `coffee: ${coffee.value}, email: ${email.value}, size: ${size.value}, flavor: ${flavorShot.value}, strength: ${strengthLevel.value}`;
        orders.push(customerOrder);

        completeOrderSection = document.createElement('div');
        completeOrderSection.classList.add('completeOrderSection');
        
        completeCheckbox = document.createElement('input');
        completeCheckbox.setAttribute('type', 'checkbox');

        completeButton = document.createElement('button');
        completeButton.setAttribute('type', 'submit');
        completeButton.classList.add('submitButton')
        completeButton.textContent = 'Order Completed!';

        completeOrderSection.appendChild(completeCheckbox);
        completeOrderSection.appendChild(completeButton);
        row.appendChild(completeOrderSection);
        incomingOrders.appendChild(row);
    }

    var updateOrder = function () {
        localStorage.setItem('coffee-orders', JSON.stringify(orders));
    };

    createOrder();
    updateOrder();
    
});