import type { Preview } from '@storybook/react-vite'

// error if used, storybook works if this is commented but tailwind styling is not applied
import '../src/styles/globals.css' 

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/,
      },
    },
  },
};

export default preview;