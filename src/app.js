import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import passport from 'passport'
import { createJWT } from './lib/utilsJWT.js'
import { authJWT } from './middlewares/jwtHelper.js'
import { passportConfig } from './config/passport.js'
passportConfig(passport)
dotenv.config()

const app = express()
const PORT = 5151

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(passport.initialize())

app.get('/', (req, res) => {
  if (req.user) {
    res.redirect('/protected')
  } else {
    res.send('<a href="/auth/google">Authenticate with Google</a>')
  }
})

app.get('/auth/google', 
  passport.authenticate('google', { session: false, scope: ['email', 'profile'] })
)

app.get('/auth/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const { token, expiresIn } = createJWT(req.user)
    res.send({ success: true, user: req.user.displayName, token, expiresIn })
  }
)

app.get('/protected', authJWT.verifyToken, (req, res) => {
  console.log(req.decodedToken)
  res.status(200).json({ success: true, msg: 'You are authorized!' })
})

app.listen(PORT, () => {
  console.log(`Server on port: ${PORT}`)
})
