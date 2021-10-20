import React, { useState } from 'react';
import {
  Button,
  Backdrop,
  Fade,
  Modal
  } from '@mui/material';
import ComparisonTable from './comparisonTable.jsx';

const ComparisonModal = (props) => {

  const [open, setOpen] = useState(false);
  const { breeds } = props;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleOpen}>
        Compare Breeds
      </Button>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div sx={{
            backgroundColor: 'lightcoral',
            border: '1px solid #000',
            boxShadow: 5,
            padding: 2,
            margin: 5,
            zIndex: 1
          }}>
            <ComparisonTable />
          </div>
        </Fade>
      </Modal>
    </div>
  )

}

export default ComparisonModal;