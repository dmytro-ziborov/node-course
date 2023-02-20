import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { Item, itemSchema } from "./item.model";
import uniqueValidator from "mongoose-unique-validator";

export interface IUser {
  login: string;
  password: string;
  items: Item[];
}

const userSchema = new Schema<IUser>(
  {
    login: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    items: [
      {
        type: itemSchema,
        default: [],
      },
    ],
  },
  { versionKey: false }
);

userSchema.plugin(uniqueValidator);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  bcrypt
    .hash(this.password, 10)
    .then((hash) => {
      this.password = hash;
      return next();
    })
    .catch((error) => {
      return next(error);
    });
});

export const User = model<IUser>("User", userSchema);
