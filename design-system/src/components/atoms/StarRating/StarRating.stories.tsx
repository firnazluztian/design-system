import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { StarRating } from './StarRating';

const meta = {
  title: 'Atoms/StarRating',
  component: StarRating,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StarRating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    rating: 3,
  },
};

export const Small: Story = {
  args: {
    rating: 3,
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    rating: 3,
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    rating: 3,
    size: 'lg',
  },
};

export const PrimaryColor: Story = {
  args: {
    rating: 3,
    color: 'primary',
  },
};

export const WarningColor: Story = {
  args: {
    rating: 3,
    color: 'warning',
  },
};

export const DefaultColor: Story = {
  args: {
    rating: 3,
    color: 'default',
  },
};

export const ReadOnly: Story = {
  args: {
    rating: 3,
    readOnly: true,
  },
};

export const Interactive: Story = {
  args: {
    rating: 3,
    readOnly: false,
  },
  render: (args) => {
    const [rating, setRating] = React.useState(args.rating);
    return <StarRating {...args} rating={rating} onRatingChange={setRating} />;
  },
};

export const CustomMaxRating: Story = {
  args: {
    rating: 3,
    maxRating: 10,
  },
};

export const AllSizes: Story = {
  args: { rating: 5 }, // Add this line
  render: () => (
    <div className="flex flex-col gap-4">
      <StarRating rating={3} size="sm" />
      <StarRating rating={3} size="md" />
      <StarRating rating={3} size="lg" />
    </div>
  ),
};

export const AllColors: Story = {
  args: { rating: 5 }, // Add this line
  render: () => (
    <div className="flex flex-col gap-4">
      <StarRating rating={3} color="primary" />
      <StarRating rating={3} color="warning" />
      <StarRating rating={3} color="default" />
    </div>
  ),
}; 