// Middleware to check if the user is authenticated    
// export const isLoggedIn = (req, res, next) => {
//       console.log(req.user);
//   if (req.isAuthenticated && req.isAuthenticated()) {
//       console.log("Authenticated User:", req.user);
//     return next(); //
//   }
//   return res.status(401).json({ success: false, message: "You must be logged in to access this resource" });
// };

export const isLoggedIn = (req, res, next) => {
      console.log(req.user + "!11111");
  if (req.isAuthenticated()) {
      console.log("Authenticated User:", req.user);
    return next(); //
  }
  return res.status(401).json({ success: false, message: "You must be logged in to access this resource" });
};

