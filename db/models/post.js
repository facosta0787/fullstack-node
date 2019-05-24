'use strict'

const Sequelize = require('sequelize')
const db = require('../lib/dbcon')()

module.exports = function PostModel(){
  const Post = db.define('post',{
    title:{
      type: Sequelize.STRING,
      allowNull: false
    },
    text:{
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
