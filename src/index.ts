import express, { Application } from 'express'
import logger from './utilities/logger'
import { api, home, notFound } from './routes/index'

const app: Application = express()
const port = 3000
const serverLog = () => {
  console.log(`Server listening on port ${port}`)
}

app.use(logger)
app.use('/api', api)
app.use('/', home)
app.use('*', notFound)
app.listen(port, serverLog)

export default app
