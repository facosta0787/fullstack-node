'use strict'

const Sequelize = require('sequelize')
const dbInstance = require('../lib/dbcon')

module.exports = function UserModel(){
  const db = dbInstance()

  return db.define('user',{
    user:{
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    name:{
      type: Sequelize.STRING,
      allowNull: false
    },
    password:{
      type: Sequelize.STRING,
      allowNUll: false
    },
    admin:{
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  })

}
