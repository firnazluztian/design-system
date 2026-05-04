import type { Meta, StoryObj } from '@storybook/react-vite';
import { SelectItem } from './SelectItem';

const meta = {
  title: 'Atoms/SelectItem',
  component: SelectItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SelectItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 'option1',
    children: 'Option 1',
  },
};

export const Selected: Story = {
  args: {
    value: 'option2',
    children: 'Option 2',
    selected: true,
  },
};

export const Disabled: Story = {
  args: {
    value: 'option3',
    children: 'Option 3',
    disabled: true,
  },
};

export const WithCustomContent: Story = {
  args: {
    value: 'option4',
    children: (
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-primary" />
        <span>Custom Option</span>
      </div>
    ),
  },
};
