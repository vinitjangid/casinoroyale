import React from 'react';
import { shallow } from 'enzyme';
import ReactDOM from 'react-dom';
import Popup from './Popup';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Popup />, div);
}); 
  

// describe("Popup", () => {
//   it("should render popup", () => {
//     render(<Popup />);  
//   });
// });