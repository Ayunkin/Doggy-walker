const bcrypt = require('bcrypt');
require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../db/models/user.model');

passport.serializeUser((user, done) => {
  // console.log(user);
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

const authUser = async (req, email, password, done) => {
  try {
    if (/login/.test(req.path)) {
      const user = await User.findOne({ email }).populate('orders').lean().exec();

      if (!user) { return done(null, false, { message: 'Неверный логин или пароль' }); }
      if (await bcrypt.compare(password, user.password)) { return done(null, user); }
      return done(null, false, { message: 'Неверный логин или пароль' });
    }
    if (
      (email && password && req.body.firstname,
        req.body.lastname,
        req.body.kind)
    ) {
      const user = await User.findOne({ email }).populate('orders').lean().exec();
      if (!user) {
        try {
          const hashPass = await bcrypt.hash(password, 10);

          if (req.body.passport && req.body.district) {
            const newUser = new User({
              firstname: req.body.firstname.trim(),
              lastname: req.body.lastname.trim(),
              email,
              kind: req.body.kind,
              password: hashPass,
              verification: true,
              passport: req.body.passport,
              district: req.body.district.trim(),
            });
            await newUser.save();
            return done(null, newUser);
          }
          const newUser = new User({
            firstname: req.body.firstname.trim(),
            lastname: req.body.lastname.trim(),
            email,
            kind: req.body.kind,
            password: hashPass,
          });
          await newUser.save();
          return done(null, newUser);
        } catch (error) {
          return done(null, false, { message: 'Error' });
        }
      } else {
        return done(null, false, { message: 'Mail is already used' });
      }
    }
    return done(null, false, { message: 'Error' });
  } catch (error) {
    done(error);
  }
};

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passReqToCallback: true,
    },
    authUser,
  ),
);

passport.use(
  new GoogleStrategy(
    {
      // options for google strategy
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/redirect',
    },
    (accessToken, refreshToken, profile, done) => {
      // check if user already exists in our own db
      User.findOne({ googleId: profile.id }).populate('orders').then((currentUser) => {
        if (currentUser) {
          // already have this user
          // console.log('user is: ', currentUser)
          done(null, currentUser);
        } else {
          // if not, create user in our db

          const { givenName: firstname, familyName: lastname } = profile.name;
          new User({
            googleId: profile.id,
            firstname,
            lastname,
            email: profile.emails[0].value,
            photo: profile.photos[0].value,
          })
            .save()
            .then((newUser) => {
              // console.log('created new user: ', newUser)
              done(null, newUser);
            });
        }
      });
    },
  ),
);
