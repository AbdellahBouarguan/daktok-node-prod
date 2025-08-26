# Loaders Folder

This folder contains files that are responsible for loading and initializing different modules of the application.

## Files

* `express.js`: This file is responsible for setting up the Express application. It configures middleware, sets up the view engine, and defines the API and page routes.
* `index.js`: This is the main entry point for the loaders. It initializes the database connection and the Express application.
* `postgres.js`: This file sets up the connection to the PostgreSQL database using the `pg` library. It creates a connection pool that can be used to query the database.

## Connection to the Project

The `init` function in `src/loaders/index.js` is called from `src/app.js` to start the application. This function, in turn, calls the other loader files to set up the different parts of the application.
