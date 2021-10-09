const bcrypt = require('bcrypt');
const saltRounds = 12;

/**
 * Create a hashed password
 * @param {string} password
 * @returns {Promise<string>}
 */
export const hashPassword = (password: string): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => resolve(hash));
    });
  });
};

/**
 * Compare password
 * @param {string} password
 * @param {string} hash
 * @returns {Promise<boolean>}
 */
export const comparePassword = (
  password: string,
  hash: string,
): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    bcrypt.compare(password, hash, (err, result) => {
      resolve(result);
    });
  });
};
