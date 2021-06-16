import { FormatEnum } from 'sharp'
export interface ImageFile {
  inputName: string
  outputName: string
  ext: keyof FormatEnum
  width: number
  height: number
}

export interface ImageResponse {
  error?: string
  data?: {
    ext: string
    filename: string
  }
}
