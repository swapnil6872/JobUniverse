import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import Tabs from "../../components/Tabs";
import Form from "./Form";


// const style2 = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 450,
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   borderRadius: 1,
//   p: 4,
//   padding: "16px 24px",
// };

const style = {
  position: "absolute",
  top: "20%",                // 🔑 fixed distance from top of screen
  left: "50%",
  transform: "translateX(-50%)", // only center horizontally
  width: 384,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 1,
  p: 3,
};

function Login({ open, onClose }) {

    return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} >
        <Typography id="modal-modal-title" variant="h6" component="h2">

          <div className="flex justify-between flex-row-reverse text-gray-500 mb-1">
            <X onClick={onClose} />
          </div>
           
          <div className="flex justify-center">
            <Tabs />
          </div>
        </Typography>
        <div id="modal-modal-description" sx={{ mt: -1 }}>
          <Form  open={open} onClose={onClose} />
        </div >
      </Box>
    </Modal>
  );
}

export default Login;


