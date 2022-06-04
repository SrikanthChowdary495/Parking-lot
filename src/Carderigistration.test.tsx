import React from 'react';
import { render, screen, within, act, fireEvent,} from '@testing-library/react';
import Carderigistration from './Carderigistration';
import ContextProvider from './context/parkinglotContext';
import {
  BrowserRouter,useNavigate
} from "react-router-dom";

const parkingDetails={'carNumber':'RTY J5U','startTime':1.30,'charges':10,'index':0}
const slotinfo={'slotNo': 1,'carNumber':'RTY J5U','startTime':'2022-05-27T01:50' }

const loginContext = {
  changeHandler: jest.fn(),
  generateSlots: jest.fn(),
  handleParkinfo: jest.fn(),
  allocateSlot: jest.fn(),
  gotoPaymentPage: jest.fn(),
  makePayment: jest.fn(),
  showReg:true,
  carInfo:parkingDetails,
  slotList:[slotinfo],
};
const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockHistoryPush,
}));

describe('test parking degstration funtionality', () => {
test('render parking degistration elements', () => {
  const { getByTestId } = render(<ContextProvider><BrowserRouter> <Carderigistration /></BrowserRouter></ContextProvider> );
  expect(getByTestId('deregister-car-registrtion')).toBeInTheDocument();
  expect(getByTestId('deregister-time-spent')).toBeInTheDocument();
  expect(getByTestId('deregister-charge')).toBeInTheDocument();
  expect(getByTestId('deregister-back-button')).toBeInTheDocument();
  expect(getByTestId('deregister-payment-button')).toBeInTheDocument(); 
});
test('test back button funtonality in parking degistration screen', async() => {
    const { getByTestId } = render(<ContextProvider><BrowserRouter> <Carderigistration /></BrowserRouter></ContextProvider> );
    const submit = getByTestId('deregister-back-button');
    await act(() => {
        fireEvent.click(submit);
      })
      await expect(mockHistoryPush).toHaveBeenCalledTimes(1);
  });
  test('test payment button funtonality in parking degistration screen', async() => {
  //   global.fetch = jest.fn(() =>
  //   Promise.resolve({
  //     json: () => Promise.resolve({'message':'sucess'}),
  //   })
  // )as jest.Mock;
    const { getByTestId } = render(<ContextProvider><BrowserRouter> <Carderigistration /></BrowserRouter></ContextProvider> );
    const submit = getByTestId('deregister-payment-button');
    await act(() => {
        fireEvent.click(submit);
      })
  });
});


