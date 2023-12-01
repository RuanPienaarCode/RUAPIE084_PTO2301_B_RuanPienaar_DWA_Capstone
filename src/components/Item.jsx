// src/component//Item.js

import React, { useState } from 'react';
import { Card, CardMedia, Skeleton, Box } from '@mui/material';
import ShowDetailsModal from './ShowDetailsModal';

const SingleCard = ({ show, imageLoaded, onImageLoad }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 0,
        maxWidth: 240,
      }}
    >
      {!imageLoaded && <Skeleton variant="rectangular" width={0} height={0} />}
      <CardMedia
        component="img"
        image={show.image}
        alt="image"
        onClick={() => setModalOpen(true)}
        onLoad={onImageLoad}
      />
      <ShowDetailsModal
        modalOpen={modalOpen}
        setModalOpen={() => setModalOpen(false)}
      />
    </Card>
  );
};

export default SingleCard;
