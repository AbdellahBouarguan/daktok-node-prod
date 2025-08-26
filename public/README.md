# Public Folder

This folder contains all the static assets that are served directly to the client's browser. These files are publicly accessible and do not require any server-side processing before being sent.

## Subfolders

* `/css`: Contains all the CSS stylesheets for the application. `style.css` is the main stylesheet.
* `/js`: Contains all the client-side JavaScript files. Each file corresponds to a specific page or functionality:
    * `admin.js`: Handles the logic for the admin dashboard.
    * `analytics.js`: Fetches and displays visitor analytics.
    * `login.js`: Handles the admin login form submission.
    * `main.js`: Contains the core logic for the customer-facing storefront, including product fetching, cart management, and order submission.
    * `payment.js`: Manages the payment process on the payment page.
    * `theme.js`: Handles the theme switching functionality (light/dark mode).

## Connection to the Project

The `express.static()` middleware in `src/loaders/express.js` is configured to serve files from this directory. This means that any file in this folder can be accessed by its path relative to the root URL. For example, `public/css/style.css` is accessible at `<your-domain>/css/style.css`.
