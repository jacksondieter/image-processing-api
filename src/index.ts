import express, { Application } from 'express'
import logger from './utilities/logger'
import { api, home, notFound } from './routes/index'
import { PORT } from '../config/index'

const app: Application = express()
const port = PORT
const serverLog = () => {
  console.log(`Server listening on port ${port}`)
}

app.use(logger)
app.use('/api', api)
app.use('/', home)
app.use('*', notFound)
app.listen(port, serverLog)

export default app
