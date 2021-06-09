"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var cors_1 = __importDefault(require("cors"));
var articles_js_1 = __importDefault(require("./articles/articles.js"));
var authors_js_1 = __importDefault(require("./articles/authors.js"));
var errorResponse_js_1 = __importDefault(require("./lib/errorResponse.js"));
var mongoose_1 = __importDefault(require("mongoose"));
var errorHandlers_js_1 = require("./lib/errorHandlers.js");
var express_list_endpoints_1 = __importDefault(require("express-list-endpoints"));
var app = express_1.default();
var whiteList = [process.env.FE_URL_DEV, process.env.FE_URL_PROD];
var corsOptions = {
    origin: function (origin, next) {
        if (whiteList.indexOf(origin) !== -1) {
            console.log("ORIGIN: ", origin);
            next();
        }
        else {
            next(new errorResponse_js_1.default(403, "NOT ALLOWED BY CORS"));
        }
    },
};
app.use(cors_1.default());
app.use(express_1.default.json());
app.use("/articles", articles_js_1.default);
app.use("/authors", authors_js_1.default);
app.use(errorHandlers_js_1.badRequestErrorHandler);
app.use(errorHandlers_js_1.notFoundErrorHandler);
app.use(errorHandlers_js_1.catchAllErrorHandler);
var port = process.env.PORT || 3005;
console.log(express_list_endpoints_1.default(app));
var MONGODB_ADDRESS = process.env.MONGODB_ADDRESS;
if (!MONGODB_ADDRESS) {
    throw new Error("No .env configured.");
}
mongoose_1.default
    .connect(MONGODB_ADDRESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
    .then(function () {
    return app.listen(port, function () {
        console.log("Running on port", port);
    });
})
    .catch(function (err) { return console.log(err); });
