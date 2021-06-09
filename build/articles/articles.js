"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
// import q2m from "query-to-mongo";
var mongoose_1 = __importDefault(require("mongoose"));
var authors_js_1 = __importDefault(require("../schemas/authors.js"));
var articles_js_1 = __importDefault(require("../schemas/articles.js"));
var index_js_1 = require("../auth/index.js");
var errorResponse_js_1 = __importDefault(require("../lib/errorResponse.js"));
var articleRouter = express_1.default.Router();
// articleRouter.get("/", async (req, res, next) => {
//   try {
//     if (Object.keys(req.query).length > 0) {
//       const { criteria, options, links } = q2m(req.query);
//       const total = await ArticleSchema.countDocuments(criteria);
//       const articles = await ArticleSchema.find(
//         {
//           headLine: {
//             $regex: new RegExp(criteria.headLine, "i"),
//           },
//           subHead: {
//             $regex: new RegExp(criteria.subHead, "i"),
//           },
//           category: {
//             $regex: new RegExp(criteria.category, "i"),
//           },
//         },
//         options.fields
//       )
//         .sort(options.sort)
//         .skip(options.skip)
//         .limit(options.limit);
//       res.send({ links: links("/articles", total), data: articles });
//     } else {
//       next();
//     }
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// });
articleRouter.get("/", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var articles, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, articles_js_1.default.find()];
            case 1:
                articles = _a.sent();
                res.status(200).send(articles);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                next(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
articleRouter.get("/myArticles", index_js_1.basicAuthMiddleware, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, author, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.body.user._id;
                return [4 /*yield*/, authors_js_1.default.findById(userId).populate("articles")];
            case 1:
                author = _a.sent();
                res.status(200).send(author === null || author === void 0 ? void 0 : author.articles);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                next(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
articleRouter.get("/:id", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var article, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log(1000);
                return [4 /*yield*/, articles_js_1.default.findById(req.params.id)];
            case 1:
                article = _a.sent();
                if (!article) {
                    return [2 /*return*/, next(new errorResponse_js_1.default(404, "ID " + req.params.id + " not found"))];
                }
                res.status(200).send({ article: article });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                next(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
articleRouter.post("/", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var newArticle, savedArticle, authorId, _id, author, updatedAuthor, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                newArticle = __assign({}, req.body);
                return [4 /*yield*/, articles_js_1.default.create(newArticle)];
            case 1:
                savedArticle = _a.sent();
                authorId = savedArticle.authorId;
                _id = savedArticle._id;
                return [4 /*yield*/, authors_js_1.default.findById(authorId)];
            case 2:
                author = _a.sent();
                return [4 /*yield*/, authors_js_1.default.findByIdAndUpdate(authorId, {
                        $push: {
                            articles: _id,
                        },
                    }, { runValidators: true, new: true })];
            case 3:
                updatedAuthor = _a.sent();
                console.log(updatedAuthor);
                res.send({ _id: _id });
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                console.log(error_2);
                next(error_2);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
articleRouter.put("/:id", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var newArticle, article, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                newArticle = __assign({}, req.body);
                return [4 /*yield*/, articles_js_1.default.findByIdAndUpdate(req.params.id, newArticle, {
                        runValidators: true,
                        new: true,
                    })];
            case 1:
                article = _a.sent();
                if (!article) {
                    return [2 /*return*/, next(new errorResponse_js_1.default(404, "resource not found with that id"))];
                }
                res.status(200).send({ article: article });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.log(error_3);
                next(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
articleRouter.delete("/:id", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var article, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, articles_js_1.default.findByIdAndDelete(req.params.id)];
            case 1:
                article = _a.sent();
                console.log(article);
                if (!article) {
                    return [2 /*return*/, next(new errorResponse_js_1.default(404, "id: " + req.params.id + " not found"))];
                }
                res.status(204).send();
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                next(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
articleRouter.get("/:id/reviews", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, reviews, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, articles_js_1.default.findById(id, {
                        reviews: 1,
                        _id: 0,
                    })];
            case 1:
                reviews = _a.sent();
                if (!reviews)
                    return [2 /*return*/, next(new errorResponse_js_1.default(404, "id not found"))];
                res.status(200).send({ reviews: reviews });
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                next(error_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
articleRouter.get("/:id/reviews/:reviewId", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, reviewId, reviews, data, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.params.id;
                reviewId = req.params.reviewId;
                return [4 /*yield*/, articles_js_1.default.findOne({ _id: mongoose_1.default.Types.ObjectId(userId) }, {
                        reviews: {
                            $elemMatch: { _id: mongoose_1.default.Types.ObjectId(reviewId) },
                        },
                    })];
            case 1:
                reviews = (_a.sent()).reviews;
                // console.log(reviews);
                if (reviews) {
                    data = reviews.length > 0 ? reviews[0] : reviews;
                    return [2 /*return*/, res.status(200).send({
                            success: true,
                            data: data,
                        })];
                }
                else {
                    return [2 /*return*/, next(new errorResponse_js_1.default(404, "id not found"))];
                }
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                next(error_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
articleRouter.post("/:id/reviews", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var articleId, addReview, updatedArticles, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                articleId = req.params.id;
                addReview = req.body;
                return [4 /*yield*/, articles_js_1.default.findByIdAndUpdate(articleId, {
                        $push: {
                            reviews: addReview,
                        },
                    }, { runValidators: true, new: true, projection: { reviews: 1 } })];
            case 1:
                updatedArticles = _a.sent();
                if (!updatedArticles)
                    return [2 /*return*/, next(new errorResponse_js_1.default(404, "article not found"))];
                res.status(201).send({ updatedArticles: updatedArticles });
                return [3 /*break*/, 3];
            case 2:
                error_7 = _a.sent();
                next(error_7);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
articleRouter.put("/:id/reviews/:reviewId", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, reviewId, reviews, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.params.id;
                reviewId = req.params.reviewId;
                return [4 /*yield*/, articles_js_1.default.findOneAndUpdate({
                        _id: mongoose_1.default.Types.ObjectId(userId),
                        "reviews._id": mongoose_1.default.Types.ObjectId(reviewId),
                    }, { $set: { "reviews.$": __assign(__assign({}, req.body), { _id: reviewId }) } }, {
                        runValidators: true,
                        new: true,
                        projection: { reviews: 1 },
                        timestamps: true,
                    })];
            case 1:
                reviews = (_a.sent()).reviews;
                res.status(200).send(reviews);
                return [3 /*break*/, 3];
            case 2:
                error_8 = _a.sent();
                next(error_8);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
articleRouter.delete("/:id/reviews/:reviewId", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, reviewId, modified, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                reviewId = req.params.reviewId;
                return [4 /*yield*/, articles_js_1.default.findByIdAndUpdate(id, {
                        $pull: {
                            reviews: { _id: mongoose_1.default.Types.ObjectId(reviewId) },
                        },
                    }, { new: true })];
            case 1:
                modified = _a.sent();
                res.status(204).send(modified);
                return [3 /*break*/, 3];
            case 2:
                error_9 = _a.sent();
                next(error_9);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = articleRouter;
