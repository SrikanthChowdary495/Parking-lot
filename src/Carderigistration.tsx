import React from 'react';
import './App.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import { parkinglotContext }  from './context/parkinglotContext'
function Carderigistration() {

  const {carInfo,makePayment } = React.useContext(parkinglotContext);
  const history = useNavigate();

  return (
    <div className="App">
          <Container fixed> 
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
     <Grid item xs={12} >
    <Card>
    <CardContent>
      <Typography variant="caption" display="block" data-testid="deregister-car-registrtion" gutterBottom>Car registrtion:{carInfo.carNumber}</Typography>
      <Typography variant="caption" display="block" data-testid="deregister-time-spent" gutterBottom>Time Spent in parking lot:{carInfo.spentTime}</Typography>
      <Typography variant="caption" display="block"  data-testid="deregister-charge" gutterBottom>Parking charges:{carInfo.charges}$</Typography>
      <Stack spacing={2} direction="row"  justifyContent='center'>
      <Button variant="contained" data-testid="deregister-back-button" onClick={()=>history('/')} >Back</Button> 
    <Button variant="contained" data-testid="deregister-payment-button" onClick={()=>makePayment(carInfo,history)}>Payment taken</Button>
    </Stack>
    </CardContent>
  </Card>
  </Grid>

        </Grid>
        </Box>
        </Container>
    </div>
  );
}

export default Carderigistration;