import chalk from 'chalk'
import express from 'express'
import bodyParser from 'body-parser'

const PORT = process.env.PORT || 3000
const app = express()

app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())

app.listen(PORT, () => {
  console.log(chalk.green(`Server running and listening on http://localhost:${PORT}`))
})
