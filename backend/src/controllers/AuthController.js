import { User as _User } from 'db'
import bcrypt from 'bcrypt'

class AuthController{
  constructor() {
    this.User = _User()
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

export default AuthController
