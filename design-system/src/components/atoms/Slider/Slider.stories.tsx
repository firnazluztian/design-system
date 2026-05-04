import type { Meta, StoryObj } from '@storybook/react-vite';
import { Slider } from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'Atoms/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    value: { control: 'object', description: 'number or [number, number] for range' },
    defaultValue: { control: 'object', description: 'number or [number, number] for range' },
    onChange: { action: 'valueChanged' },
    disabled: { control: 'boolean' },
    showValue: { control: 'boolean' },
    range: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 50,
  },
};

export const WithValue: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 50,
    showValue: true,
  },
};

export const WithMarks: Story = {
  args: {
    min: 0,
    max: 100,
    step: 10,
    defaultValue: 50,
    marks: [
      { value: 0, label: '0' },
      { value: 25, label: '25' },
      { value: 50, label: '50' },
      { value: 75, label: '75' },
      { value: 100, label: '100' },
    ],
  },
};

export const Disabled: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 50,
    disabled: true,
  },
};

export const CustomRange: Story = {
  args: {
    min: -100,
    max: 100,
    step: 10,
    defaultValue: 0,
    showValue: true,
  },
};

export const SmallSteps: Story = {
  args: {
    min: 0,
    max: 1,
    step: 0.1,
    defaultValue: 0.5,
    showValue: true,
  },
};

export const RangeSlider: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    defaultValue: [20, 80],
    showValue: true,
    range: true,
  },
}; 