'use strict'
const chalk       = require('chalk')
const Sequelize   = require('sequelize')
const dbInstance  = require('./lib/dbcon')
const UserModel   = require('./models/user')
const PostModel   = require('./models/post')

module.exports = function(config = { reset: false }){
  const db = dbInstance()
  const User = UserModel()
  const Post = PostModel()
  const models = {
    User,
    Post
  }
  models.User.associate(models)
  models.Post.associate(models)

  if(config.reset){
    db.authenticate()
      .then(err => console.log(chalk.green('Connection has been successfully !')),
            err => {
              console.log(err.message)
              console.log(err.stack)
            }
      )
    db.sync({ force:true })
      .then( () => {
          console.log(chalk.green('The connection with database was successfully'))
      })
  }

  return models

}
