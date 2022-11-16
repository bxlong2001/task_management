const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const {
  JWT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} = require("../configs");

const LocalStrategy = require("passport-local").Strategy;
const GooglePlusTokenStrategy = require("passport-google-plus-token");
const User = require("../models/User");

//Passport JWT
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("Authorization"),
      secretOrKey: JWT_SECRET,
    },
    async (payload, done) => {
      try {
        const user = await User.findById(payload.sub);

        if (!user) return done(null, false);

        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

//Passport Local
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email: email });
        if (!user) return done(null, false);
        const isCorrectPassword = await user.isValidPassword(password);
        if (!isCorrectPassword) return done(null, false);
        console.log(GOOGLE_CLIENT_ID);
        console.log(JWT_SECRET);
        done(null, user);
      } catch (error) {
        console.log(error);
        done(error, false);
      }
    }
  )
);

//Passport Google

passport.use(
  new GooglePlusTokenStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        //check whether this current user exists in database
        const user = await User.findOne({
          authGoogleID: profile.id,
          authType: "google",
        });
        if (user) {
          return done(null, user);
        }

        const newUser = new User({
          authType: "google",
          email: profile.emails[0].value,
          authGoogleID: profile.id,
        });

        await newUser.save();
        done(null, newUser);
      } catch (error) {
        console.log(error);
      }
    }
  )
);
