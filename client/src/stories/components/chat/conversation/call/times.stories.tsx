import { Meta, StoryObj } from '@storybook/react';
import CallTimes from '../../../../../components/chat/conversation/call/times';
import moment from 'moment';

const withProvider = ({
  totalSecondsInCall,
  callAccepted,
}: {
  totalSecondsInCall: moment.Duration;
  callAccepted: boolean;
}) => {
  return (
    <CallTimes
      totalSecondsInCall={totalSecondsInCall}
      callAccepted={callAccepted}
      setTotalSecondsInCall={() => {}}
    />
  );
};

const meta = {
  title: 'Components/Chat/Conversation/Call/Times',
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
    totalSecondsInCall: moment.duration(0),
    callAccepted: true,
  },
};
