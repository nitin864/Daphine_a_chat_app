import React from 'react'
import { Button } from '@mui/material'
import { auth } from '../firebase'
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
//import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
 
 
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
function SignOut() {
  
  const [user] = useAuthState(auth);
  const handleSignout = () => {
    auth.signOut()
}

  return (
    <Box  sx={{ flexGrow: 1  }}>
     
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Link style={{ padding: '20px', fontSize: '20px', borderRadius: '0', fontWeight: '600' }} to="/">Daphine</Link>
        <Link style={{ padding: '20px', fontSize: '20px', borderRadius: '0', fontWeight: '600' }} to="profile">Profile</Link>
        {user ? <Button variant="contained" color="error" onClick={handleSignout} >Logout</Button>:<div></div>}
      </Toolbar>
     
  </Box>
  )
}

export default SignOut
