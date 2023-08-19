import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import Picture from '../../../components/auth/picture';

describe('<Picture/>', () => {
  it('renders without errors', async () => {
    render(
      <Picture
        readablePicture=""
        setPicture={() => {}}
        setReadablePicture={() => {}}
      />,
    );
    expect(await screen.findByTestId('upload-picture-component')).toBeInTheDocument();
  });

  it('displays readable picture', () => {
    render(
      <Picture
        readablePicture="sample-url"
        setPicture={() => {}}
        setReadablePicture={() => {}}
      />,
    );
    expect(screen.getByAltText('avatar')).toBeInTheDocument();
    expect(screen.getByText('Change')).toBeInTheDocument();
  });

  it('displays upload picture button', () => {
    render(
      <Picture
        readablePicture=""
        setPicture={() => {}}
        setReadablePicture={() => {}}
      />,
    );
    expect(screen.getByText('Upload Picture')).toBeInTheDocument();
  });

  it('displays error message for unsupported format', async () => {
    render(
      <Picture
        readablePicture=""
        setPicture={() => {}}
        setReadablePicture={() => {}}
      />,
    );
    const inputElement = screen.getByLabelText('Picture (Optional)');
    const unsupportedFile = new File(['unsupported'], 'unsupported.pdf', {
      type: 'application/pdf',
    });

    userEvent.upload(inputElement, unsupportedFile);

    await waitFor(() => {
      expect(
        screen.getByText('unsupported.pdf format is not supported.'),
      ).toBeInTheDocument();
    });
  });
});
