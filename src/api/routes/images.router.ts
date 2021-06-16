import { Router } from 'express'
import { asyncImageController } from '../controller/images.controller'

const images = Router()

images.get('/', asyncImageController)

export default images
