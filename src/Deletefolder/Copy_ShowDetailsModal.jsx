import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
const ShowDetailsModal = ({ show, isOpen, onClose }) => {
  // Return null if show details are not available
  if (!show) {
    return null;
  }

  const { image, title, season, episodes } = show;

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Card
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          p: 3,
          minWidth: 300,
        }}
      >
        <CardMedia
          component="img"
          image={image}
          alt="image"
          sx={{
            width: '100%',
            height: 200,
            objectFit: 'cover',
          }}
        />
        <Typography variant="h6" mt={2} mb={1}>
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Season: {season}
        </Typography>

        {/* List of Episodes */}
        <List>
          {episodes.map((episode) => (
            <ListItem key={episode.id}>
              <ListItemText
                primary={`Episode ${episode.number}`}
                secondary={episode.title}
              />
            </ListItem>
          ))}
        </List>

        {/* Close Button */}
        <Button onClick={onClose} variant="contained" color="primary" mt={2}>
          Close
        </Button>
      </Card>
    </Modal>
  );
};

export default ShowDetailsModal;
