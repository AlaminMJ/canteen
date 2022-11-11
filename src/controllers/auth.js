import Joi from "joi";
import { jwt, bcrypt } from "../utils";
import createError from "http-errors";
import { JWT_REFRESH } from "../config";

const auth = {};
// register
auth.register = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const userSchema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6).max(15),
      confirmPassword: Joi.ref("password"),
    });
    const { error } = userSchema.validate({
      name,
      email,
      password,
      confirmPassword,
    });
    if (error) {
      return next(error);
    }
    const isExist = await User.findOne({ email: email });
    if (isExist) {
      return next(createError("User already exists"));
    }
    const hashed = await bcrypt.hash(password);
    const user = new User({
      name,
      email,
      password: hashed,
    });
    await user.save();
    const accessToken = jwt.sign({ _id: user._id, name, email });
    const refreshToken = jwt.sign(
      { _id: user._id, name, email },
      JWT_REFRESH,
      "30d"
    );
    return res.status(201).json({
      accessToken,
      refreshToken,
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    return next(error);
  }
};
export default auth;
