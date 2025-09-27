// Middleware to check if the user is authenticated    
export const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next(); // user is logged in → continue
  }
  return res.status(401).json({ success: false, message: "You must be logged in" });
};
