import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Login from '../../Login/index';

test('Test', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>,
  );
  const loadingElem = screen.getByText('Esqueceu sua senha?');
  expect(loadingElem).toBeInTheDocument();
});















