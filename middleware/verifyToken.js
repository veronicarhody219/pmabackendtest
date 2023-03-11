const jwt = require("jsonwebtoken");


async function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json("Unauthorized request");
  }
  let token = req.headers.authorization.split(" ")[1];
  if (token == null) {
    return res.status(401).json("Unauthorized request");
  }
  try {
  
    const payload = jwt.verify(token, process.env.SECRET);
    
    req.user = {user_id: payload.user._id, email: payload.user.email};
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json("Unauthorized request");
  }
}
module.exports = verifyToken;
