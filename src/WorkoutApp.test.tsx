import React from 'react';
import { render } from '@testing-library/react';
import WorkoutApp from './WorkoutApp';

test('renders learn react link', () => {
  const { getByText } = render(<WorkoutApp />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
