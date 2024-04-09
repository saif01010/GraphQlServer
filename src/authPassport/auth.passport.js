import { GraphQLLocalStrategy } from "graphql-passport";
import { User } from "../models/user.model.js";
import passport from "passport";

export const authPassport = () => {
    passport.serializeUser((user, done) => {
        // console.log("serializeUser", user);
        done(null, user);
    
    });
    
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            // console.log("deserializeUser", user);
            done(null, user);
        }catch (error) {
            done(error);
        }
    });
    
    passport.use(
        new GraphQLLocalStrategy(async (email, password, done) => {
            try {
                const user = await User.findOne({ email });
                if (!user) {
                    return done(null, false, { message: "Invalid email" });
                }
                if (!user.comparePassword(password)) {
                    return done(null, false, { message: "Invalid password" });
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
    })

)};