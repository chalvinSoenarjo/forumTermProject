import express from "express";
import session from "express-session";
import passport from "./middleware/passport";
import authRoute from "./routers/authRoute";
import postsRoute from "./routers/postRouters";
import subsRouters from "./routers/subsRouters";
import indexRoute from "./routers/indexRoute";

const app = express();
const PORT = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: "yourSecretKey",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


app.use("/", indexRoute);
app.use("/auth", authRoute);
app.use("/posts", postsRoute);
app.use("/subs", subsRouters);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
