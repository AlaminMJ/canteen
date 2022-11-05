import Joi from "joi";
import { User } from "../models";

const authController = {
  //
  async register(req, res, next) {
    const { name, email, password, comfirmPassword } = req.body;
    const userSchma = Joi.object({
      name: Joi.string().required().trim().max(255).min(3),
      email: Joi.email().required(),
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
      const isExist = User.exists({ email });
      if (isExist) {
        return next("user Already exist");
      }
      user = new User({ name, email, password });
      user.save();
    } catch (error) {
      return next(error);
    }
    res.status(201).json(user);
  },

  //
};
export default authController;
