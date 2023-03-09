import multer from "multer";
import nextConnect from "next-connect";
import path from "path";
const fileUploadMiddle = nextConnect();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../public/uploads");
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

fileUploadMiddle.use(upload.single("avatar"));

export default fileUploadMiddle;
