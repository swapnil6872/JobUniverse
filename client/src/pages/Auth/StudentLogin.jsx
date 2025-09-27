import React from "react";
import Button from "@mui/material/Button";
import HrOr from "../../components/HrOr";
import GoogleBtn from "../../components/GoogleBtn";
function StudentLogin() {
  return (
    <div className="mt-6">
      <div>
        {/* Google Button */}
        <GoogleBtn/>

        <HrOr />
         
        {/* <form action="">
          <div>
          <div>
            <label
              htmlFor="Email"
              className="block mb-1 text-sm text-gray-600  "
            >
              Email
            </label>
            <TextField
              label="johndoe@example.com"
              variant="outlined"
              fullWidth
              className="!mb-4 "
              id="Email"
               InputProps={{
                sx: {
                  height: "48px",           // same as Google button
                  borderRadius: "4px",
                  fontSize: "0.875rem",     // match button font size
                  paddingX: "14px",         // same horizontal padding
                },
              }}
              sx={{
                "& .MuiInputLabel-root": {
                  fontSize: "0.875rem",     // label font (optional tweak)
                  marginBottom: "2px",
                },
              }}
            />
            
          </div>

          <div>
            <label
              htmlFor="Password"
              className="block mb-1 text-sm text-gray-600  "
            >
              Password
            </label>
            <TextField

              label="Must be at least 6 characters"
              variant="outlined"
              fullWidth
              type="password"
              id="Password"
              className=""
               InputProps={{
                sx: {
                  height: "48px",           // same as Google button
                  borderRadius: "4px",
                  fontSize: "0.875rem",     // match button font size
                  paddingX: "14px",         // same horizontal padding
                },
              }}
              sx={{
                "& .MuiInputLabel-root": {
                  fontSize: "0.875rem",     // label font (optional tweak)
                  marginBottom: "2px",
                },
              }}
            />
          </div>
        </div>
        </form> */}
        
      </div>
    </div>
  );
}

export default StudentLogin;
