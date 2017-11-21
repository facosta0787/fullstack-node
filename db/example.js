'use strict'
const chalk = require('chalk')
const db = require('./index')
const sha256 = require('crypto-js/sha256')
const base64 = require('crypto-js/enc-base64')

async function run(){

  const { User, Post } = await db({ reset:false })

  // const user = await User.create({
  //   user:'facosta',
  //   name:'Felipe Acosta',
  //   password: base64.stringify(sha256('porque'))
  // }).catch(handleFatalError)

  const users = await User.findAll()
  console.log(users)

  // console.log(chalk.green('---Created User---'))
  // console.log(user)

  // const post = await Post.create({
  //   title:'PreactJS',
  //   desc:'A alternative to ReactJS',
  //   userId: 1
  // }).catch(handleFatalError)
  //
  // console.log(chalk.green('---Created Post---'))
  // console.log(post)
}

run()

function handleFatalError(err){
    console.log(chalk.red(`Error: ${err.message}`))
    console.log(chalk.red(`Error: ${err.stack}`))
}
