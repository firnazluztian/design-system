import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming/create';

const theme = create({
  base: 'light',
  brandTitle: 'TIXIA Design System',
  brandUrl: './',
  brandImage: './TixiaBlue.svg',
  brandTarget: '_self',
});

addons.setConfig({
  theme,
}); 