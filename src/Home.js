
import React , {useState , useEffect} from 'react';
import './App.css';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Popup from './Popup';
import { Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import axios from "axios";





function Home() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState()
    const [a, setA] = useState('');
    let array = [];
    const [state, setState] = React.useState({
        balance: 0,
        account: 'Login',
        money: 0,

    })
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
          const foundUser = JSON.parse(loggedInUser);
          setUser(foundUser);
        }
      }, []);

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
        const user = { username, password };
        // send the username and password to the server
        // set the state of the user
        // store the user in localStorage
        //localStorage.setItem('user', response.data)
    
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const nameHandler = (e) => {
        setState((prevState) => {
            return {
              ...prevState,
              name: e.target.value,
            };
          });
    }

    const handleLogout = (e) => {
        setOpen(false);
        //localStorage.clear()
        localStorage.removeItem('user');
        localStorage.removeItem('password');
        setState((prevState) => {
            return {
              ...prevState,
                account: 'Login',
                balance: 0,
            };
          });
    };

    const callBackFunction = (sum) => {
        if (sum !== 'better luck next time') {
            let x = state.balance - 2 + sum
            setState((prevState) => {
                return {
                  ...prevState,
                    balance: x,
                };
              });
        } else {
            let x = state.balance - 2
            setState((prevState) => {
                return {
                  ...prevState,
                  balance: x,
                };
              });
        }
        
        setA(sum)
        array.push(sum)
    }

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
      }
      
      const rows = [
        createData('Frozen yoghurt', 159, 6.0),
      ];




  return (

    <div className="App">
          <header className="App-header">
          <Grid container spacing={2}>
            <Grid item xs={2}>
                <h1>Casino Royale</h1>
            </Grid>
            <Grid item xs={8} mt={1}>
                      <h2>Balance $ { state.balance }</h2>
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

                              {/* <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username: </label>
      <input
        type="text"
        value={username}
        placeholder="enter a username"
        onChange={({ target }) => setUsername(target.value)}
      />
      <div>
        <label htmlFor="password">password: </label>
        <input
          type="password"
          value={password}
          placeholder="enter a password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
                              </form> */}
                              


                              
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
              { state.balance < 0  ? <h1>Game Over </h1> : 
              <Popup
                  parentCallBackPopup={callBackFunction}
              /> }
              <div className='container' >
              <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table" mt={4 }>
                    <TableHead>
                    <TableRow>
                        <TableCell>Player Name </TableCell>
                        <TableCell align="right">Balance</TableCell>
                        <TableCell align="right">Last Game</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell align="right">{row.calories}</TableCell>
                        <TableCell align="right">{row.fat}</TableCell>
                        <TableCell align="right">{row.carbs}</TableCell>
                        <TableCell align="right">{row.protein}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
                </div>

      </section>

      <footer className='footer'>
      <Grid container spacing={2}>
            <Grid item xs={2}>
                <Typography> Copyright Vinit Kumar</Typography>
            </Grid>
            </Grid>
      </footer>
    </div>
  );
}

export default Home;