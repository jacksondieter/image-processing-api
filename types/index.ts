import { FormatEnum } from 'sharp'
import { getPath } from '../src/utilities/files'

interface ImageFile {
  inputName: string;
  outputName: string;
  ext: keyof FormatEnum;
  width: number;
  heigth: number;
}

export default class Filename {
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
    const fullPath: string = getPath(this.rootInput, filename)
    return fullPath
  }

  getOutputName (): string {
    const filename: string = [this.name, 'w', this.width, 'h', this.heigth, '.', this.ext].join('')
    const fullPath: string = getPath(this.rootOutput, filename)
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
