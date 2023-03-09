import jwt from "jsonwebtoken";
import nextConnect from "next-connect";
const protectMiddle = nextConnect();

protectMiddle.use((req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  }
});

export default protectMiddle;
