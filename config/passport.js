var GoogleStrategy = require('passport-google-oauth20').Strategy;
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '.';
import User from '../Models/User';

const runPassport = (passport)=>{
    passport.use(new GoogleStrategy({
        clientID : GOOGLE_CLIENT_ID,
        clientSecret : GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          googleId : profile.id,
          displayName : profile.displayName,
          firstName : profile.name.familyName,
          lastName : profile.name.givenName,
          image : profile.photos[0].value,
        };

        try {
          let user = await User.findOne({googleId : profile.id});
          if(user){
            done(null, user);
          }
          else{
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (error) {
          console.error(error);
        }
    }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
}

export default runPassport;