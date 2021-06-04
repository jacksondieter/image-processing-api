import { Request, Response, Router } from 'express'

const api = Router()

api
  .route('/')
  .get((req, res) => {
    res.send('api working')
  })

const home = Router()
home
  .route('/')
  .get((req, res) => {
    res.status(200).send('working')
  })

const notFound = function (req:Request, res:Response, next:Function) {
  res.status(404)
  res.send('404: File Not Found')
}
export { api, home, notFound }
