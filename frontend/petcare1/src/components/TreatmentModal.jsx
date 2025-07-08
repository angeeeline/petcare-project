// components/TreatmentModal.jsx
import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import './TreatmentModal.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '12px',
};

const TreatmentModal = ({ open, treatment, onClose }) => {
  if (!treatment) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-title" variant="h6" component="h2">
          {treatment.title}
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 'bold' }}>
          Category:
        </Typography>
        <Typography>{treatment.category}</Typography>

        <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 'bold' }}>
          Pets Most Likely Affected:
        </Typography>
        <Typography>{treatment.pets}</Typography>

        <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 'bold' }}>
          Estimated Price:
        </Typography>
        <Typography>{treatment.price}</Typography>

        <Box sx={{ textAlign: 'right', mt: 3 }}>
          <Button variant="contained" onClick={onClose}>Close</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default TreatmentModal;
