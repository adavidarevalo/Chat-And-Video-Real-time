import { Meta, StoryObj } from '@storybook/react';
import CallArea from '../../../../../components/chat/conversation/call/area';
import moment from 'moment';

const withProvider = ({
  name,
  totalSecondsInCall,
  callAccepted,
}: {
  name: string;
  totalSecondsInCall:  moment.Duration;
  callAccepted: boolean;
}) => {
  return (
    <CallArea
      name={name}
      totalSecondsInCall={totalSecondsInCall}
      callAccepted={callAccepted}
      setTotalSecondsInCall={() => {}}
    />
  );
};

const meta = {
  title: 'Components/Chat/Conversation/Call/Area',
  component: withProvider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof withProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    name: 'Hello World!',
    totalSecondsInCall: moment.duration(0),
    callAccepted: true,
  },
};
