import express, { Application } from 'express'
import { api, home, notFound } from './api/index'
import { PORT } from './config/index'
import morgan from 'morgan'

const app: Application = express()
const serverLog = () => {
  console.log(`Server listening on port ${PORT}`)
}

app.use(morgan('dev'))
app.use('/api', api)
app.use('/', home)
app.use('*', notFound)
app.listen(PORT, serverLog)

export default app
