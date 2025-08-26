# Scripts Folder

This folder contains scripts that are used to manage the project's data and perform other administrative tasks. These scripts are not part of the main application but are essential for development and maintenance.

## Files

* `seed-admin.js`: Creates a default admin user in the database.
* `seed-orders.js`: Populates the database with sample order data for testing purposes.

## How to Use

These scripts can be run from the command line using Node.js:

```bash
node scripts/seed-admin.js
node scripts/seed-orders.js

Note: These scripts should be run after the database has been set up and the application has been configured.

