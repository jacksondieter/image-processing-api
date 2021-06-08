import { Request, Response, Router } from 'express'
import imagesRouter from './api/images.router'
const api = Router()

api
  .route('/')
  .get((req, res) => {
    res.send('api working')
  })

api.use('/images', imagesRouter)

const home = Router()
home
  .route('/')
  .get((req, res) => {
    res.status(200).send('Home')
  })

const notFound = function (req:Request, res:Response, next:Function) {
  res
    .status(404)
    .send('404 Error')
}
export { api, home, notFound }
