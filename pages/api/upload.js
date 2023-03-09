import connectMongo from "@/middleware/mongoose";
import profileModel from "@/models/profileModel";
import multer from "multer";
import nextConnect from "next-connect";

import path from "path";
const fileUploadMiddle = nextConnect();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname.replace(fileExt, "").toLowerCase().split("").join("") +
      "_" +
      Date.now();
    cb(null, fileName + fileExt);
  },
});
const upload = multer({ storage: storage });

const handler = nextConnect();

handler.use(upload.single("avatar"));

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
