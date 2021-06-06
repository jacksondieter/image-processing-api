import sharp, { FormatEnum } from 'sharp'

async function convert (fileName: string, width: number, heigth: number, format: keyof FormatEnum = 'jpeg') {
  console.log(`Converting ${fileName}...`)
  try {
    const image = await sharp(fileName)
      .resize(width, heigth)
      .toFormat(format)
      .toBuffer()
    console.log('Success')
    return image
  } catch (e) {
    console.error(e)
  }
}

export default convert

// convert('./data/inputs.jpg', 200, 200)
