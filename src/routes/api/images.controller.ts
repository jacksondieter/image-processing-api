import { Request, Response, NextFunction } from 'express'
import parseObject from '../../utilities/parser'
import { FormatEnum } from 'sharp'
import { convert, Filename, isFile } from '../../utilities/imageHandler'

export async function asyncController (req: Request, res: Response, next: NextFunction) {
  const { filename = '', width = 200, heigth = 200, extension = 'jpg' }: ImgObj = req.parsed || {}
  const image = (new Filename(filename, width, heigth, extension as keyof FormatEnum)).createImg()
  try {
    await isFile(image.outputName)
    console.log('file exists')
    res.type(image.ext).sendFile(image.outputName)
  } catch (e) {
    try {
      await isFile(image.inputName)
      await convert(image.inputName, image.width, image.heigth, image.outputName, image.ext)
      res.type(image.ext).sendFile(image.outputName)
    } catch (e) {
      console.log('image dont exist')
      res
        .status(404)
        .send('image dont exist')
    }
  }
}

export function middleWare (req: Request, res: Response, next: NextFunction) {
  req.parsed = parseObject(req.query)
  const filename = req.parsed?.filename
  if (!filename || !req.parsed) {
    console.log('no filename')
    res
      .status(404)
      .send('no filename')
  } else {
    next()
  }
}