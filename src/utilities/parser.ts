import { checkKey, TypeSpec } from 'query-validation'

export const EXT_FORMAT: string[] = ['avif', 'jpeg', 'jpg', 'png', 'raw', 'tiff', 'webp']
// export const EXT_FORMAT_IN: string[] = ['avif','gif','jpeg','jpg','png','svg','tiff','webp']
function parseFromString(str: string): string | number {
  if (!isNaN(+str)) {
    return Number(str)
  } else {
    return str
  }
}

export function validate(body: Record<string, unknown>, keys: Record<string, TypeSpec>): { error?: string } {
  for (const key in keys) {
    if (!checkKey(body[key], keys[key])) {
      return { error: `missing or invalid parameter ${key}` }
    }
  }
  return {}
}

export function parse(body: Record<string, unknown>, keys: Record<string, TypeSpec>): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  for (const key in keys) {
    result[key] = parseFromString(body[key] as string)
  }
  return result
}

export function getQuery(
  body: Record<string, unknown>,
  keys: Record<string, TypeSpec>
): { error?: string; value?: Record<string, unknown> } {
  const { error } = validate(body, keys)
  if (error) return { error }
  const { error: errorExt } = validateExt(body, EXT_FORMAT)
  if (errorExt) return { error: errorExt }
  const { filename = '', width = 200, height = 200, extension = 'jpg' } = parse(body, keys)
  return { value: { filename, width, height, extension } }
}

function validateExt(body: Record<string, unknown>, format: string[]): { error?: string } {
  const extension: string = (body?.extension as string) ?? 'jpg'
  const isExtension: boolean = format.includes(extension)
  if (!isExtension) {
    return { error: 'invalid extension' }
  }
  return {}
}
