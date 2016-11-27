// config/passport.js

// load all the things we need
// var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

// load up the user model
var User = require('../src/models/').User;

// load the auth variables
var configAuth = require('./auth');

module.exports = (passport) => {
  // used to serialize the user for the session
  passport.serializeUser((user, done) => {
console.log("A===================================================================================");
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser((id, done) => {
console.log("B===================================================================================");
    User.findById(id).then((user) => {
      console.log("AAAAAAAAAAAAAAAAAAAAA = " + user.id)
      done(null, user.id);
    });
  });
  
  // code for login (use('local-login', new LocalStategy))
  // code for signup (use('local-signup', new LocalStategy))

  // =========================================================================
  // FACEBOOK ================================================================
  // =========================================================================
  passport.use(new FacebookStrategy({
    // pull in our app id and secret from our auth.js file
    clientID        : configAuth.facebookAuth.clientID,
    clientSecret    : configAuth.facebookAuth.clientSecret,
    callbackURL     : configAuth.facebookAuth.callbackURL,
    profileFields   : ['id', 'name', 'emails']
  },

  // facebook will send back the token and profile
  (token, refreshToken, profile, done) => {
    // asynchronous
    process.nextTick(() => {
console.log("1===================================================================================");

      // find the user in the database based on their facebook id
      User.findOne({ 'facebookId' : profile.id }).then((user) => {

console.log("2===================================================================================");
        // if there is an error, stop everything and return that
        // ie an error connecting to the database
        if (user == null)
            console.log("User does not exists");

console.log("3===================================================================================");
        // if the user is found, then log them in
        if (user) {
console.log("4===================================================================================");
            return done(null, user); // user found, return that user
        } else {

          // if there is no user found with that facebook id, create them


console.log("5===================================================================================");


          var newUser = User.build({
            facebookId: profile.id,
            facebookToken: token,
            name: profile.name.givenName + ' ' + profile.name.familyName,
            email: profile.emails[0].value
          });

console.log("6===================================================================================");
          // save our user to the database
          newUser.save().then((user) => {
console.log("7===================================================================================");
            return done(null, newUser);
          });
        }
      });
    });

  }));

};
