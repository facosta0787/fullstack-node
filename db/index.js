'use strict'
const chalk = require('chalk')
const Sequelize = require('sequelize')
const dbInstance = require('./lib/dbcon')
const UserModel = require('./models/user')
const PostModel = require('./models/post')

exports.database = async function(config){

  const db = dbInstance()
  const User = UserModel()
  const Post = PostModel()

  User.hasMany(Post)
  Post.belongsTo(User)

  await db.authenticate()
    .then(err => console.log(chalk.green('Connection has been successfully !')),
          err => {
            console.log(err.message)
            console.log(err.stack)
          }
    )

  if(config.reset){
    await db.sync({ force:true }).then( ()=> console.log(chalk.green('Synced successfully!')))
  }

}

exports.User = function(){
  const User = UserModel()
  return User
}
