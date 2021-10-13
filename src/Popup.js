import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import CardContent from '@mui/material/CardContent';
import Card from 'material-ui/Card';
import { Grid } from '@mui/material';
import { deepOrange, deepPurple } from '@mui/material/colors';

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
};

function Popup() {
    const [data, setData] = React.useState({
        fakeSpin: false,
        card1: '',
        card2: '',
        card3: '',
    })
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setData({fakeSpin: false})
    }
    
    const handleFakeSpin = () => {
        setData({fakeSpin: true})
    }

    const handleSpin = () => {
        let a = cardAllocate();
        let b = cardAllocate();
        let c = cardAllocate();
        console.log(a,b,c)
        setData((prevState) => {
            return {
              ...prevState,
                card1: a,
                card2: b,
                card3: c,
            };
          });
    }

    const cardAllocate = () => {
        let x = Math.floor(Math.random() * 4)
        if (x === 3) {
            return '♠'
        } else if ( x === 2) {
            return '♣'
        } else if ( x === 1) {
            return '♥'
        } else {
            return '♦'
        }
    }

  return (
      <div>
      <Button size='large' variant="contained" onClick={handleOpen}>Play Game</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
          >
              <Box sx={style}>
              <Grid container spacing={2} >
                  <Typography variant="h1" > {data.card1 ? data.card1 : null}</Typography>
                  <Typography variant="h1" > {data.card2 ? data.card2 : null}</Typography>
                  <Typography variant="h1" > {data.card3 ? data.card3 : null }</Typography>
            </Grid>
                {data.fakeSpin ? <h2> You got ♠♠♠ </h2> : null }
        <Stack direction="row" spacing={2}>
                      
        <Button variant="contained" onClick={handleSpin}>SPIN</Button>
                      
        <Button variant="contained" onClick={handleFakeSpin}>
            FAKE SPIN
        </Button>
        <Button variant="contained" onClick={handleClose}>
            Close Popup
        </Button>
        </Stack>
        </Box>
      </Modal>
    </div>
  );
}

export default Popup;


// if arr[0] == arr[1] and arr[1] == arr[2]:
//     #all equal
// elif arr[0] != arr[1] and arr[0] != arr[2] and arr[1] != arr[2]:
//     #all unequal
// else:
//     #two equal