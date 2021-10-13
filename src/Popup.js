import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import { Grid } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
    width: 400,
  //height: 50,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 35,
  p: 10,
};

function Popup( props ) {
    const [data, setData] = React.useState({
        card1: '',
        card2: '',
        card3: '',
        sum:'',
    })
    const balance = props.balance;
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setData({fakeSpin: false})
    }
    
    const handleFakeSpin = () => {
        setData((prevState) => {
            return {
              ...prevState,
                card1: '♠',
                card2: '♠',
                card3: '♠',
            };
          });
    }

    const handleSpin = () => {
        debugger
        if (balance > 0) {
            let a = Math.floor(Math.random() * 4) + 1
            let b = Math.floor(Math.random() * 4) + 1
            let c = Math.floor(Math.random() * 4) + 1
            const x = cardAllocate(a)
            const y = cardAllocate(b)
            const z = cardAllocate(c)
            if (a === 4 && b === 4 && c === 4 ) {
                setData((prevState) => {
                    return {
                      ...prevState,
                        sum: 5
                    };
                  });
            } else if ( a === b && b === c ) {
                setData((prevState) => {
                    return {
                      ...prevState,
                        sum: 2
                    };
                  });
            } else if ( a !== b && b !== c && a !== c ) {
                setData((prevState) => {
                    return {
                      ...prevState,
                        sum: 'better luck next time'
                    };
                  });
            } else {
                setData((prevState) => {
                    return {
                      ...prevState,
                        sum: 0.5
                    };
                });
            }
                    
        setData((prevState) => {
            return {
              ...prevState,
                card1: x,
                card2: y,
                card3: z,
            };
        });
        } else {
            setOpen(false);
            setData((prevState) => {
                return {
                  ...prevState,
                    card1: '',
                    card2: '',
                    card3: '',
                    sum: '',
                };
            });
        }
        props.parentCallBackPopup(data.sum);
        
    }

    

    const cardAllocate = (x) => {
        if (x === 4) {
            return '♠'
        } else if ( x === 3) {
            return '♣'
        } else if ( x === 2) {
            return '♥'
        } else {
            return '♦'
        }
    }

  return (
      <div>
          <Button size='large' variant="contained" onClick={handleOpen}>Play Game</Button>
          <Box mt={3}/>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
          >
              <Box sx={style}>
              <Grid container spacing={1} direction="row" alignItems="center" justifyContent="center"  >
                      <Typography variant="h1" > {data.card1 ? data.card1 : null}</Typography>
                      <Box ml={3}/>
                      <Typography variant="h1" > {data.card2 ? data.card2 : null}</Typography>
                      <Box ml={3}/>
                  <Typography variant="h1" > {data.card3 ? data.card3 : null }</Typography>
                  </Grid>
                  <Grid container spacing={1} direction="row"  alignItems="center" justifyContent="center">
                  {data.sum > 0 ? <h2> You win $ {data.sum} </h2> : <h2> {data.sum}   </h2> }
                  </Grid>
        <Stack direction="row" spacing={2}>
            
        <Button size='large' variant="contained" onClick={handleSpin}>SPIN</Button>
                      
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