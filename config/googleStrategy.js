const UserModel = require("../models/User.model");
const passport = require("passport");
const googleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new googleStrategy(
    {
      clientID: process.env.GOOGLE_KEY,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (_, __, { id, emails, photos, name }, done) => {
      const user = await UserModel.findOne({ googleID: id });
      if (!user) {
        const newUser = await UserModel.create({
          googleID: id,
          email: emails[0].value,
          image: photos[0].value,
          username: name.givenName,
          userlastname: name.familyName,
        });
        done(null, newUser);
        return;
      }
      done(null, user);
    }
  )
);
