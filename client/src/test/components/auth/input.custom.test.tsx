import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UseFormRegister } from 'react-hook-form';
import '@testing-library/jest-dom/extend-expect';
import InputCustom from '../../../components/auth/input_custom';

describe('InputCustom', () => {
  const mockRegister: UseFormRegister<any> = jest.fn();
  it('renders input correctly', async () => {
    render(
      <InputCustom
        name="testInput"
        type="text"
        placeholder="Test Placeholder"
        register={mockRegister}
      />,
    );
    expect(await screen.findByTestId('input-custom')).toBeInTheDocument();
  });


  it('calls register with correct name', () => {
      render(
        <InputCustom
          name="testInput"
          type="text"
          placeholder="Test Placeholder"
          register={mockRegister}
        />,
      );

    const inputElement = screen.getByPlaceholderText('Test Placeholder');
    expect(mockRegister).toHaveBeenCalledWith('testInput');
    userEvent.type(inputElement, 'Test Value');
    expect(inputElement).toHaveValue('Test Value');
  });
});
