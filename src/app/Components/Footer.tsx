'use client'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Image from 'next/image';
import { Typography } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#0000',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Footer() {
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "black", marginTop: "20px" }}>
      <Grid container sx={{height:{lg:"250px",md:"250px",sm:"200px",xs:"200px"}}}>
        <Grid xs={3}>
          <Item sx={{ paddingTop: "20px", textAlign: "center" }}>
            <Image
              src="/netflix-clone.png"
              alt=''
              height={200}
              width={250}
              className='footer-img'
            />
          </Item>
        </Grid>
        <Grid xs={9}>
          <Item sx={{ display: "flex", justifyContent: "center", alignItems: "center", height:{lg:"250px",md:"250px",sm:"200px",xs:"200px"} }}>
            <Typography variant='h6' sx={{ color: "gray", fontSize: { xs: "14px", sm: "16px" } }}>copyright123@2023  || All <br /> Right Reserved.</Typography>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
