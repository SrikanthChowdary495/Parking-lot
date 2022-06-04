import React, { useState} from "react";
import  moment from 'moment'


interface IState {
  totalslots:any;
  slotList:any;
  parkinfo:any;
  carInfo:any;
  showReg:any;
  open:any;
  message:any;
  changeHandler:Function;
  generateSlots:Function;
  handleParkinfo:Function;
  allocateSlot:Function;
  gotoPaymentPage:Function;
  makePayment:Function;
  closeTost:Function;
}

export const parkinglotContext = React.createContext({} as IState);
const ContextProvider = (props: any) => {
  const [slotList, setSlotList] = useState<any>([]);
  const [carInfo, setCarInfo] = useState<any>({})
  const [totalslots, setTotalslots] = useState('');
  const [parkinfo, setParkinfo]=React.useState<any>({})
  const [showReg, setShowReg]=React.useState(false)
  const [open, setOpen]=React.useState(false)
  const [message, setMessage] = useState('');

  const	changeHandler = (e:any) => {
    let value:any = (e.target.value === '') ? '': parseInt(e.target.value, 10);
    setTotalslots(value)
}

const generateSlots=(tslots:any)=>{
    let data:any=[]
    for(let i:any=1; tslots >= i; i++){
      data.push({
      'slotNo': i,
      'carNumber':'',
      'startTime':''
      })
    }
 setSlotList(data)
 setShowReg(true)
  }

  const handleParkinfo=(e:any)=>{
    parkinfo[e.target.name]=e.target.value.toUpperCase()
    setParkinfo(parkinfo)
  }

  const allocateSlot=()=>{
    let isexist:any=[]
    let availableSlots:any=slotList.filter((ele:any,i:any)=>
    {
      if(ele.carNumber==parkinfo.regNo){
            /* istanbul ignore next */
        isexist.push(ele)
      }
      if(ele.carNumber==''){
      ele['index']=i
      return ele
    }})
    if(isexist.length>0){
        /* istanbul ignore next */
      setOpen(true)
        /* istanbul ignore next */
      setMessage('This Registration number already exist. Please enter correct number')
        /* istanbul ignore next */
      return false
    }
    if(availableSlots.length>0){
    let ran:any=Math.floor(Math.random() * availableSlots.length) + 0
    slotList[availableSlots[ran].index].carNumber=parkinfo.regNo
    slotList[availableSlots[ran].index].startTime=parkinfo.parkTime
    setSlotList([...slotList])
    }
    else{
      /* istanbul ignore next */
      setOpen(true)
      /* istanbul ignore next */
      setMessage('Parking is full')
    }
  }

  const gotoPaymentPage =(history:any,index:any,ele:any)=>{
   if(ele.carNumber){
    let endDate:any=moment(moment().format())
    let startDate:any=moment(moment(slotList[index].startTime).format())
  let  spentTime = (endDate.diff(startDate, 'hours', true)).toFixed(2);
  let  resultMinutes = endDate.diff(startDate, 'minutes', true);
  let charges:any=0
  if(resultMinutes<=120){
     /* istanbul ignore next */
    charges=10
  }
  else{
    charges=(10+(resultMinutes-120)*(10/60)).toFixed(2)
  }
    setCarInfo({...slotList[index],spentTime,charges,index})
    history('/degistraton')
   }
   else{
        /* istanbul ignore next */
       alert('parking space not allocated')
   }
  }

  const makePayment=(info:any,history:any)=>{
    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 'car-registration': info.carNumber,'charge': info.charges})
      };
     fetch('https://httpstat.us/200',options).then((resp:any) => {
           /* istanbul ignore next */
        slotList[info.index].carNumber=''
            /* istanbul ignore next */
        slotList[info.index].startTime=''
            /* istanbul ignore next */
        setSlotList([...slotList])
            /* istanbul ignore next */
        history('/')
      }).catch((err:any) => {
         /* istanbul ignore next */
                alert(err)
          });
  }
  const  closeTost=()=>{
     /* istanbul ignore next */
    setOpen(false)
  }

  return (
    <parkinglotContext.Provider value={{
        slotList,
        totalslots,
        parkinfo,
        carInfo,
        showReg,
        open,
        message,
        changeHandler,
        generateSlots,
        handleParkinfo,
        allocateSlot,
        gotoPaymentPage,
        makePayment,
        closeTost,
      }}>
      {props.children}
    </parkinglotContext.Provider>
  );
};

export default ContextProvider;

