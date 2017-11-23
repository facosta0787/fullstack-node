import { User as _User } from 'db'
import bcrypt from 'bcrypt'
import chalk from 'chalk'

function log(string){
  if(string){
    return console.log(chalk.yellow(string))
  }
}
const ROUNDS = 10

class AuthController{
  constructor() {
    this.User = _User()
  }

  async signIn({user,password}){
    const result = await this.User.findAll({
      where:{
        user:user
      }
    })
    if(result){
      try{
        const validate = await bcrypt.compare(password,result[0].password)
        return validate
      }catch(e){
        return e
      }
    }
    return false
  }

  async signUp({ user, name , password }){
    const exists = await this.User.findAll({
      where:{
        user: user
      }
    })

    if( exists.length === 1 ){
      return { error: 'User already exists!' }
    }

    const new_password = await bcrypt.hash(password,ROUNDS)
    const new_user = await this.User.create({
        user: user,
        name: name,
        password: new_password
      })

    return new_user

  }

  async getUsers(){
    const users = await this.User.findAll()
    return users
  }

  async addUser(user){
    const hash = await bcrypt.hash(user.password,10)
    const result = await this.User.create({
      user: user.user,
      name: user.name,
      password: hash
    })
    return result
  }
}

export default new AuthController()
