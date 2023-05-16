const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: "auth token not present" });
  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRET, (err, payload) => {
    if (err) return res.status(401).json({ error: err.message });
    req.user = payload;
    console.log(req.user);
  });
  next();
};

const verifyUserToWrite = (req, res, next) => {
  if (req.user.role !== "write") {
    return res.status(403).json({ error: "You cannot create todos!!" });
  } else if (req.user.role == "write") {
    next();
  }
};

module.exports = { verifyUser, verifyUserToWrite };
