import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import * as db from "../fake-db";

interface User {
  id: number;
  uname: string;
  password: string;
}

passport.use(new LocalStrategy(
  (username, password, done) => {
      const user = db.getUserByUsername(username);
      if (!user || user.password !== password) {
          return done(null, false); // Wrong username or password
      }
      return done(null, user); // Successful authentication
  }
));



passport.serializeUser((user: User | Express.User, done) => {
  done(null, (user as User).id); // Cast user to User type
});

passport.deserializeUser((id, done) => {
  const user = db.getUser(id as number) as User; // Cast id to number
  if (!user) {
    return done(new Error("User not found"));
  }
  done(null, user);
});

export default passport;
