import React from 'react';
import './App.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'; 
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { parkinglotContext }  from './context/parkinglotContext'
import Snackbar from '@mui/material/Snackbar';
function App() {

  const {totalslots,changeHandler,generateSlots,slotList,
    handleParkinfo,message,allocateSlot,gotoPaymentPage,showReg,open,closeTost } = React.useContext(parkinglotContext);
  const history = useNavigate();
  return (
    <>
    <div className="App">
          <Container fixed> 
   <Card >
      <CardContent>
      <Grid
  container
  direction="row"
  justifyContent="space-evenly"
  alignItems="center"
>
    <TextField value={totalslots} 
     inputProps={{ 'data-testid': 'parking-create-text-input' }} 
     onChange={(e:any)=>changeHandler(e)} 
     name="totalslots" 
     label="Enter number of spaces in parking lot" 
     variant="outlined" />
    <Button variant="contained" data-testid='parking-create-submit-button' onClick={()=>generateSlots(totalslots)}>Generate</Button>
  </Grid>
      </CardContent>
    </Card>
    <br/>
    <br/>
    {showReg && 
  <Card >
  <CardContent>
  <Grid
container
direction="row"
justifyContent="space-evenly"
alignItems="center"
>
  <TextField  
   label="Car registrtion number" name="regNo" 
   onChange={(e:any)=>handleParkinfo(e)}
   inputProps={{ 'data-testid': 'parking-drawing-registration-input' }} 
    variant="outlined" />
  <TextField  
 
    label="Parking time"
      type="datetime-local"  
       InputLabelProps={{
      shrink: true,
    }} name="parkTime"
     onChange={(e:any)=>handleParkinfo(e)} 
     inputProps={{ 'data-testid': 'parking-drawing-parktime-input' }}
     variant="outlined" />
  <Button variant="contained"  data-testid="parking-drawing-add-car-button" onClick={()=>allocateSlot()}>add</Button>
  </Grid>
  </CardContent>
</Card>
    }
  

    <br/>
    <br/>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
   {slotList && slotList.length>0 && slotList.map((ele:any,i:any)=>
     <Grid item xs={4}  key={ele.slotNo
     } data-testid={`parking-drawing-space-${ele?.slotNo}`}  onClick={()=>gotoPaymentPage(history,i,ele)}>
    <Card sx={{ maxWidth: 345 }}>
    <CardContent>
    <Typography variant="caption" display="block" gutterBottom data-testid={`parking-drawing-space-number-${ele?.slotNo}`}>Unique No:{ele?.slotNo}</Typography>
      <Typography variant="caption" display="block" gutterBottom data-testid={`parking-drawing-registered-${ele?.slotNo}`}>Car registrtion No:{ele?.carNumber}</Typography>
      <Typography variant="caption" display="block" gutterBottom>Parking time:{ele?.startTime}</Typography>
    {/* <Button variant="contained">Exit</Button> */}
    </CardContent>
  </Card>
  </Grid>
   )}
        </Grid>
        </Box>
        <Snackbar
        anchorOrigin={{ vertical:'top', horizontal:'center' }}
        open={open}
         /* istanbul ignore next */
        onClose={() =>  closeTost() }
        autoHideDuration={1000}
        message={message}
      />
        </Container>
    </div>
   
    </>
  );
}

export default App;
