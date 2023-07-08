'use client'
import React,{useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';



const style = {
  position: 'absolute' as 'absolute',
  top: '12%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};


function BasicTextFields() {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { },display:"flex"
      }}
    >
      <TextField  label="Search......."  sx={{backgroundColor:"gray",color:"black",width:"80%",border:"none !important",borderRadius:"0px !important",":hover":{backgroundColor:"darkgray",border:"none"},}} />
      <Button  sx={{width:"20%",backgroundColor:"brown",color:"black",fontWeight:"bold",borderRadius:"0px !important",":hover":{backgroundColor:"darkorange",borderRadius:"0px"}}}>Search</Button>
    </Box>
  );
}

export default function NestedModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}> <SearchIcon sx={{fontSize:"2rem",color:"white"}}/></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: "100%" ,backgroundColor:"transparent",border:"none",}}>
       <BasicTextFields/>
        </Box>
      </Modal>
    </div>
  );
}