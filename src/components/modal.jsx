// BasicModal.jsx

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  color: 'black',
};

export default function BasicModal(props) {
  const { modalOpen, setModalOpen, modalData, setModalData, showId } = props;
  const [open, setOpen] = useState(false);

  const handleOpen = async () => {
    try {
      const response = await fetch(
        `https://podcast-api.netlify.app/id/${showId}`
      );
      const data = await response.json();

      setModalData(data);
      setOpen(true);
    } catch (error) {
      console.error('Error fetching podcast data:', error);
    }
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (showId) {
      handleOpen();
    }
  }, [showId]);

  return (
    <Modal
      open={open || modalOpen}
      onClose={() => {
        setModalOpen(false);
        handleClose();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {modalData?.title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {modalData?.description}
        </Typography>
        {modalData?.seasons.map((season) => (
          <div key={season.season}>
            <Typography variant="h6" sx={{ mt: 2 }}>
              {season.title}
            </Typography>
            {season.episodes.map((episode) => (
              <div key={episode.title}>
                <Typography sx={{ mt: 1 }}>{episode.title}</Typography>
                <Typography sx={{ mt: 1 }}>{episode.description}</Typography>
                <Button variant="contained" href={episode.file} sx={{ mt: 1 }}>
                  Listen
                </Button>
              </div>
            ))}
          </div>
        ))}
      </Box>
    </Modal>
  );
}
