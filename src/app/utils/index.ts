const bcrypt = require('bcrypt');
const saltRounds = 12;

export const hashPassword = (password: string): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => resolve(hash));
    });
  });
};
