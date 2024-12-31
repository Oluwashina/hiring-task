import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TextInput from '../components/TextInput/index';

describe('TextInput', () => {
  const mockOnChange = jest.fn();
  const mockOnBlur = jest.fn();
  
  test('renders the input field', () => {
    render(
      <TextInput
        label="Username"
        name="username"
        value=""
        onChange={mockOnChange}
        onBlur={mockOnBlur}
        error={false}
      />
    );
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  });

  test('calls onChange handler', () => {
    render(
      <TextInput
        label="Username"
        name="username"
        value=""
        onChange={mockOnChange}
        onBlur={mockOnBlur}
        error={false}
      />
    );
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'test' } });
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  test('shows error message when error prop is passed', () => {
    render(
      <TextInput
        label="Username"
        name="username"
        value=""
        onChange={mockOnChange}
        onBlur={mockOnBlur}
        error="Username is required"
      />
    );
    expect(screen.getByText(/username is required/i)).toBeInTheDocument();
  });

  test('applies error styles when error is present', () => {
    render(
      <TextInput
        label="Username"
        name="username"
        value=""
        onChange={mockOnChange}
        onBlur={mockOnBlur}
        error="Username is required"
      />
    );
    const input = screen.getByLabelText(/username/i) as HTMLInputElement;
    expect(input).toHaveClass('border-[#B92043]');  // Assuming the error style is applied here
  });
});
