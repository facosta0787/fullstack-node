'use strict' 

const Sequelize = require('sequelize')
const dbInstance = require('../lib/dbcon')

module.exports = function UserModel(){
  const db = dbInstance()

  const User = db.define('user',{
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

  User.associate = function(models){
    models.User.hasMany(models.Post)
  }

  return User
}
