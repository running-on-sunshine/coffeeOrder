let coffeeOrderForm = document.querySelector('.coffee-order-form');
let ordersList = document.querySelector('.orders-list');
let orders = [];
let url = 'https://dc-coffeerun.herokuapp.com/api/coffeeorders';

let retrieveOrders = ()  => {
    orders = [];
    fetch(url).then((data) => {
        data.json().then((data) => {
            for (key in data) {
                orders.push(data[key]);
            }
            displayOrders();
        });
    });
};
retrieveOrders();

let addOrder = (newOrder) => {
    fetch(url, {
        method: "post",
        body: JSON.stringify(newOrder),
        headers: {
            "Content-Type": "application/json",
        }
    }).then(() => {
        retrieveOrders();
    });
};

let removeOrder = (order) => {
    fetch(url + "/" + order.emailAddress, {
        method: "delete",
    }).then(() => {
        retrieveOrders();
    });
};

let clearDisplay = () => {
    let orderScreen = document.querySelectorAll('.orders-container');
    orderScreen.forEach((item) => {
        item.remove();
    })
};

let displayOrders = () => {
    clearDisplay();
    orders.forEach((order) => {
        ordersList.appendChild(ordersSummaryContainer(order));
    })
};

let ordersSummaryContainer= (order) => {
    let ordersContainer = document.createElement('div');
    ordersContainer.classList.add('orders-container');

    ordersContainer.appendChild(orderSummary(order));
    ordersContainer.appendChild(buildButton(order));

    return ordersContainer;
};

let buildButton = (order) => {
    let buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    let completeButton = document.createElement('button');
    completeButton.setAttribute('type', 'submit');
    completeButton.classList.add('complete-button');
    completeButton.textContent = 'Order Completed!';
    completeButton.addEventListener('click', () => {
        this.parentElement.parentElement.classList.add('order-completed');
        this.remove();
        setTimeout(() => {
            removeOrder(order);
        }, 2000);
    });

    buttonContainer.appendChild(completeButton);
    
    return buttonContainer;
};

let orderSummary = (order) => {
    let coffeeOrder = `${order.coffee}, ${order.emailAddress}, ${order.size}, ${order.flavor}, ${order.strength}`;

    let row = document.createElement('div');
    row.classList.add('coffee-order');
    row.textContent = coffeeOrder;

    return row;
};

coffeeOrderForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let coffee = document.querySelector('[name="coffee"]');
    let email = document.querySelector('[name="emailAddress"]');
    let flavor = document.querySelector('[name="flavor"]');
    let strength = document.querySelector('[name="strength"]');
    let size = document.querySelector('[name="size"]:checked');

    let newOrder = {
        "coffee": coffee.value,
        "emailAddress": email.value,
        "flavor": flavor.value,
        "strength": strength.value,
        "size": size.value,
    };

    addOrder(newOrder);
});