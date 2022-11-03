const Sequelize = require('Sequelize');
const sequelize = new Sequelize('hoaxify', 'my-db-user', 'db-p4ss', {
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false,
});
module.exports = sequelize;
