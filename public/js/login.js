// public/js/login.js
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  const errorMessage = document.getElementById('error-message');

  try {
    const response = await fetch('/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      window.location.href = '/admin'; // Redirect to admin dashboard on success
    } else {
      errorMessage.textContent = 'Invalid credentials. Please try again.';
    }
  } catch (error) {
    errorMessage.textContent = 'An error occurred. Please try again later.';
  }
});