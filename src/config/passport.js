import dotenv from 'dotenv'
import { Strategy as GoogleStrategy } from 'passport-google-oauth2'
dotenv.config()

export const passportConfig = (passport) => {
  passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:5151/auth/google/callback",
    passReqToCallback: true
  },
  (request, accessToken, refreshToken, profile, done) => {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user)
    // })
    console.log(profile)
    return done(null, profile)
  }
))
}
