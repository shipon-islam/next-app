import connectMongo from "@/middleware/mongoose";
import profileModel from "@/models/profileModel";
import nextConnect from "next-connect";

const handler = nextConnect();
handler.get(async (req, res) => {
  try {
    await connectMongo();
    const data = await profileModel.findOneAndRemove({ _id: req.query.pid });
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
