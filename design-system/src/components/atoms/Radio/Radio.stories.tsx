import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radio } from './Radio';

const meta: Meta<typeof Radio> = {
  title: 'Atoms/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onChange: { action: 'changed' },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: {
    label: 'Radio Option',
  },
};

export const Checked: Story = {
  args: {
    label: 'Checked Radio',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Radio',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled Checked Radio',
    checked: true,
    disabled: true,
  },
};

export const WithoutLabel: Story = {
  args: {},
};

export const RadioGroup: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Radio label="Option 1" name="group" value="1" />
      <Radio label="Option 2" name="group" value="2" />
      <Radio label="Option 3" name="group" value="3" />
    </div>
  ),
}; 