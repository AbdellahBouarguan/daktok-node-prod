document.addEventListener('DOMContentLoaded', () => {
  const payWithCodBtn = document.getElementById('payWithCod');
  const modal = document.getElementById('modal');
  const modalMessage = document.getElementById('modalMessage');

  if (payWithCodBtn) {
    payWithCodBtn.addEventListener('click', async () => {
      const orderId = payWithCodBtn.dataset.orderId;

      try {
        const response = await fetch(`/api/v1/public/orders/${orderId}/pay/cod`, {
          method: 'POST',
        });
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || 'Payment confirmation failed.');
        }

        modalMessage.textContent = '✅ Your order has been confirmed! We will contact you shortly to arrange delivery.';
        modal.classList.remove('hidden');

      } catch (error) {
        modalMessage.textContent = `❌ ${error.message}`;
        modal.classList.remove('hidden');
      }
    });
  }
});