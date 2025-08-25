document.addEventListener('DOMContentLoaded', () => {
  const productGrid = document.getElementById('productGrid');
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const checkoutForm = document.getElementById('checkoutForm');
  const modal = document.getElementById('modal');
  const modalMessage = document.getElementById('modalMessage');
  const modalClose = document.getElementById('modalClose');

  let products = [];
  let cart = [];

  const showModal = (message) => {
    modalMessage.textContent = message;
    modal.classList.remove('hidden');
  };
  modalClose.onclick = () => modal.classList.add('hidden');

  const updateCart = () => {
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name} x ${item.qty} - $${(item.price * item.qty).toFixed(2)}`;
      cartItems.appendChild(li);
      total += item.price * item.qty;
    });
    cartTotal.textContent = `$${total.toFixed(2)}`;
    checkoutBtn.disabled = cart.length === 0;
  };

  productGrid.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const productId = Number(e.target.dataset.id);
      const product = products.find(p => p.id === productId);
      const cartItem = cart.find(i => i.id === productId);

      if (cartItem) {
        cartItem.qty++;
      } else {
        cart.push({ ...product, qty: 1 });
      }
      updateCart();
      showModal(`${product.name} added to cart!`);
    }
  });

  checkoutBtn.addEventListener('click', () => {
    checkoutForm.classList.remove('hidden');
    checkoutForm.scrollIntoView({ behavior: 'smooth' });
  });

  checkoutForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const customer = Object.fromEntries(formData.entries());
    const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

    const orderData = { customer, items: cart, total };

    try {
      const response = await fetch('/api/v1/public/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) throw new Error('Order submission failed');

      const result = await response.json();
      if (result.success) {
  // Change the success message
  showModal('✅ Order request received! You will receive an invoice via Email or WhatsApp shortly.');
  cart = [];
  updateCart();
  checkoutForm.reset();
  checkoutForm.classList.add('hidden');
}
    } catch (error) {
      console.error(error);
      showModal('❌ Error submitting order.');
    }
  });

  // Initial Load
  (async () => {
    
    try {
      const response = await fetch('/api/v1/products');
      products = await response.json();
      productGrid.innerHTML = products.map(p => `
  <div class="product-card">
    <img src="${p.image_url}" alt="${p.name}">
    <div class="product-card-body">
      <h3>${p.name}</h3>
      <p>$${p.price.toFixed(2)}</p>
      <button data-id="${p.id}" class="btn btn-green">Add to Cart</button>
    </div>
  </div>
`).join('');
    } catch (error) {
      console.error(error);
      productGrid.innerHTML = '<p class="text-red-500">Could not load products.</p>';
    }
  })();
});