import { Request } from 'express'
import { Model, Document } from 'mongoose'
import Override from './utils/override'

export interface Article {
    category: Category;
    _id: string;
    headLine: string;
    subHead: string;
    content: string;
    authorId: string;
    cover: string;
    reviews: any[];
    createdAt: Date;
    updatedAt: Date;
}

export interface Category {
    name: string;
    img: string;
}

export interface Author {
    role: string;
    articles: string[];
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface AuthorPrivate extends Author {
    password: string
}

export interface MyArticlesRequest {
    user: Author
}

// Created an "AuthorizedRequest" type that represents a request validated by the authMiddleware.
// Notice the usage of generics, T stands for a "generic type" identifying in this case the
// body of the request since we are passing it to the Request interface united with {user: AuthorPrivateDocument}
export type AuthorizedRequest<T> = Request<{}, {}, T & { user: AuthorPrivateDocument }>

// Usage looks like this:

// router.post("/post", async (req: AuthorizedRequest<MyPostRequest>, res: Response, next: NextFunction) => {
//    ...
// })

// where MyPostRequest is expected to include all the fields to be included in the request body

// This is the mongoose Document for AuthorPrivate -> it is the *union* between AuthorPrivate and Document
// We have to use the "type" keyword here because we can't unite two interface, only extend one from another
export type AuthorPrivateDocument = AuthorPrivate & Document

// The AuthorModel is extending the Model from mongoose, which receives a Document extension as a generic.
// We will use this to be passed to our Schema: when we will extract a model from it, types will be correctly inherited
export interface AuthorModel extends Model<AuthorPrivateDocument> {
    // Here you can add static methods to our Model
    findAuthorWithArticles: (id: string) => Promise<Override<Author, { articles: Article }>>
    checkCredentials: (email: string, pw: string) => Promise<AuthorPrivateDocument | null>
}


