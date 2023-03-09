import connectMongo from "@/middleware/mongoose";
import userModel from "@/models/userModel";
import bcrypt from "bcrypt";

const handler = async (req, res) => {
  await connectMongo();
  if (req.method === "POST") {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const user = await userModel.create({
      ...req.body,
      password: hashPassword,
    });

    res.status(200).json({ message: "signup successful" });
  }
};

export default handler;
