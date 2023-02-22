import mongoose, { Types } from "mongoose";
import { Item } from "../database/models/item.model";
import { User } from "../database/models/user.model";
import { ResponseResult } from "../utils/responseResult";

const findUserByName = async (username: string) => {
  return User.findOne({ login: username });
};

const createItem = (text: string): Item => {
  return { _id: new mongoose.Types.ObjectId(), text: text, checked: false };
};

export const ItemService = {
  getUserItems: async (username: string) => {
    const user = await findUserByName(username);
    if (!user) {
      return ResponseResult.InternalServerError();
    }
    return ResponseResult.Ok({
      items: user.items.map((item) => ({
        id: item._id,
        text: item.text,
        checked: item.checked,
      })),
    });
  },
  createItem: async (username: string, text: string) => {
    const item: Item = createItem(text);
    await User.updateOne({ login: username }, { $push: { items: item } });

    return ResponseResult.Ok({ id: item._id });
  },
  editItem: async (
    username: string,
    id: string,
    text: string,
    checked: boolean
  ) => {
    await User.updateOne(
      {
        login: username,
        "items._id": new Types.ObjectId(id),
      },
      {
        $set: {
          "items.$.text": text,
          "items.$.checked": checked,
        },
      }
    );
    return ResponseResult.Ok();
  },

  deleteItem: async (username: string, id: string) => {
    await User.findOneAndUpdate(
      { login: username },
      {
        $pull: {
          items: { _id: id },
        },
      }
    );
    return ResponseResult.Ok();
  },
};
