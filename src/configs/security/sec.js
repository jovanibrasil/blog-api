const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const config = require("./sec-config");
const User = require("../../models/User");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
};

module.exports = () => {
  const strategy = new Strategy(opts, (payload, done) => {
    User.findByPk(payload.id)
      .then(user => {
        if (user) {
          return done(null, { id: user.id, email: user.email });
        }
        return done(null, false);
      })
      .catch(error => done(error, null));
  });

  passport.use(strategy);

  return {
    initialize: () => {
      return passport.initialize();
    },
    authenticate: () => {
      return passport.authenticate("jwt", config.jwtSession);
    }
  };
};
