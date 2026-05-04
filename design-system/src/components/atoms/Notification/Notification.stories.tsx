import type { Meta, StoryObj } from '@storybook/react-vite';
import { Notification } from './Notification';

const meta: Meta<typeof Notification> = {
  title: 'Atoms/Notification',
  component: Notification,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'danger', 'info'],
    },
    rounded: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'full'],
    },
    showClose: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Notification>;

export const Default: Story = {
  args: {
    title: 'Notification Title',
    children: 'This is a default notification message.',
  },
};

export const WithIcon: Story = {
  args: {
    title: 'Notification with Icon',
    children: 'This notification includes a custom icon.',
    icon: 'mdi:bell',
  },
};

export const WithCloseButton: Story = {
  args: {
    title: 'Notification with Close Button',
    children: 'This notification can be closed.',
    showClose: true,
  },
};

export const VariantExamples: Story = {
  render: () => (
    <div className="space-y-4">
      <Notification
        title="Default Notification"
        variant="default"
      >
        This is a default notification.
      </Notification>
      <Notification
        title="Primary Notification"
        variant="primary"
      >
        This is a primary notification.
      </Notification>
      <Notification
        title="Success Notification"
        variant="success"
      >
        This is a success notification.
      </Notification>
      <Notification
        title="Warning Notification"
        variant="warning"
      >
        This is a warning notification.
      </Notification>
      <Notification
        title="Danger Notification"
        variant="danger"
      >
        This is a danger notification.
      </Notification>
      <Notification
        title="Info Notification"
        variant="info"
      >
        This is an info notification.
      </Notification>
    </div>
  ),
};

export const RoundedVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Notification
        title="No Rounded"
        rounded="none"
      >
        This notification has no rounded corners.
      </Notification>
      <Notification
        title="Small Rounded"
        rounded="sm"
      >
        This notification has small rounded corners.
      </Notification>
      <Notification
        title="Medium Rounded"
        rounded="md"
      >
        This notification has medium rounded corners.
      </Notification>
      <Notification
        title="Large Rounded"
        rounded="lg"
      >
        This notification has large rounded corners.
      </Notification>
      <Notification
        title="Full Rounded"
        rounded="full"
      >
        This notification has fully rounded corners.
      </Notification>
    </div>
  ),
}; 