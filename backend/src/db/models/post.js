'use strict'

const Sequelize = require('sequelize')
const dbInstance = require('../lib/dbcon')

module.exports = function PostModel(){
  const db = dbInstance()

  const Post = db.define('post',{
    title:{
      type: Sequelize.STRING,
      allowNull: false
    },
    desc:{
      type: Sequelize.STRING,
      allowNull: false
    }
  })

  Post.associate = function(models){
    models.Post.belongsTo(models.User,{
      onDelete: 'CASCADE',
      foreignKey: {
        allowNUll: false
      }
    })
  }

  return Post
}
