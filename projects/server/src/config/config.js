const { join } = require("path");
require('dotenv').config({ path: join(__dirname, '../.env') });

module.exports = {
  "development": {
    "username": "jcwd250202",
    "password": "jcwd250202",
    "database": "jcwd250202",
    "host": "adminer2.purwadhikabootcamp.com",
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