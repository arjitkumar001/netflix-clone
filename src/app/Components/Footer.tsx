import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Link from 'next/link';
import { Container, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  boxShadow: "none"
}));

export default function RowAndColumnSpacing() {
  return (
    <Box sx={{ width: '100%' }} mt={10}>
      <Container maxWidth="lg">
        <Grid container rowSpacing={1}>
          <Grid item xs={6} sm={3} md={3} lg={3} >
            <Item sx={{ color: "gray", height: "250px", backgroundColor: "transparent", cursor: "pointer" }}>
              <Typography sx={{ textAlign: "right" }}>
                <FacebookIcon style={{ fontSize: "2rem", color: "gray", marginRight: "20px" }} />
                <InstagramIcon style={{ fontSize: "2rem", color: "gray", marginRight: "20px" }} />
                <TwitterIcon style={{ fontSize: "2rem", color: "gray", marginRight: "20px" }} />
                <YouTubeIcon style={{ fontSize: "2rem", color: "gray", marginRight: "20px" }} />
              </Typography>
              <Typography>
                <Link href="#" className='footer-link'>Audio Description</Link>
              </Typography>
              <Typography>
                <Link href="#" className='footer-link'>Investor Relations</Link>
              </Typography>
              <Typography>
                <Link href="#" className='footer-link'>Legal Notices</Link>
              </Typography>

              <Typography variant='body1'>
                @ 2023-2023 Netflix.
              </Typography>
            </Item>
          </Grid>
          <Grid item xs={6} sm={3} md={3} lg={3} >
            <Item sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "250px", backgroundColor: "transparent" }}>
              <Typography>
                <Link href="#" className='footer-link'>Help Center</Link>
              </Typography>
              <Typography>
                <Link href="#" className='footer-link'>Jobs</Link>
              </Typography>
              <Typography>
                <Link href="#" className='footer-link'>Cookies Preferences</Link>
              </Typography>
            </Item>
          </Grid>
          <Grid item xs={6} sm={3} md={3} lg={3} >
            <Item sx={{ height: "250px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "transparent" }}>
              <Typography>
                <Link href="#" className='footer-link'>Gift Card</Link>
              </Typography>
              <Typography>
                <Link href="#" className='footer-link'>Term of use</Link>
              </Typography>
              <Typography>
                <Link href="#" className='footer-link'>Corporate Information</Link>
              </Typography>
            </Item>
          </Grid>
          <Grid item xs={6} sm={3} md={3} lg={3} >
            <Item sx={{ height: "250px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "transparent" }}>
              <Typography>
                <Link href="#" className='footer-link'>Media Center</Link>
              </Typography>
              <Typography>
                <Link href="#" className='footer-link'>Privacy</Link>
              </Typography>
              <Typography>
                <Link href="#" className='footer-link'>Contact Us</Link>
              </Typography>
             
            </Item>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}