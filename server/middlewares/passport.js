const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const {
  JWT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
} = require("../configs");

const LocalStrategy = require("passport-local").Strategy;
const GoogleTokenStrategy = require("passport-google-token").Strategy;
const FacebookTokenStrategy = require("passport-facebook-token");
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
        if (!user) {
          return done(
            {
              message: "Tài khoản hoặc mật khẩu không chính xác",
            },
            false,
            {
              message: "Tài khoản hoặc mật khẩu không chính xác",
            }
          );
        } else {
          const isCorrectPassword = await user.isValidPassword(password);
          if (!isCorrectPassword)
            return done(
              {
                message: "Tài khoản hoặc mật khẩu không chính xác",
              },
              false,
              {
                message: "Tài khoản hoặc mật khẩu không chính xác",
              }
            );
          done(null, user, { message: "đăng nhập thành công" });
        }
      } catch (error) {
        console.log(error);
        done(error, false);
      }
    }
  )
);

//Passport Google

passport.use(
  new GoogleTokenStrategy(
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
        const checkEmail = await User.findOne({
          email: profile.emails[0].value,
        });
        if (checkEmail) {
          await User.updateOne(
            { email: profile.emails[0].value },
            { authGoogleID: profile.id }
          );
          done(null, profile);
        } else {
          const newUser = new User({
            authType: "google",
            email: profile.emails[0].value,
            authGoogleID: profile.id,
            avatar: profile._json.picture,
            firstName: profile._json.family_name,
            lastName: profile._json.given_name,
          });

          await newUser.save();
          done(null, newUser);
        }
      } catch (error) {
        console.log(error);
      }
    }
  )
);

// Passport Facebook
passport.use(
  new FacebookTokenStrategy(
    {
      clientID: FACEBOOK_CLIENT_ID,
      clientSecret: FACEBOOK_CLIENT_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // check whether this current user exists in our database
        const user = await User.findOne({
          authFacebookID: profile.id,
        });

        if (user) return done(null, user);
        const checkEmail = await User.findOne({
          email: profile.emails[0].value,
        });
        if (checkEmail) {
          await User.updateOne(
            { email: profile.emails[0].value },
            { authFacebookID: profile.id }
          );
          done(null, profile);
        } else {
          // If new account
          const newUser = new User({
            authType: "facebook",
            authFacebookID: profile.id,
            email: profile.emails[0].value,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            avatar: profile.photos[0].value,
          });

          await newUser.save();

          done(null, newUser);
        }
      } catch (error) {
        console.log("error ", error);
        done(error, false);
      }
    }
  )
);
