import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import passport from 'passport'
import session from 'express-session'
import { isLoggedIn } from './middlewares/isLoggedIn.js'
import * as googleAuth from './auth/auth.js'
dotenv.config()

const app = express()
const PORT = 5151

app.use(session({ 
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: true
}))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
  if (req.user) {
    res.redirect('/protected')
  } else {
    res.send('<a href="/auth/google">Authenticate with Google</a>')
  }
})

app.get('/auth/google', 
  passport.authenticate('google', { scope: ['email', 'profile'] })
)

app.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/failure'
  })
)

app.get('/auth/failure', () => {
  res.send('something went wrong')
})

app.get('/protected', isLoggedIn, (req, res) => {
  res.send(`Hello ${req.user.displayName}\n<a href="/logout">Log out</a>`)
})

app.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) {
      return next(err)
    }
  });
  req.session.destroy();
  res.send('Goodbye!');
})

app.listen(PORT, () => {
  console.log(`Server on port: ${PORT}`)
})
