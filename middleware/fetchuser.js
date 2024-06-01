import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const fetchuser = (req, res, next) => {
  // get the user from the jwt and add id to req object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};
export default fetchuser;
