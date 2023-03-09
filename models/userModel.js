import { model, models, Schema } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});
const userModel = models.User || model("User", userSchema);
export default userModel;
