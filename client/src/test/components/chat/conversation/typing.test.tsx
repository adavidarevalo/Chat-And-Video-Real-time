import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Typing from '../../../../components/chat/conversation/typing';


describe('Typing component', () => {
  it('renders the component correctly', async () => {
    render(<Typing />);

    expect(await screen.findByTestId('loader-container')).toBeInTheDocument();
    expect(await screen.findByTestId('triangle-icon')).toBeInTheDocument();
  });

});
