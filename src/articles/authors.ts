import express, { Request, Response, NextFunction } from "express";
import AuthorSchema from "../schemas/authors";
import ErrorResponse from "../lib/errorResponse";
import { basicAuthMiddleware } from "../auth";
import { Author, AuthorizedRequest } from "../typings";

const authorRouter = express.Router();

authorRouter.get("/", basicAuthMiddleware, async (req, res, next) => {
  try {
    const authors = await AuthorSchema.find();
    res.status(200).send({ authors });
  } catch (error) {
    next(error);
  }
});

authorRouter.post("/", async (req, res, next) => {
  try {
    const newAuthor = await AuthorSchema.create(req.body);
    res.status(201).send({ newAuthor });
  } catch (error) {
    next(error);
  }
});

authorRouter.post("/register", async (req, res, next) => {
  try {
    const newAuthor = await AuthorSchema.create(req.body);
    const { _id } = newAuthor;
    res.status(201).send({ _id });
  } catch (error) {
    next(error);
  }
});

authorRouter.put("/me", basicAuthMiddleware, async (req: AuthorizedRequest<Partial<Author>>, res: Response, next: NextFunction) => {
  try {
    // Type assertion: making sure that the req.body gets processed *as* an array of 
    // strings which are keys [keyof] the Author interface
    // i.e. "role", "_id", etc

    const updates = Object.keys(req.body) as (keyof Author)[]

    // If you try commenting the type assertion: it will complain that 
    // 'string' can't be used to index type 'AuthorPrivate & Document<any, {}>',
    // which is the type of our user in the body.
    updates.forEach((u) => (req.body.user[u] = req.body[u]));

    await req.body.user.save();

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

authorRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const author = await AuthorSchema.findById(id).populate("articles");
    if (!author) return next(new ErrorResponse(404, `id not found`));
    res.status(200).send({ author });
  } catch (error) {
    next(error);
  }
});

export default authorRouter;
