import sharp, { FormatEnum } from 'sharp'
import { DIR_IN, DIR_OUT, EXTENSION } from '../config/index'
import { ImageFile } from '../interfaces/IImage'
import { checkDir, writeFile, getPath, getFullPath } from './fileHelper'

export function safeAwait(promise: Promise<unknown>, message: string): Promise<{ data?: unknown; error?: string }> {
  return promise
    .then((data) => ({ data }))
    .catch(() => {
      const error = message
      return { error }
    })
}

export async function convert(
  fileName: string,
  width: number,
  height: number,
  format: keyof FormatEnum
): Promise<Buffer> {
  const file = await sharp(fileName).resize(width, height).toFormat(format).toBuffer()
  return file
}

export async function convertion(
  fileName: string,
  width: number,
  height: number,
  output: string,
  format: keyof FormatEnum = 'jpg'
): Promise<{ error?: string; data?: boolean }> {
  console.log('Converting image...')
  await checkDir(DIR_OUT)
  const { error: convError, data } = await safeAwait(convert(fileName, width, height, format), 'conversion failed')
  if (convError) return { error: convError }
  console.log('Conversion succeed')
  const { error: writeError } = await writeFile(data as Buffer, output)
  if (writeError) return { error: writeError }
  return { data: true }
}

export class Filename {
  private extint: keyof FormatEnum = EXTENSION
  private rootInput: string = DIR_IN
  private rootOutput: string = DIR_OUT
  private name: string
  private ext: keyof FormatEnum
  private width: number
  private height: number
  private output: string
  private input: string

  constructor(name: string, width = 200, height = 200, ext: keyof FormatEnum = EXTENSION) {
    this.name = name
    this.width = width
    this.height = height
    this.ext = ext
    this.input = this.getInputName()
    this.output = this.getOutputName()
  }

  getInputName(): string {
    const filename: string = [this.name, '.', this.extint].join('')
    const relPath: string = getPath(this.rootInput, filename)
    const fullPath = getFullPath(relPath)
    return fullPath
  }

  getOutputName(): string {
    const filename: string = [this.name, 'w', this.width, 'h', this.height, '.', this.ext].join('')
    const relPath: string = getPath(this.rootOutput, filename)
    const fullPath = getFullPath(relPath)
    return fullPath
  }

  createImg(): ImageFile {
    const image: ImageFile = {
      inputName: this.input,
      outputName: this.output,
      ext: this.ext,
      width: this.width,
      height: this.height,
    }
    return image
  }
}
