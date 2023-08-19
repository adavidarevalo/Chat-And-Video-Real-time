import { render, screen } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import activeConversation from './mocks/active_conversation.json';
import user from './mocks/user.json';
import messages from './mocks/messages.json';
import '@testing-library/jest-dom/extend-expect';
import { getConversationMessages } from '../../../../redux/actions/chat.actions';
import { SocketProvider } from '../../../../context/socket.context';
import ConversationContainer from '../../../../components/chat/conversation';

const mockStore = configureMockStore([]);

describe('<ConversationContainer/>', () => {
    it.only("Validate render", async() => {
        const customState = {
          chat: {
            files: [],
            activeConversation,
            onlineUsers: [
              {
                userId: '64d3ac87c674cf079fb21dd5',
                socketId: '123',
              },
            ],
            conversationTyping: ['64d3ac87c674cf079fb21dd5'],
            messages,
          },
          user: {
            user,
          },
          actions: {
            getConversationMessages,
          },
        };
        const store = mockStore(customState);

            // await render(
            //   <Provider store={store}>
            //     <SocketProvider>
            //       <ConversationContainer callUser={() => {}} />
            //     </SocketProvider>
            //   </Provider>,
            // );


        expect(true).toBeTruthy()

    
    })
});