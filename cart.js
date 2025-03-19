// cart.js
class Cart {
    static KEY = 'sewaltee_cart';
    
    static init() {
      if(!localStorage.getItem(Cart.KEY)) {
        localStorage.setItem(Cart.KEY, JSON.stringify([]));
      }
      Cart.updateCounter();
    }
  
    static getItems() {
      return JSON.parse(localStorage.getItem(Cart.KEY)) || [];
    }
  
    static addItem(product, quantity = 1) {
      const items = Cart.getItems();
      const existing = items.find(item => item.id === product.id);
      
      if(existing) {
        existing.quantity += quantity;
      } else {
        items.push({...product, quantity: quantity});
      }
      
      localStorage.setItem(Cart.KEY, JSON.stringify(items));
      Cart.updateCounter();
      updateCartDisplay();
    }
  
    static adjustQuantity(productId, amount) {
      const items = Cart.getItems();
      const itemIndex = items.findIndex(item => item.id === productId);
      
      if(itemIndex > -1) {
        items[itemIndex].quantity += amount;
        
        if(items[itemIndex].quantity < 1) {
          items.splice(itemIndex, 1);
        }
        
        localStorage.setItem(Cart.KEY, JSON.stringify(items));
        Cart.updateCounter();
        updateCartDisplay();
      }
    }
  
    static updateCounter() {
      const count = Cart.getItems().reduce((acc, item) => acc + item.quantity, 0);
      document.querySelectorAll('.cart-counter').forEach(el => {
        el.textContent = count;
      });
    }
  
    static getTotal() {
      return Cart.getItems().reduce((total, item) => {
        const price = parseFloat(item.price.replace('€', ''));
        return total + (price * item.quantity);
      }, 0);
    }
  }
  
  // Initialize cart when page loads
  document.addEventListener('DOMContentLoaded', () => {
    Cart.init();
    updateCartDisplay();
  });
  
  // Handle cart interactions
  document.addEventListener('click', (e) => {
    if(e.target.closest('.add-to-cart:not(.buy-now), .add-product-to-cart')) {
      const button = e.target.closest('button');
      const product = JSON.parse(button.dataset.product);
      Cart.addItem(product);
      
      if(button.classList.contains('add-product-to-cart')) {
        button.classList.add('clicked');
        setTimeout(() => button.classList.remove('clicked'), 1000);
      }
    }
    
    if(e.target.closest('.buy-now')) {
      const button = e.target.closest('.buy-now');
      const product = JSON.parse(button.dataset.product);
      Cart.addItem(product, 1);
      window.location.href = 'cart.html';
    }
    
    if(e.target.closest('.quantity-controls button')) {
      const button = e.target.closest('button');
      const productId = parseInt(button.dataset.id);
      const isIncrease = button.classList.contains('increase-quantity');
      Cart.adjustQuantity(productId, isIncrease ? 1 : -1);
    }
  });
  
  // Update cart display
  function updateCartDisplay() {
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    
    if(container) {
      container.innerHTML = Cart.getItems().map(item => {
        const price = parseFloat(item.price.replace('€', ''));
        const total = price * item.quantity;
        
        return `
          <div class="cart-item">
            <a href="${item.url}" class="cart-item-link">
              <img src="${item.image}" alt="${item.name2}" class="cart-item-image">
            </a>
            <div class="cart-item-info">
              <a href="${item.url}" class="cart-item-link">
                <h3>${item.name1} ${item.name2}</h3>
              </a>
              <p>€${total.toFixed(2)}</p>
            </div>
            <div class="quantity-controls">
              <button class="decrease-quantity" data-id="${item.id}" aria-label="Reduce quantity">
                <i class="fas fa-minus"></i>
              </button>
              <span class="quantity">${item.quantity}</span>
              <button class="increase-quantity" data-id="${item.id}" aria-label="Increase quantity">
                <i class="fas fa-plus"></i>
              </button>
            </div>
          </div>
        `;
      }).join('');
  
      if(totalEl) {
        totalEl.textContent = `€${Cart.getTotal().toFixed(2)}`;
      }
    }
  }
  
  // Sync across tabs
  window.addEventListener('storage', () => {
    Cart.updateCounter();
    updateCartDisplay();
  });