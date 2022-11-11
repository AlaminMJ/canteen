import { jwt } from "../utils";

const isLogin = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth && !auth.startWith("Bearer")) {
    return next("You are not allow");
  }
  const token = auth.replace("Bearer ", "");

  const { _id, name, email } = jwt.verify(token);
  req.user = { _id, name, email };
  next();
};
export default isLogin;
