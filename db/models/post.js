'use strict'

const Sequelize = require('sequelize')
const dbInstance = require('../lib/dbcon')

module.exports = function PostModel(){
  const db = dbInstance()

  return db.define('post',{
    title:{
      type: Sequelize.STRING,
      allowNull: false
    },
    desc:{
      type: Sequelize.STRING,
      allowNull: false
    },
    userId:{
      type: Sequelize.INTEGER,
      allowNull: false
    }
  })
}
