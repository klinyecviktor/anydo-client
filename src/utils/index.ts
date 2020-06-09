const crypto = require('crypto')

const STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"

export const idGenerator = (length = 24) => {
  const buffer = Uint8Array.from(crypto.randomBytes(length))
  let id = ''

  buffer.forEach((number) => id += STRING.charAt(number % STRING.length))

  return id
}
