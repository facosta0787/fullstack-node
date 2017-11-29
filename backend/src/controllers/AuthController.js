import { User as _User } from 'db'
import config from '../config'
import bcrypt from 'bcrypt'
import chalk from 'chalk'
import jwt from 'jsonwebtoken'

class AuthController{
  constructor() {
    this.User = _User()
  }

  async signIn(req){
    const { user , password } = req.body
    const result = await this.User.findOne({
      where:{
        user:user
      }
    })

    if(!result){
      return {
        message: `User doesn't exist`,
        status: 400,
        data: {}
      }
    }

    try{
      const validate = await bcrypt.compare(password,result.password)

      if(!validate){
        return {
          message: 'Password is wrong !',
          status: 401,
          data: {}
        }
      }

      const payload = {
        iss: req.headers.host,
        sub: result.id,
        user : result.user,
        name : result.name,

      }
      const token = await jwt.sign(payload,config.tokensecret,{expiresIn:'14d'})
      return {
        message: 'Authentication successfully !',
        status: 200,
        data: token
      }
    }catch(e){
      return { e }
    }
  }

  async signUp(req){
    const { user, name, password, admin } = req.body
    const _admin = admin === 'true'
    const exists = await this.User.findOne({
      where:{
        user: user
      }
    })

    if( exists ){
      return {
        message:'User already exists !',
        status: 400,
        data: exists
      }
    }

    const _password = await bcrypt.hash(password,config.saltRounds)
    const _user = await this.User.create({
        user: user,
        name: name,
        password: _password,
        admin: _admin
      })

    return {
      message:'User has been created successfully !',
      status: 200,
      data: _user
    }
  }
}

export default new AuthController()
