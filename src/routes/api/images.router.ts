import { Router } from 'express'
import { middleWare, asyncController } from './images.controller'

const images = Router()

images.get('/', middleWare, asyncController)

export default images
