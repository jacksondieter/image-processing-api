import sharp, { FormatEnum } from 'sharp'
import { promises as fs } from 'fs'
import path from 'path'

interface ImageFile {
  inputName: string;
  outputName: string;
  ext: keyof FormatEnum;
  width: number;
  heigth: number;
}

export const getPath = (root: string, filename: string): string => path.join(root, filename)

export const getFullPath = (file: string) => path.resolve(file)

export const isFile = async (file: string) => {
  const isFile = await (await fs.stat(file))
  return isFile.isFile()
}

export async function convert (fileName: string, width: number, heigth: number, output:string, format: keyof FormatEnum = 'jpg') {
  console.log(`Converting ${path.basename(fileName)}...`)
  try {
    await sharp(fileName)
      .resize(width, heigth)
      .toFormat(format)
      .toFile(output)
    console.log('Conversion succeed')
    return true
  } catch (e) {
    console.log('Conversion failed')
  }
}

export class Filename {
  private extint: keyof FormatEnum = 'jpg'
  private rootInput: string = 'data/images'
  private rootOutput: string = 'data/thumbs'
  private name: string
  private ext: keyof FormatEnum
  private width: number
  private heigth: number
  private output: string
  private input: string

  constructor (name: string, width: number = 200, heigth: number = 200, ext: keyof FormatEnum = 'jpg') {
    this.name = name
    this.width = width
    this.heigth = heigth
    this.ext = ext
    this.input = this.getInputName()
    this.output = this.getOutputName()
  }

  getInputName (): string {
    const filename: string = [this.name, '.', this.extint].join('')
    const relPath: string = getPath(this.rootInput, filename)
    const fullPath = getFullPath(relPath)
    return fullPath
  }

  getOutputName (): string {
    const filename: string = [this.name, 'w', this.width, 'h', this.heigth, '.', this.ext].join('')
    const relPath: string = getPath(this.rootOutput, filename)
    const fullPath = getFullPath(relPath)
    return fullPath
  }

  createImg (): ImageFile {
    const image: ImageFile = {
      inputName: this.input,
      outputName: this.output,
      ext: this.ext,
      width: this.width,
      heigth: this.heigth
    }
    return image
  }
}
