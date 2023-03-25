const { Sequelize,DataTypes } = require('sequelize');
const connection = new Sequelize('apijuegos','root','root',{
    host:'localhost',
    dialect:'mysql'
})
try {
    connection.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

const filtro = connection.define('filtros', {
    filtro: {
    type: DataTypes.STRING,
    allowNull: false
  },
  resultado: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

module.exports = filtro;