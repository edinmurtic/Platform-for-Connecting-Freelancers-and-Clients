import React, { useState } from 'react';
import {cards} from '../../data.js'; // Pretpostavljamo da postoji datoteka data.js s podacima
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import { Link } from 'react-router-dom';
function CardSubCategory({category, subCategory ,img}) {
  return (
    <Link to={`/services?search=&subcategory=${subCategory}`}><Card sx={{ height: '280px', width:'280px'  }}>
    <CardCover>
      <img
        src={img}
        srcSet={img}
        loading="lazy"
        alt=""
      />
    </CardCover>
    <CardCover
      sx={{
        background:
          'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
      }}
    />
    <CardContent sx={{ justifyContent: 'flex-end' }}>
      <Typography level="title-lg" textColor="#fff">
          {subCategory}
      </Typography>
      <Typography
        startDecorator={<LocationOnRoundedIcon />}
        textColor="neutral.300"
      >
      {category}
      </Typography>
    </CardContent>
  </Card></Link>
  );
  }

export default CardSubCategory;
