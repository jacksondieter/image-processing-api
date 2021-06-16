import { Request, Response } from 'express'
import { getQuery } from '../../utilities/parser'
import { FormatEnum } from 'sharp'
import { convertion, Filename, safeAwait } from '../../utilities/imageHelper'
import { isFile } from '../../utilities/fileHelper'
import { ImageResponse } from '../../interfaces/IImage'

export async function asyncImageController(req: Request, res: Response): Promise<void> {
  const { error, data } = await asyncImageHandler(req.query)
  if (error) {
    console.log(error)
    res.status(404).send(error)
    return
  }
  if (data) {
    res.type(data.ext).sendFile(data.filename)
    return
  }
}

export async function asyncImageHandler(query: Record<string, unknown>): Promise<ImageResponse> {
  const validatedQuery = {
    filename: 'string',
    width: '?number',
    height: '?number',
    extension: '?string',
  }

  const { error: valError, value } = getQuery(query, validatedQuery)

  if (valError) return { error: valError }

  if (value) {
    const image = new Filename(
      value.filename as string,
      value.width as number,
      value.height as number,
      value.extension as keyof FormatEnum
    ).createImg()
    const valueOut = { ext: image.ext, filename: image.outputName }
    const { data: outExist } = await safeAwait(isFile(image.outputName), 'file not found')

    if (outExist) {
      console.log('File accessed')
      return { data: valueOut }
    }
    const { error: inError } = await safeAwait(isFile(image.inputName), 'input file not found')

    if (inError) return { error: inError }

    const { error: endError, data: outCreated } = await convertion(
      image.inputName,
      image.width,
      image.height,
      image.outputName,
      image.ext
    )

    if (endError) return { error: endError }

    if (outCreated) return { data: valueOut }
  }
  return {}
}
