import { convert, Filename, getPath, isFile } from '../../src/utilities/imageHandler'

const fileTrue = (new Filename('input')).createImg()
const fileFalse = (new Filename('inputs')).createImg()
describe('Image testing', () => {
  it('should throw error', async () => {
    try {
      const { inputName, width, heigth, ext } = fileFalse
      const res = await convert(inputName, width, heigth, ext)
      expect(res).toBeFalsy()
    } catch (e) {
      expect(e).toBeTruthy()
    }
  })
  it('should not throw error', async () => {
    try {
      const { inputName, width, heigth, ext } = fileTrue
      const res = await convert(inputName, width, heigth, ext)
      expect(res).toBeTruthy()
    } catch (e) {
      expect(e).toBeFalsy()
    }
  })
})

describe('Files test', () => {
  it('should return a filename', () => {
    const path = getPath('data', 'input.jpg')
    console.log(path)
    expect(path).toEqual('data/input.jpg')
  })
  it('should exist the file...', async () => {
    const path = getPath('data/images', 'input.jpg')
    const file = await isFile(path)
    expect(file).toBeTrue()
  })
})