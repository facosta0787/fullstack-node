'use strict'

const Sequelize = require('sequelize')
let dbinstance = null

module.exports = function dbInstance() {
  if(!dbinstance){
     dbinstance = new Sequelize('nodedb',null,null,{
       dialect:'sqlite',
       storage: `${__dirname}/nodelogin.sqlite`,
       query: {
         raw: true
       }
     })
  }
  return dbinstance
}
