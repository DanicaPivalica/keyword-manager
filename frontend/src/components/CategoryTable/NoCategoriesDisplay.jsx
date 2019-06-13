import React from 'react';
import {
  Typography,
} from '@material-ui/core';


const NoCategoriesDisplay = ({ show }) => {
  if (!show) return null;
  return (
    <Typography className="add-gutter" color="textSecondary" variant="subtitle2" align="center">
      You currently have no tags. Press the + button to get started.
    </Typography>
  );
}

export default NoCategoriesDisplay