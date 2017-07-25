const crypto = require('crypto');

hashPassword = (password) => {
  const hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
}

export default hashPassword;
