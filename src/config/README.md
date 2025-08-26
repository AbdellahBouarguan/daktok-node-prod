# Config Folder

This folder contains all the configuration files for the application.

## Files

* `index.js`: This file is the main entry point for the application's configuration. It loads the environment variables from the `.env` file and exports a configuration object that can be used throughout the application.

## How it Works

The `dotenv` package is used to load the environment variables from the `.env` file into `process.env`. The `index.js` file then exports an object with these variables, providing a centralized and consistent way to access configuration values.
