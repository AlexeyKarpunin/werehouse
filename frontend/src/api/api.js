

export const getGoods = () => fetch('/api/items/', {method: 'GET'});

export const createItem = (name) => fetch('/api/items/',{
  method: 'POST',
  headers: {'Content-Type':'Application/json'},
  body: JSON.stringify({name: name})
})
