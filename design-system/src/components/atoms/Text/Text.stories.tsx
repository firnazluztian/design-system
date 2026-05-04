import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from './Text';

const meta = {
  title: 'Atoms/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

// Display variants
export const Display1: Story = {
  args: {
    variant: 'display1',
    children: 'Display 1 Text',
  },
};

export const Display2: Story = {
  args: {
    variant: 'display2',
    children: 'Display 2 Text',
  },
};

// Heading variants
export const Heading1: Story = {
  args: {
    variant: 'heading1',
    children: 'Heading 1',
    as: 'h1',
  },
};

export const Heading2: Story = {
  args: {
    variant: 'heading2',
    children: 'Heading 2',
    as: 'h2',
  },
};

export const Heading3: Story = {
  args: {
    variant: 'heading3',
    children: 'Heading 3',
    as: 'h3',
  },
};

export const Heading4: Story = {
  args: {
    variant: 'heading4',
    children: 'Heading 4',
    as: 'h4',
  },
};

// Subtitle variants
export const Subtitle1: Story = {
  args: {
    variant: 'subtitle1',
    children: 'Subtitle 1 - Larger subtitle text',
  },
};

export const Subtitle2: Story = {
  args: {
    variant: 'subtitle2',
    children: 'Subtitle 2 - Secondary subtitle text',
  },
};

// Body text variants
export const Body1: Story = {
  args: {
    variant: 'body1',
    children: 'Body 1 - Primary body text with good readability for main content.',
    as: 'p',
  },
};

export const Body2: Story = {
  args: {
    variant: 'body2',
    children: 'Body 2 - Secondary body text for less emphasized content.',
    as: 'p',
  },
};

// Utility text variants
export const Caption: Story = {
  args: {
    variant: 'caption',
    children: 'Caption text for additional information',
  },
};

// Original variants
export const Label: Story = {
  args: {
    variant: 'label',
    children: 'Total Dipesan',
  },
};

export const Value: Story = {
  args: {
    variant: 'value',
    children: '11',
  },
};

// Example with custom className
export const CustomStyle: Story = {
  args: {
    variant: 'body1',
    children: 'Custom styled text',
    className: 'text-blue italic',
  },
}; 