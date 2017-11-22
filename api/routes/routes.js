
'use strict'
const chalk = require('chalk')
const log = console.log

module.exports = async function(app){

  app.get('/authenticate', async ( req, res ) => {
    log('Route run !')
    res.send({ token: 'draga455whw478988hssgkp+%fsew#%/sdfgat' })
  })

}
