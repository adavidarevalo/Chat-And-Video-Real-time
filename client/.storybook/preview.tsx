import React from 'react'
import type { Preview } from '@storybook/react';
import ProviderWrapper from '../src/stories/providers/index';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    decorators: [(story) => <ProviderWrapper>{story()}</ProviderWrapper>],
  },
};

export default preview;
