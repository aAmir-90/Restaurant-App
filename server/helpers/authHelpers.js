const bcrypt = require("bcrypt");

// compare password
exports.comparePassword = (password, hashed) => {
  return bcrypt.compare(password, hashed);
};

// Async Await ===>>>
exports.hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (err) {
    throw err;
  }
};
