import React from 'react';
import {
  Button,
  Backdrop,
  Fade,
  Modal
  } from '@mui/material';
//import comparison table file

// const useStyles = makeStyles((theme) => ({
//   modal: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   paper: {
//     backgroundColor: 'lightcoral',
//     border: '1px solid #000',
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 3),
//   },
// }));

const ComparisonModal = (props) => {

  const [open, setOpen] = usetState(false);
  const { favoriteBreeds } = props;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleOpen}>
      </Button>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        // className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {/* <div className={classes.paper}> */}
          <div>
            <ComparisonTable favoriteBreeds={favoriteBreeds} />
          </div>
        </Fade>
      </Modal>
    </div>
  )

}

export default ComparisonModal;