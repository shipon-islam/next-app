import { cloudUpload } from "@/middleware/cloudnary";
import fileUploadMiddle from "@/middleware/fileUploadMiddle";
import connectMongo from "@/middleware/mongoose";
import profileModel from "@/models/profileModel";
import nextConnect from "next-connect";

const handler = nextConnect();

handler.use(fileUploadMiddle);

handler.post(async (req, res) => {
  try {
    await connectMongo();
    const photo = await cloudUpload(req.file.path, "next");
    const data = await profileModel.create({
      user: "shipon islam",
      avatar: photo.url,
      public_id: photo.public_id,
    });
    res.send(data);
  } catch (err) {
    console.log(err);
  }
  //...
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
