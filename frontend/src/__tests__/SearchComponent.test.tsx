import { render, screen, fireEvent } from '@testing-library/react';
import SearchComponent from '../components/Search/index';

describe('SearchComponent', () => {
  test('renders with correct placeholder', () => {
    render(<SearchComponent handleChange={() => {}} searchValue="" placeholder="Search..." />);
    const inputElement = screen.getByPlaceholderText('Search...');
    expect(inputElement).toBeInTheDocument();
  });

  test('updates search value on input change', () => {
    const handleChange = jest.fn();
    render(<SearchComponent handleChange={handleChange} searchValue="Test" placeholder="Search..." />);
    const inputElement = screen.getByPlaceholderText('Search...');
    fireEvent.change(inputElement, { target: { value: 'New Search' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('displays the search icon', () => {
    render(<SearchComponent handleChange={() => {}} searchValue="" placeholder="Search..." />);
    const icon = screen.getByAltText('search');
    expect(icon).toBeInTheDocument();
  });
});
