import React , {useState} from 'react';
import './App.css';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Popup from './Popup';
import { Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function Home() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [array, setArray] = useState([])
    const [open, setOpen] = React.useState(false);
    const [state, setState] = React.useState({
        balance: 0,
        account: 'Login',
    })

    const handleSubmit = () => {
        localStorage.setItem('user', username)
        localStorage.setItem('password', password)
        setOpen(false);
        setState((prevState) => {
            return {
              ...prevState,
                account: 'Logout',
                balance: 10,
            };
          });
        //const user = { username, password };
    
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleLogout = (e) => {
        setOpen(false);
        setArray([]);
        localStorage.removeItem('user');
        localStorage.removeItem('password');
        setState((prevState) => {
            return {
              ...prevState,
                account: 'Login',
            };
          });
    };

    const callBackFunction = (sum) => {
        if (sum !== 'better luck next time') {
            setArray([ ...array, sum ]);
            let updatedBalance = state.balance - 2 + sum
            setState((prevState) => {
                return {
                  ...prevState,
                    balance: updatedBalance,
                };
              });
        } else {
            setArray([ ...array, 0 ]);
            let updatedBalance = state.balance - 2
            setState((prevState) => {
                return {
                  ...prevState,
                  balance: updatedBalance,
                };
              });
        }
    }

  return (
    <div className="App">
          <header className="App-header">
          <Grid container spacing={2}>
            <Grid item xs={2}>
                <h1>Casino Royale</h1>
            </Grid>
            <Grid item xs={8} mt={1}>
                <h2>Balance $ { state.balance > 0 ? state.balance : 0 }</h2>
            </Grid>
              <Grid item xs={1} mt={3}>
                { state.account === 'Login' ?
                    <Button variant="contained" onClick={handleClickOpen}>
                        {state.account}
                          </Button> :
                          <Button variant="contained" onClick={handleLogout}>
                        {state.account}
                    </Button>
                }
                    <Dialog open={open} onClose={handleClose}>
                      <DialogTitle>Please Login to Continue...</DialogTitle>
                        <DialogContent>
                          <TextField
                            autoFocus
                            margin="dense"
                            id="email"
                            label="Email Address"
                                  type="email"
                                  value={username}
                            fullWidth
                                  variant="standard"
                                  onChange={({ target }) => setUsername(target.value)}
                              />
                          <TextField
                            autoFocus
                            margin="dense"
                            id="password"
                            label="Password"
                                  type="password"
                                  value={password}
                                  
                            fullWidth
                                  variant="standard"
                                  onChange={({ target }) => setPassword(target.value)}
                              />
             
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit" onClick={handleSubmit}>login</Button>
                        </DialogActions>
                    </Dialog>
                    
                  </Grid>
                  <Grid item xs={1} mt={3}>
                      <Avatar sx={{ bgcolor: deepOrange[500] }}>{ username ? username[0] : 'G' }</Avatar>
            </Grid>
      </Grid>
      </header>

          <section className='section'>
              { state.balance < 0  ? <h1>Game Over</h1> : 
              <Popup
                parentCallBackPopup={callBackFunction}
                balance={state.balance}
              /> }
              <div className='container' >
              <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table" mt={4 }>
                    <TableHead>
                    <TableRow>
                        <TableCell>Username</TableCell>
                        <TableCell align="right">Last game winning amount</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                {array.map((row) => (
                        <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        
                        {row !== '' ? <TableCell component="th" scope="row">
                            {username}
                        </TableCell>  : null }
                        {row !== '' ?  <TableCell align="right"> $ {row}</TableCell> : null }
                    </TableRow>
                      
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
                </div>

      </section>

      <footer className='footer'>
      <Grid container spacing={10} flexDirection="row"  justifyContent="flex-end">
            <Grid item xs={2}  >
                <Typography varient='h3'> © Copyright Vinit Kumar</Typography>
            </Grid>
            </Grid>
      </footer>
    </div>
  );
}

export default Home;