import { hash, genSalt, compare } from "bcryptjs";
const bcrypt = {
  // get hash
  async hash(str) {
    try {
      const solt = await genSalt(10);
      const hashed = await hash(str, solt);
      return hashed;
    } catch (error) {
      return error;
    }
  },
  //   compare
  async compare(s, hash) {
    try {
      const isMatch = await compare(s, hash);
      return isMatch;
    } catch (error) {
      return error;
    }
  },
};

export default bcrypt;
