
'use strict'
const chalk = require('chalk')
const log = console.log
const loginController = require('../controllers/loginController')

module.exports = async function(app){
  const { getUsers } = await loginController()

  app.get('/authenticate', async ( req, res ) => {
    const users = await getUsers()
    res.send(users)
  })

}
