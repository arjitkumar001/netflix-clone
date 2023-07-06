import React from 'react';
import { Carousel as ReactCarousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Box } from '@mui/material';
import Image from 'next/image';

interface CarouselProps {
  items: string[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  return (
    <Box sx={{ maxWidth:"100%", margin: 'auto' }}>
      <ReactCarousel>
        {items.map((item, index) => (
          <Box key={index}>
            <Image src={item} alt={`Carousel Item ${index + 1}`} height={400} width={100} />
          </Box>
        ))}
      </ReactCarousel>
    </Box>
  );
};

export default Carousel;
