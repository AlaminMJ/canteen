import { sign, verify } from "jsonwebtoken";
import { JWT_SECRET } from "../config";
const jwt = {
  sign(payload, secret = JWT_SECRET, expiresIn = "5m") {
    const token = sign(payload, secret, { expiresIn });
    return token;
  },
  verify(token, secret = JWT_SECRET) {
    const data = verify(token, secret);
    return data;
  },
};
export default jwt;
