'use strict'

const Sequelize = require('sequelize')
let dbinstance = null

module.exports = function dbInstance() {
  if(!dbinstance){
     dbinstance = new Sequelize('nodedb',null,null,{
       dialect:'sqlite',
       storage:'./lib/nodedb.sqlite',
       query: {
         raw: true
       }
     })
  }
  return dbinstance
}
