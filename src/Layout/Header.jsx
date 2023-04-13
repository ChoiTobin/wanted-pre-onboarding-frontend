import React from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
export const Header = () => {

  const navigate = useNavigate();
  const [value, setValue] = React.useState("one");
  const location = useLocation();
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    switch (location.pathname){
        case '/todos':
          setValue("one");
          break;
        case '/signin':
          setValue("two");
          break;
        case '/signup':
          setValue("three");
          break;
      }
  }, [ location ])


  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
          sx={{ 
            '& .Mui-selected': {
              color: 'gray',
              fontWeight:"800" 
            },
            '& .MuiTabs-indicator': {
              backgroundColor: 'gray',
            }
          }}
        >
          <Tab
            sx={{color:"white"}}
            value="one" label="할일"
            onClick={()=>{navigate("/todos")}}
          />
          <Tab value="two" label="로그인" 
                      sx={{color:"white"}}
               onClick={()=>{navigate("/signin")}}
          />
          <Tab value="three" label="회원가입"
                      sx={{color:"white"}}
                 onClick={()=>{navigate("/signup")}}
          />
        </Tabs>
      </Box>
    </>
  );
};
