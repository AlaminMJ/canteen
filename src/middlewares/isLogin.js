import { jwt } from "../utils";
import createError from "http-errors";
import { JWT_REFRESH } from "../config";
import { User } from "../models";
const isLogin = (arr = []) => {
  return async (req, res, next) => {
    const auth = req.headers.authorization;

    if (!auth) {
      return next(createError(403, "You must be logged in"));
    }
    const token = auth.replace("Bearer ", "");

    const decode = jwt.verify(token, JWT_REFRESH);
    if (!decode) {
      return next(createError("unvalid token"));
    }
    const user = await User.findById(decode._id).select("-password");
    if (!user) {
      return next("user not found");
    }
    const isMatchRole = () => {
      if (arr.length > 0) {
        return arr.some((item) => item === user.role);
      }
      return true;
    };

    if (!isMatchRole()) {
      return res.status(401).json({ message: " role not match" });
    }
    req.user = user;
    next();
  };
};

export default isLogin;
