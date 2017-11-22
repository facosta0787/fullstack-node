'use strict'
const db = require('db')

module.exports = async function run() {

  const { User } = await db({reset:false})

  async function getUsers(){
    const users = await User.findAll()
    return users
  }

  return{
    getUsers
  }

}
