'use strict'

const Sequelize  = require('sequelize')
let conn   = null

module.exports = function dbInstance() {
  if(!conn){
     conn = new Sequelize('db.blog', null, null,{
       dialect:'sqlite',
       storage: `${__dirname}/db.blog.sqlite`,
       query: {
         raw: false
       },
       logging: true
     })
  }
  return conn
}
