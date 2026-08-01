import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const token = req?.cookies?.token;

    if (!token) {
      throw new Error("NO token provided...");
    }

    const payload = jwt.sign(token, process.env.JWT_SECRET);
    req.user = payload;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const checkRole = (roles) => {
  try {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        throw new Error("Insufficeint Error");
      }
      next();
    };
  } catch (error) {
    next(error);
  }
};
