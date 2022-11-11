import Joi from "joi";

const data = {
  name: "         Alamin ",
  password: "password",
  email: "al@gmail.com",
  confirmPassword: "password",
  age: 25,
};
const f = async () => {
  const valid = (dadta) => {
    const schma = Joi.object({
      name: Joi.string()
        .required()
        .max(8)
        .min(3)
        .trim()
        .lowercase()
        .uppercase(),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6).max(15),
      confirmPassword: Joi.ref("password"),
      age: Joi.number().max(25).min(20).required().equal(25),
    });
    return schma.validateAsync(dadta);
  };
  const result = await valid(data);
  console.log(result);
  console.log("hello");
};

f();
