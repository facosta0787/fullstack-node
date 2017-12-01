'use strict'

const Sequelize = require('sequelize')
let dbinstance = null


module.exports = function dbInstance() {
  if(!dbinstance){
     dbinstance = new Sequelize('db.blog',null,null,{
       dialect:'sqlite',
       storage: `${__dirname}/db.blog.sqlite`,
       query: {
         raw: false
       },
       logging: false
     })
  }
  return dbinstance
}
