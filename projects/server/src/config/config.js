const { join } = require("path");
require('dotenv').config({ path: join(__dirname, '../.env') });

module.exports = {
  "development": {
    "username": "root",
    "password": "Deathstar2@@",
    "database": "buyfreshdummy",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}