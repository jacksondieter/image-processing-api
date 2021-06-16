import { Request, Response, Router } from 'express'
import imagesRouter from './routes/images.router'
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

const notFound = (req:Request, res:Response):void => {
  res
    .status(404)
    .send('404 Error')
}
export { api, home, notFound }
