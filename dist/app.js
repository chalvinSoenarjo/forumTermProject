"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("./middleware/passport"));
const authRoute_1 = __importDefault(require("./routers/authRoute"));
const postRouters_1 = __importDefault(require("./routers/postRouters"));
const subsRouters_1 = __importDefault(require("./routers/subsRouters"));
const indexRoute_1 = __importDefault(require("./routers/indexRoute"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
app.set("view engine", "ejs");
app.use(express_1.default.static("public"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true })); // Parses urlencoded bodies
app.use((0, express_session_1.default)({
    secret: "yourSecretKey",
    resave: false,
    saveUninitialized: false
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use("/", indexRoute_1.default);
app.use("/auth", authRoute_1.default);
app.use("/posts", postRouters_1.default);
app.use("/subs", subsRouters_1.default);
app.get('/desired-success-url', (req, res) => {
    res.send('Login successful. Welcome to the desired success page!');
});
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
//# sourceMappingURL=app.js.map