import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const ImageModal = ({ show, onImageLoad, onClick }) => {
  return (
    <Card onClick={() => onClick(show)} style={{ cursor: 'pointer' }}>
      <CardMedia
        component="img"
        alt={show.title}
        height="140"
        image={show.image}
        onLoad={onImageLoad}
      />
      <CardContent>
        <Typography variant="subtitle1">{show.title}</Typography>
      </CardContent>
    </Card>
  );
};

export default ImageModal;
