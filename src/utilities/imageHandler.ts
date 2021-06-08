import sharp, { FormatEnum } from 'sharp'
import { promises as fs } from 'fs'
import path from 'path'
import { DIR_IN, DIR_OUT } from '../../config/index'

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
  const exists = await (await fs.stat(file)).isFile()
  return exists
}

async function checkDir (dir: string) {
  try {
    const exists = await (await fs.stat(dir)).isDirectory()
    return exists
  } catch (e) {
    console.log('Make dir succeed')
    await fs.mkdir(dir)
    return true
  }
}
async function writeFile (data: Buffer, filename: string): Promise<boolean | undefined> {
  try {
    await fs.writeFile(filename, data)
    console.log('Writing file succeed')
    return true
  } catch (error) {
    console.log('Writing file failed')
  }
}

export async function convert (fileName: string, width: number, heigth: number, output: string, format: keyof FormatEnum = 'jpg') {
  console.log(`Converting ${path.basename(fileName)}...`)
  checkDir(DIR_OUT)
  try {
    const file = await sharp(fileName)
      .resize(width, heigth)
      .toFormat(format)
      .toBuffer()
    console.log('Conversion succeed')
    await writeFile(file, output)
    return true
  } catch (e) {
    console.log('Conversion failed')
  }
}

export class Filename {
  private extint: keyof FormatEnum = 'jpg'
  private rootInput: string = DIR_IN
  private rootOutput: string = DIR_OUT
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
