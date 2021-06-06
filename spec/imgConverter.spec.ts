import convert from '../src/utilities/imgConverter'
import Filename from '../types'

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
