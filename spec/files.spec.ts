import { getPath, isFile, readFile } from '../src/utilities/files'
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
  it('should read the file...', async () => {
    const path = getPath('data/images', 'input.jpg')
    const file = await readFile(path)
    expect(file).toBeTruthy()
  })
  it('should not read the file...', async () => {
    try {
      const file = await readFile('input.jpg')
      expect(file).toBeFalsy()
    } catch (e) {
      expect(e).toBeTruthy()
    }
  })
})
