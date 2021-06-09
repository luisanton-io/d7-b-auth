import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { Author, AuthorModel, AuthorPrivate, AuthorPrivateDocument } from "../typings";
import Override from "../typings/utils/override";
const { Schema, model } = mongoose;

const AuthorSchema = new Schema<AuthorPrivateDocument, AuthorModel>(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Minimum length must be 8 chars"],
      trim: true,
    },
    img: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["Admin", "User"],
      default: "User",
    },
    articles: [{ type: Schema.Types.ObjectId, ref: "Article" }],
  },
  { timestamps: true }
);

AuthorSchema.static("findAuthorWithArticles", async function (id: string) {
  const author = await this.findById(id).populate("articles");
  return author;
});

AuthorSchema.pre("save", async function (this: AuthorPrivateDocument, next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

AuthorSchema.statics.checkCredentials = async function (email: string, pw: string) {
  const user = await this.findOne({ email });
  if (user) {
    console.log(user);
    const isMatch = await bcrypt.compare(pw, user.password);
    if (isMatch) return user;
    else return null;
  } else return null;
};

AuthorSchema.methods.toJSON = function () {
  const user = this;

  const userObject = user.toObject();

  const _userObject: Override<AuthorPrivate, { password?: string, __v?: string }> = Object.assign({}, userObject)

  delete _userObject.password;
  delete _userObject.__v;
  return _userObject as Author;
};

export default model("Author", AuthorSchema);
