import { promises as fs } from 'fs'
import path from 'path'

const getPath = (root: string, filename: string): string => path.join(root, filename)

const isFile = async (file: string) => {
  const isFile = await (await fs.stat(file)).isFile()
  return isFile
}

const readFile = async (fileName: string) => {
  try {
    const file = await fs.readFile(fileName, 'utf-8')
    return file
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`)
  }
}

const writeFile = async (data: Buffer, filename: string): Promise<boolean | undefined> => {
  try {
    await fs.writeFile(filename, data)
    return true
  } catch (error) {
    console.error(`Got an error trying to write to a file: ${error.message}`)
  }
}

export { getPath, isFile, readFile, writeFile }
