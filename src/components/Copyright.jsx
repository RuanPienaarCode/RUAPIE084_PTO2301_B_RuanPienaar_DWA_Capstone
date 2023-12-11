import Typography from '@mui/material/Typography';

export default function Copyright(props) {
  return (
    <Typography variant="body2" color="secondary" align="center" {...props}>
      {'Copyright © '}
      {new Date().getFullYear()}
      {'.'}
      <br />
      All Rights Reserved
    </Typography>
  );
}
