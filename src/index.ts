type Pizza = {
  id: number;
  name: string;
  price: number;
};

type Order = {
  id: number;
  pizza: Pizza;
  status: "Ordered" | "Completed";
};

let cashInRegister: number = 100;
let nextPizzaId: number = 1;
let nextOrderId: number = 1;
const orderQueue: Order[] = [];

const menu: Pizza[] = [
  { id: nextPizzaId++, name: "Margherita", price: 8 },
  { id: nextPizzaId++, name: "Pepperoni", price: 10 },
  { id: nextPizzaId++, name: "Hawaiian", price: 10 },
  { id: nextPizzaId++, name: "Veggie", price: 9 },
];

function addNewPizza(pizzaObj: Omit<Pizza, "id">): Pizza {
  const newPizza: Pizza = {
    id: nextPizzaId++,
    ...pizzaObj,
  };
  menu.push(newPizza);
  return newPizza;
}

function placeOrder(pizzaName: string): Order | undefined {
  const selectedPizza = menu.find(
    (pizzaObj: Pizza) => pizzaObj.name === pizzaName
  );
  if (!selectedPizza) {
    console.error(`${pizzaName} does not exist in the menu`);
    return;
  }
  cashInRegister += selectedPizza.price;
  const newOrder: Order = {
    id: nextOrderId++,
    pizza: selectedPizza,
    status: "Ordered",
  };
  orderQueue.push(newOrder);
  return newOrder;
}

function completeOrder(orderId: number): Order | undefined {
  const order = orderQueue.find((order) => order.id === orderId);
  if (!order) {
    console.error(`${orderId} was not found in the orderQueue`);
    return;
  }
  order.status = "Completed";
  return order;
}

export function getPizzaDetail(
  identifier: string | number
): Pizza | string | undefined {
  if (typeof identifier === "string") {
    return menu.find(
      (pizza) => pizza.name.toLowerCase() === identifier.toLowerCase()
    );
  } else if (typeof identifier === "number") {
    return menu.find((pizza) => pizza.id === identifier);
  } else {
    return "Parameter `identifier` must be either a string or a number";
  }
}

function getLastItem<T>(items: T[]): T | undefined {
  return items[items.length - 1];
}

addNewPizza({ name: "Chicken Bacon Ranch", price: 12 });
addNewPizza({ name: "BBQ Chicken", price: 12 });
addNewPizza({ name: "Spicy Sausage", price: 11 });

placeOrder("Chicken Bacon Ranch");
completeOrder(1);

console.log("Menu:", menu);
console.log("Cash In Register:", cashInRegister);
console.log("Order Queue:", orderQueue);

console.log(getLastItem<Pizza>(menu));
console.log(getLastItem<Order>(orderQueue));
