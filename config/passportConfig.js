const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../db/queries");
const bcrypt = require("bcryptjs");

const verifyCallback = async (username, password, done) => {
    try {
        const user = await db.getUserFromUname(username);
        if (!user) {
            return done(null, false, {message: "Username not found"});
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return done(null, false, {message: "Incorrect password"})
        }

        return done(null, user);
    } catch (err) {
        return done(err);
    }
};

passport.use(new LocalStrategy(verifyCallback));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await db.getUserFromId(id);

        done(null, user);
    } catch (err) {
        done(err);
    }
});