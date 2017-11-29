const config = {
  port: 3000,                            //port for the http server
  setup: false,                          //defines if database should be created
  tokensecret: 'hXTcZak$sJggydS#~z<5yLQ',// secret for JTW
  saltRounds: 10                         //Salt Rounds for crypt the user password
}

export default config
