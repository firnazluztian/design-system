import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';
import { Text } from '../Text/Text';
import { ErrorWrapper } from '../../molecules/ErrorWrapper/ErrorWrapper';

const meta = {
  title: 'Atoms/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'outline', 'ghost'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    shadow: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
    },
    rounded: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'],
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="space-y-4">
        <Text variant="heading3">Card Title</Text>
        <Text variant="body1">
          This is a card with some content. It can contain any type of content including text, images, or other components.
        </Text>
      </div>
    ),
    className: 'p-6 max-w-md',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ 
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap'
    }}>
      <Card variant="default">Default Card</Card>
      <Card variant="elevated">Elevated Card</Card>
      <Card variant="outline">Outline Card</Card>
      <Card variant="ghost">Ghost Card</Card>
    </div>
  ),
};

export const Shadows: Story = {
  render: () => (
    <div style={{ 
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap'
    }}>
      <Card shadow="none">No Shadow</Card>
      <Card shadow="sm">Small Shadow</Card>
      <Card shadow="md">Medium Shadow</Card>
      <Card shadow="lg">Large Shadow</Card>
      <Card shadow="xl">Extra Large Shadow</Card>
    </div>
  ),
};

export const Rounded: Story = {
  render: () => (
    <div style={{ 
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap'
    }}>
      <Card rounded="none">No Rounded</Card>
      <Card rounded="sm">Small Rounded</Card>
      <Card rounded="md">Medium Rounded</Card>
      <Card rounded="lg">Large Rounded</Card>
      <Card rounded="xl">Extra Large Rounded</Card>
      <Card rounded="2xl">2xl Rounded</Card>
      <Card rounded="3xl">3xl Rounded</Card>
      <Card rounded="full">Full Rounded</Card>
    </div>
  ),
};

export const PaddingOptions: Story = {
  render: () => (
    <div style={{ 
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap'
    }}>
      <Card padding="none">No Padding</Card>
      <Card padding="sm">Small Padding</Card>
      <Card padding="md">Medium Padding</Card>
      <Card padding="lg">Large Padding</Card>
    </div>
  ),
};

export const WithContent: Story = {
  render: () => (
    <Card shadow="lg" rounded="lg">
      <h3 style={{ margin: '0 0 1rem 0' }}>Card Title</h3>
      <p style={{ margin: 0 }}>
        This is a card with some content. It can contain any type of content including text, images, or other components.
      </p>
    </Card>
  ),
};

export const ErrorCard: Story = {
  render: () => (
    <Card shadow="lg" rounded="lg">
      <ErrorWrapper error={{
        code: "INFORMATION_UNAVAILABLE",
        message: "Data belum ada",
      }}>
      <h3 style={{ margin: '0 0 1rem 0' }}>Card Title</h3>
      <p style={{ margin: 0 }}>
        This is a card with some content. It can contain any type of content including text, images, or other components.
      </p>
      </ErrorWrapper>
    </Card>
  ),
};
