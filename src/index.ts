import express, { Application } from 'express'

const app: Application = express()
const port = 3000

app.use('/', (req, res) => {
  res.status(200).send('working')
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

export default app
