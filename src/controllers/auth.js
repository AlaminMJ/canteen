import Joi from "joi";
import { User } from "../models";
import { bcrypt, jwt } from "../utils";

const authController = {
  //
  async register(req, res, next) {
    const { name, email, password, comfirmPassword } = req.body;
    const userSchma = Joi.object({
      name: Joi.string().required().trim().max(255).min(3),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6).max(50),
      comfirmPassword: Joi.ref(password),
    });

    const { error } = userSchma.validate({
      name,
      email,
      password,
      comfirmPassword,
    });
    if (error) {
      return next(error);
    }

    let user;
    try {
      const isExist = await User.exists({ email });
      if (isExist) {
        return next("user Already exist");
      }
      const hashedPassword = bcrypt.hash(password);
      user = new User({ name, email, password: hashedPassword });
      user.save();
    } catch (error) {
      return next(error);
    }
    const accessToken = jwt.sign({ _id: user._Id, name: user.name });
    res.status(201).json({ ...user._doc, accessToken });
  },

  //
};
export default authController;
