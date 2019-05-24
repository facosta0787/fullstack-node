const db = require('./index')({ reset: false })

async function create(){
  const user = await db.User.create({
    user:'facosta',
    name:'Felipe Acosta',
    password:'porque',
    admin: true
  })
  const user2 = await db.User.create({
    user:'jescobar',
    name:'Jose Escobar',
    password:'porque',
    admin: false
  })
  console.log([user.dataValues,user2.dataValues])
}

async function createPost(){
  const post = await db.Post.create({
    title: 'ReactJS',
    desc: `A JavaScript's library to create web interfaces`,
    userId: 1
  })
  const post2 = await db.Post.create({
    title: 'VueJS',
    desc: `A JavaScript's library to create web interfaces`,
    userId: 2
  })
  console.log([post.dataValues,post2.dataValues])
}

async function getUsers(){
  const users = await db.User.findAll()
  console.log('--- Users ---')
  console.log(objectJson(users))
}

async function getPosts(){
  const posts = await db.Post.findAll()
  console.log('--- Posts ---')
  console.log(objectJson(posts))
}

async function getPostsUsers(){
  const posts = await db.Post.findAll({
    include: [ db.User ]
  })
  console.log()
  console.log(objectJson(posts))
}

create()
createPost()
setTimeout( () => getUsers(), 1 * 1000)
setTimeout( () => getPosts(), 2 * 1000)
setTimeout( () => getPostsUsers(), 3 * 1000)

function objectJson(complex){
  if(complex) return JSON.parse(JSON.stringify(complex))
}
