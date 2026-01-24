import jwt from "jsonwebtoken"

function authMiddleware(req, res, next) {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ status: "failure", message: "cookie not found, kindly login again" });
    }
    else {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded;
      return next();
    }
  }
  catch (err) {
    return res.status(401).json({ status: "failure", message: "session expired, kindly login again" });
  }
}

export default authMiddleware;

