'use strict'
const db = require('db')

async function  run(){
  let { User, Post } = await db({reset:false})

  User.create({
    user:'facosta',
    name:'Felipe Acosta',
    password:'porque'
  })

  const users = await User.findAll()

  console.log(users)
}

run()
