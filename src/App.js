import React from "react";
import Router from "./shared/Router";
import Layout  from "./Layout/Layout";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import backgroundImage from '../src/background.jpg';
function App() {
  const styles = {
    background: `url(${backgroundImage}) no-repeat center center fixed`,
    backgroundSize: 'cover',
    height: '100vh'
  };
  
  return (
    <>
    <Container maxWidth="sm">
        <Box sx={{ ...styles, bgcolor: 'black', height: '100vh' }} >
          <Layout>
            <Router />
          </Layout>
        </Box>
    </Container>

  </>
  )


}

export default App;