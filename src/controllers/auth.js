import { User } from "../models";
import { bcrypt, jwt } from "../utils";
import { registerValidation } from "../validations";
import createError from "http-errors";

const authController = {
  //
  async register(req, res, next) {
    const { name, email, password, comfirmPassword } = req.body;
    const { error } = registerValidation({
      name,
      email,
      password,
      comfirmPassword,
    });
    if (error) {
      return next(error);
    }

    try {
      const isExist = await User.findOne({ email });
      if (isExist) {
        return next(createError("User already exists"));
      }
      const hash = await bcrypt.hash(password);
      const user = new User({
        name,
        email,
        password: hash,
      });
      user.save();
      const accessToken = signIn({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
      return res.status(201).json({ accessToken });
    } catch (error) {
      return next(error);
    }
  },

  //log in
  async login(req, res, next) {
    const { email, password } = req.body;
    const schma = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6).max(50),
    });
    const { error } = schma.validate({ email, password });
    if (error) {
      return next(error);
    }

    try {
      const user = await User.findOne({ email }).select("-password");
      console.log(user);
      if (!user) {
        return next("User not found");
      }
      const ismatch = await bcrypt.compare(password, user.password);
      if (!ismatch) {
        return next("password is not match");
      }
      const token = jwt.sign({ _id: user._id, name: user.name });
      return res.status(200).json({ token });
    } catch (error) {
      return next(error);
    }
  },
};
export default authController;
