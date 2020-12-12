import React from 'react';
import './css/app.css';

const messages = {
  SERVER__ERROR: 'server error',
}

const enums = {
  basket: 'myProducts',
}

class App extends React.Component {
  constructor () {
    super();
    this.state = {
      load: false,
      items: [],
      basket: 0,
      addProductMenuFlag: false,
    }
    this.newItem = React.createRef();
    this.tableRender = this.tableRender.bind(this);
    this.buy = this.buy.bind(this);
    this.yourGoodsRender = this.yourGoodsRender.bind(this);
    this.addNewProduct = this.addNewProduct.bind(this);
    this.doOrder = this.doOrder.bind(this);
  }
  componentDidMount () {
    const getItems = fetch('/api/items/',{method:'GET'});

    getItems.then( (res) => res.json() )
    .then( (data) => {
      this.setState({
              load: true,
              items: data,
        });
    })
    .then( () => console.log(this.state))

    .catch( () => {this.setState({load: messages.SERVER__ERROR})});
  }

  tableRender () {
    const {load, items} = this.state;
    if (load === messages.SERVER__ERROR) return <div>SERVER ERROR</div>

    if (!load) {
      return <div>Loading...</div>
    } else {
      return (
        <div className="product__table">
          {
          items.map((item, index) => {
            return (
              <div onClick={this.buy} className="product__list" index={index}>
                <div className="product__item">
                  <div className="item--name">{item.name}</div>
                  <button className="item--btn--buy">buy</button>
                </div>
              </div>
            );
          })
          }
        </div>
      );
    }
  }

  buy(e) {
    const target = e.target;
    const currentTarget = e.currentTarget;

    if (!target.classList.contains('item--btn--buy')) return;

    if (!localStorage.getItem(enums.basket)) {
      localStorage.setItem(enums.basket, "[]");
    } 

    const localBasket = JSON.parse(localStorage.getItem(enums.basket));
    const productName = currentTarget.querySelector('.item--name').innerHTML;
    const itemId = parseInt(currentTarget.getAttribute('index')) + 1;

    if (localBasket.length > 0) {
      for (let i = 0; i < localBasket.length; i++) {
        if (localBasket[i].name === productName) {
          localBasket[i].amount += 1;
          localStorage.setItem(enums.basket, JSON.stringify(localBasket));
          this.setState( (state) => {
            return {basket: state.basket + 1}
          })
          return;
        }
      }
    }
    this.setState( (state) => {return {basket: state.basket + 1}})

    localBasket.push({name: productName, amount: 1, itemId: itemId});
    localStorage.setItem(enums.basket, JSON.stringify(localBasket));
  }

  yourGoodsRender() {
    if (!localStorage.getItem(enums.basket)) localStorage.setItem(enums.basket, "[]");
    const localBasket = JSON.parse(localStorage.getItem(enums.basket));

    if (localBasket.length < 1) return <div>You have not goods</div>
    return (
      <div className="product__table">
        {
          localBasket.map ( (item, index) => {
            return (
              <div className="product__list" index={index}>
                <div className="product__item">
                  <div className="item--name">{item.name}</div>
                  <div className="item--amount">{item.amount}</div>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }

  addNewProduct() {
    const name = this.newItem.current.value;

    fetch('/api/items/',{
      method: 'POST',
      headers: {'Content-Type':'Application/json'},
      body: JSON.stringify({name: name})
    })
    .then( () => {
      fetch('/api/items/',{method:'GET'})
           .then( (res) => res.json())
           .then( (data) => {
            this.setState({
                    items: data,
              });
          });
    })
  }

  doOrder () {
    const {basket} = this.state;
    const items = localStorage.getItem(enums.basket);
    fetch('/api/log/',{
      method: 'POST', 
      headers: {'Content-Type':'Application/json'}, 
      body: JSON.stringify({items: items}),
    }).then( () => {
      localStorage.clear();
    })
    .then(() => this.setState( (state) => {return {basket: state.basket + 1}}));
  }

  render() {
    return (
       <section className="product__section">
         <div className="product__container">
             <h1>Products</h1>
             {this.tableRender()}
             <div>
               <input ref={this.newItem}  type="text" size="20" maxlength="18" placeholder="item's name"></input><button onClick={this.addNewProduct} className="product--btn--add--new">add new product</button>
             </div>
         </div>
         <div className="product__basket">
             <h1>Your goods</h1>
             {this.yourGoodsRender()}
             <button onClick={this.doOrder}>do order</button>
         </div>
       </section>
    );
  }
}

export default App;
