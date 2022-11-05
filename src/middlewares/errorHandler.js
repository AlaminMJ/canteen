import { ValidationError } from "joi";
const errorHandeler = (err, req, res, next) => {
  console.log(err);
  let status = 500;
  let message = { message: "internal server Error" };
  if (err instanceof ValidationError) {
    status = 403;
    message.message = err.message;
  }
  res.status(status).json(message);
};
export default errorHandeler;
