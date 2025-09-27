import React from 'react'
import Button from "@mui/material/Button";

function GoogleBtn({style}) {
  return (
    <Button className={`!border !border-gray-400 w-full  ${style}`}>
          <i className="fab fa-google">
            <img
              src="../src/assets/img/google.svg"
                 className="h-3.5 mr-3"
              alt=""
            />
          </i>
          Login With Google
        </Button>
  )
}

export default GoogleBtn