// components/Item.js
import * as React from 'react';
import { CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import ShowDetailsModal from './ShowDetailsModal';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function SingleCard({ show, imageLoaded, onImageLoad }) {
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: 200,
      }}
    >
      {!imageLoaded && (
        <Skeleton variant="rectangular" width={200} height={200} />
      )}
      <CardMedia
        component="img"
        image={show.image}
        alt="image"
        onClick={handleModalOpen}
        onLoad={onImageLoad} // Call the provided callback when the image is loaded
        sx={{
          position: 'relative',
          width: 200,
          height: 200,
        }}
      />
      {/* Pass the modal open/close state and functions to the ShowDetailsModal component */}
      <ShowDetailsModal modalOpen={modalOpen} setModalOpen={handleModalClose} />{' '}
    </Card>
  );
}
