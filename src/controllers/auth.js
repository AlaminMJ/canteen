import { User } from "../models";

const authController = {
  async getUser(req, res, next) {
    try {
      const user = await User.find();
      res.json(user);
      console.log("ok");
    } catch (error) {
      console.log(error);
    }
  },
};
export default authController;
