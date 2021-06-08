
function parseFromString (str: string): string | number {
  if (!isNaN(+str)) {
    return Number(str)
  } else {
    return str
  }
}

function parseObject (obj: QueryObj): ImgObj {
  const result: QueryObj = {}
  for (const [key, value] of Object.entries(obj)) {
    result[key as keyof typeof result] = parseFromString(value)
  }
  return (result as ImgObj)
}

export default parseObject
