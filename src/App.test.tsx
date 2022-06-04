import React from 'react';
import { render, screen, within, act, fireEvent,} from '@testing-library/react';
import App from './App';
import ContextProvider from './context/parkinglotContext';
import {
  BrowserRouter,useNavigate
} from "react-router-dom";



const slotobj = { 'slotNo': 1,'carNumber':'TRE TYR','startTime':'2022-05-27T01:50'}

const loginContext = {
  changeHandler: jest.fn(),
  generateSlots: jest.fn(),
  handleParkinfo: jest.fn(),
  allocateSlot: jest.fn(),
  gotoPaymentPage: jest.fn(),
  makePayment: jest.fn(),
  showReg:true,
  totalslots:1,
  slotList:[slotobj],
};



const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockHistoryPush,
}));

describe('test parḷ̥king lot creation and drawing', () => {
test('renders  parking lot creation required fields', async() => {
  const { getByTestId } = render(<ContextProvider><BrowserRouter> <App /></BrowserRouter></ContextProvider> );
  const input=getByTestId('parking-create-text-input')
  const button=getByTestId('parking-create-submit-button')
  expect(input).toBeInTheDocument();
  expect(button).toBeInTheDocument();
  await act(() => {
    fireEvent.change(input,{target: {value: 1}});
  })
  await act(() => {
    fireEvent.click(button);
  })                                                                              
  expect(getByTestId('parking-drawing-registration-input')).toBeInTheDocument();
  expect(getByTestId('parking-drawing-add-car-button')).toBeInTheDocument();
});
test('renders park drawing required fields', async() => {
  const { getByTestId } = render(<ContextProvider><BrowserRouter> <App /></BrowserRouter></ContextProvider> );
  const input=getByTestId('parking-create-text-input')
  const button=getByTestId('parking-create-submit-button')
  await act(() => {
    fireEvent.change(input,{target: {value: 1}});
  })
  await act(() => {
    fireEvent.click(button);
  })  
  const pdinput = getByTestId('parking-drawing-registration-input');
  const pdtime = getByTestId('parking-drawing-parktime-input');
  const allocatebtn=getByTestId('parking-drawing-add-car-button')
  await act(() => {
    fireEvent.change(pdinput,{target: {value: 'TRE TYR',name:'regNo'}});
  })
  await act(() => {
    fireEvent.change(pdtime,{target: {value: '2022-05-27T01:50',name:'parkTime'}});
  })
  await act(() => {
    fireEvent.click(allocatebtn);
  }) 
  const pspace = getByTestId(`parking-drawing-space-${slotobj.slotNo}`)
  const pspaceNo = getByTestId(`parking-drawing-space-number-${slotobj.slotNo}`)
  const pcarNo = getByTestId(`parking-drawing-registered-${slotobj.slotNo}`)
  expect(await pspace).toBeInTheDocument();
  expect( await pspaceNo.innerHTML).toBe(`Unique No:${slotobj.slotNo}`);
  expect( await pcarNo.innerHTML).toBe(`Car registrtion No:${slotobj.carNumber}`);
  await act(() => {
    fireEvent.click(pspace);
  }) 
  await expect(mockHistoryPush).toHaveBeenCalledTimes(1);

});


});



