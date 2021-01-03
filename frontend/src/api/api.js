

export const getGoods = () => fetch('/api/items/', {method: 'GET'});

export const createItem = (name) => fetch('/api/items/',{
  method: 'POST',
  headers: {'Content-Type':'Application/json'},
  body: JSON.stringify({name: name})
})

export const updateItemsAmount = (basket, info) => fetch('/api/items/update-amount', {
  method: 'PUT',
  headers: {'Content-Type': 'Application/json'},
  body: JSON.stringify({basket: basket, info: info})
});
