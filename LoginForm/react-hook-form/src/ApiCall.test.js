import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ApiComponent from './ApiComponent'; 

global.fetch = jest.fn().mockResolvedValue({
  json: () => Promise.resolve({ success: true, message: 'Login successful' }),
});

test('it should make an API call and render the response', async () => {
  render(<ApiComponent />); 

  const usernameInput = screen.getByLabelText('Username');
  const passwordInput = screen.getByLabelText('Password');
  const submitButton = screen.getByText('Submit');


  userEvent.type(usernameInput, 'kminchelle');
  userEvent.type(passwordInput, '0lelplR');
  userEvent.click(submitButton);

 
});
