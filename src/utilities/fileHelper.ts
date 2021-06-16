import { promises as fs } from 'fs'
import path from 'path'

export const getPath = (root: string, filename: string): string => path.join(root, filename)

export const getFullPath = (file: string): string => path.resolve(file)

export const isFile = async (file: string): Promise<boolean> => {
  const exists = (await fs.stat(file)).isFile()
  return exists
}
export async function checkDir(dir: string): Promise<boolean> {
  try {
    const exists = (await fs.stat(dir)).isDirectory()
    return exists
  } catch (e) {
    console.log('Make dir succeed')
    await fs.mkdir(dir)
    return true
  }
}
export async function writeFile(data: Buffer, filename: string): Promise<{ data?: boolean; error?: string }> {
  try {
    await fs.writeFile(filename, data)
    console.log('Writing file succeed')
    return { data: true }
  } catch (error) {
    return { error: 'Writing file failed' }
  }
}
