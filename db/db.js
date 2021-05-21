
const Sequelize = require('sequelize');

const path = require('path')
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db/db.db'
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Op = Sequelize.Op;

db.gradovi = require(path.join(__dirname, './gradovi.js'))(sequelize, Sequelize.DataTypes);

module.exports = db;