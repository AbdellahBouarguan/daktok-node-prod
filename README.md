# Daktok Node Prod

Daktok Node Prod is a full-featured e-commerce application built with Node.js, Express, and PostgreSQL. It includes a customer-facing storefront, an admin panel for managing products and orders, and analytics for tracking site visitors.

## Features

  * **Customer-facing Storefront:** Browse products, add items to a cart, and place orders.
  * **Admin Panel:** Manage products (add, delete), view and update order statuses, and view visitor analytics.
  * **Authentication:** Secure admin panel with JWT-based authentication.
  * **Order Management:** Create, view, and update orders.
  * **Analytics:** Track total and unique visitors, as well as recent visitor activity.
  * **PDF Invoice Generation:** Automatically generate PDF invoices for orders.
  * **Dark Mode:** Switch between light and dark themes.

## Technologies Used

  * **Backend:** Node.js, Express.js
  * **Database:** PostgreSQL
  * **Templating Engine:** EJS
  * **Authentication:** bcrypt, JSON Web Token (JWT)
  * **PDF Generation:** Puppeteer
  * **Frontend:** HTML, CSS, JavaScript

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

  * Node.js
  * npm
  * Docker and Docker Compose (for the database)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/AbdellahBouarguan/daktok-node-prod.git
    cd daktok-node-prod
    ```

2.  **Install NPM packages:**

    ```bash
    npm install
    ```

3.  **Set up the environment variables:**

    Create a `.env` file in the root directory and add the following, replacing the placeholder values:

    ```
    PORT=3000
    NODE_ENV=development

    DB_HOST=localhost
    DB_PORT=5431
    DB_USER=daktok_user
    DB_PASSWORD=daktok_password
    DB_NAME=daktok_db

    JWT_SECRET=your_jwt_secret
    ```

4.  **Start the PostgreSQL database using Docker:**

    ```bash
    docker-compose up -d
    ```

5.  **Seed the database with an admin user and sample orders:**

    ```bash
    node scripts/seed-admin.js
    node scripts/seed-orders.js
    ```

### Running the Application

```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Available Scripts

  * `npm start`: Starts the development server with nodemon.
  * `npm test`: (Not yet implemented)

## Project Structure

```
.
├── docker-compose.yml
├── package.json
├── public
│   ├── css
│   └── js
├── scripts
│   ├── seed-admin.js
│   └── seed-orders.js
├── src
│   ├── api
│   │   ├── v1
│   │   │   ├── controllers
│   │   │   ├── middlewares
│   │   │   └── routes
│   ├── config
│   ├── loaders
│   ├── models
│   └── services
├── views
│   ├── admin
│   └── partials
└── .gitignore
```
