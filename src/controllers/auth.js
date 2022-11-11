import Joi from "joi";
import { jwt, bcrypt } from "../utils";
import createError from "http-errors";
import { JWT_REFRESH } from "../config";
import { User } from "../models";

const auth = {};
/**
 * register the authentication user
 */
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

/**
 *Login user
 * */
auth.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validate = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    const { error } = validate.validate({ email, password });
    if (error) {
      return next(error);
    }
    const user = await User.findOne({ email });
    if (!user) {
      return next(createError("User not found"));
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(createError("Invalid password"));
    }
    const accessToken = jwt.sign({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
    const refreshToken = jwt.sign(
      { _id: user._id, name: user.name, email: user.email },
      JWT_REFRESH,
      "30d"
    );
    return res.status(200).json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 *get refreshToken
 * */
auth.refreshToken = async (req, res, next) => {
  try {
  } catch (error) {
    return next(error);
  }
};

/**
 * validate  user email address
 * */
auth.validateEmail = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { email } = jwt.verify(token, JWT_REFRESH);
    if (!email) {
      return next(createError("Invalid Token"));
    }
    const user = await User.findOne({ email });
    if (!user) {
      return next(createError("User not found"));
    }
    if (user.isEmailVerified) {
      return next(createError("Email already verified"));
    }
    user.isEmailVerified = true;
    await user.save();
    return res.status(200).json({ message: "Verify successfully" });
  } catch (error) {
    return next(error);
  }
};
export default auth;
