import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET

export const createJWT = (user) => {
  const { id } = user
  const expiresIn = '1d' // 1 day
  const payload = {
    sub: id,
    iat: Date.now()
  }
  const signedToken = jwt.sign(payload, JWT_SECRET, { expiresIn })
  return {
    token: `Bearer ${signedToken}`,
    expiresIn
  }
}
