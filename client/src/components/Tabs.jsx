import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import StudentLogin from "../pages/Auth/StudentLogin";
import { useSelector ,useDispatch} from "react-redux";
import { setActive } from "../features/auth/authSlice";
import { useEffect } from "react";
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  const isActive = value === index;

  return (
    <div
      role="tabpanel"
      aria-hidden={!isActive}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      // IMPORTANT: force layout swap without relying on the `hidden` attr
      style={{ display: isActive ? "block" : "none" }}
      {...other}
    >
      <Box sx={{ p: 0 }}>{children}</Box>
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event, newValue) => setValue(newValue);
  const dispatch = useDispatch();
  console.log(value)

  useEffect(() => {
    dispatch(setActive(value));
  }, [value, dispatch]);
  
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="login tabs"
          variant="fullWidth"              // evenly splits the two tabs
        >
          <Tab label="Student" {...a11yProps(0)} />
          <Tab label="Employer / T&P" {...a11yProps(1)} />
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
        <StudentLogin />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
       <div className="py-3">
       </div>
      </CustomTabPanel>
    </Box>
  );
}



