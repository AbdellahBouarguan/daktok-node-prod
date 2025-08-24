// public/js/admin.js
// We will build this file out in the next steps as we add the API calls

document.addEventListener('DOMContentLoaded', () => {
  const productsTableBody = document.getElementById('productsTableBody');
  const ordersTableBody = document.getElementById('ordersTableBody');
  const addProductForm = document.getElementById('addProductForm');

  // --- DATA FETCHING AND RENDERING ---

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/v1/admin/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      renderProducts(data.products);
    } catch (error) {
      console.error(error);
      productsTableBody.innerHTML = `<tr><td colspan="4" class="text-red-500 p-2">Error loading products.</td></tr>`;
    }
  };

  const renderProducts = (products) => {
    productsTableBody.innerHTML = ''; // Clear existing rows
    if (products.length === 0) {
      productsTableBody.innerHTML = `<tr><td colspan="4" class="p-2">No products found.</td></tr>`;
      return;
    }
    products.forEach(product => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td class="p-2 border-b">${product.name}</td>
        <td class="p-2 border-b">$${product.price.toFixed(2)}</td>
        <td class="p-2 border-b">${product.stock}</td>
        <td class="p-2 border-b">
          <button class="text-red-500 hover:underline delete-product-btn" data-id="${product.id}">Delete</button>
        </td>
      `;
      productsTableBody.appendChild(row);
    });
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/v1/admin/orders');
      if (!response.ok) throw new Error('Failed to fetch orders');
      const data = await response.json();
      renderOrders(data.orders);
    } catch (error) {
      console.error(error);
      ordersTableBody.innerHTML = `<tr><td colspan="5" class="text-red-500 p-2">Error loading orders.</td></tr>`;
    }
  };

  const renderOrders = (orders) => {
    ordersTableBody.innerHTML = '';
    if (orders.length === 0) {
      ordersTableBody.innerHTML = `<tr><td colspan="5" class="p-2">No orders found.</td></tr>`;
      return;
    }
    const statusOptions = ['pending', 'paid', 'shipped', 'cancelled'];
    orders.forEach(order => {
      const row = document.createElement('tr');
      const itemsHtml = order.items && order.items[0] // Check if items is not null
        ? `<ul>${order.items.map(item => `<li>${item.product_name} x ${item.quantity}</li>`).join('')}</ul>`
        : 'No items';
      const selectOptions = statusOptions.map(s => `<option value="${s}" ${order.status === s ? 'selected' : ''}>${s}</option>`).join('');
      
      row.innerHTML = `
        <td class="p-2 border-b">${order.customer_name}<br><small>${order.customer_email}</small></td>
        <td class="p-2 border-b">$${order.total.toFixed(2)}</td>
        <td class="p-2 border-b">${order.status}</td>
        <td class="p-2 border-b">${itemsHtml}</td>
        <td class="p-2 border-b">
          <select class="border rounded px-2 py-1 update-status-select" data-id="${order.id}">
            ${selectOptions}
          </select>
        </td>
      `;
      ordersTableBody.appendChild(row);
    });
  };

  // --- EVENT LISTENERS ---

  addProductForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(addProductForm);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/v1/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.errors ? errorData.errors[0].msg : 'Could not add product'}`);
        return;
      }
      addProductForm.reset();
      fetchProducts(); // Refresh the product list
    } catch (error) {
      console.error(error);
      alert('An error occurred while adding the product.');
    }
  });

  productsTableBody.addEventListener('click', async (e) => {
    if (e.target.classList.contains('delete-product-btn')) {
      const productId = e.target.dataset.id;
      if (confirm('Are you sure you want to delete this product?')) {
        try {
          const response = await fetch(`/api/v1/admin/products/${productId}`, { method: 'DELETE' });
          if (!response.ok) throw new Error('Failed to delete product');
          fetchProducts(); // Refresh list on success
        } catch (error) {
          console.error(error);
          alert('An error occurred while deleting the product.');
        }
      }
    }
  });

  ordersTableBody.addEventListener('change', async (e) => {
    if (e.target.classList.contains('update-status-select')) {
      const orderId = e.target.dataset.id;
      const newStatus = e.target.value;

      try {
        const response = await fetch(`/api/v1/admin/orders/${orderId}/status`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus }),
        });
        if (!response.ok) throw new Error('Failed to update status');
        fetchOrders(); // Refresh order list to show updated status
      } catch (error) {
        console.error(error);
        alert('An error occurred while updating the order status.');
      }
    }
  });

  // --- INITIAL DATA LOAD ---
  fetchProducts();
  fetchOrders();
});

console.log("Admin script loaded!");