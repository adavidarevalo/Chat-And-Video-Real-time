import React from 'react';
import type { Preview } from '@storybook/react';
import './../src/index.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story, context) => {

        const body = document.querySelector('body');
        if (body) body.classList.add('dark');

      return <Story />;
    },
  ],
};

export default preview;
