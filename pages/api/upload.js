import connectMongo from "@/middleware/mongoose";
import profileModel from "@/models/profileModel";
import nextConnect from "next-connect";
import fileUploadMiddle from "../../middleware/fileUploadMiddle";

const handler = nextConnect();
handler.use(fileUploadMiddle);

handler.post(async (req, res) => {
  try {
    await connectMongo();
    const data = await profileModel.create({
      user: "shipon islam",
      avatar: req.file.filename,
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
