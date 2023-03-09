import { model, models, Schema } from "mongoose";

const profileSchema = new Schema({
  user: { type: String, required: true },
  avatar: { type: String, required: true },
});
const profileModel = models.Profile || model("Profile", profileSchema);
export default profileModel;
