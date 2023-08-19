import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HeaderFilesPreview from '../../../../../../components/chat/conversation/preview/files/header';
import configureMockStore from 'redux-mock-store';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import files from "./../../mocks/files.json"

const mockStore = configureMockStore([]);

describe('<HeaderFilesPreview />', () => {
    const customState = {
      chat: {
        files,
        actions: {
          clearFiles: () => {}
        },
      },
    };
    const store = mockStore(customState);

  it('should render the close icon', () => {
    render(
      <Provider store={store}>
        <HeaderFilesPreview activeIndex={0} />
      </Provider>,
    );

    expect(screen.getByTestId('close-icon')).toBeInTheDocument();
  });


//   it('should render the file name', () => {
//         render(
//           <Provider store={store}>
//             <HeaderFilesPreview activeIndex={0} />
//           </Provider>,
//         );

//   });
});
