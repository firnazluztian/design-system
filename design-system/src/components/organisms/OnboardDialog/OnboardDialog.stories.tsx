import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import OnboardDialog, { OnboardStep } from './OnboardDialog';

const steps: OnboardStep[] = [
  {
    title: 'Onboarding title page 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    title: 'Onboarding title page 2',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    title: 'Onboarding title page 3',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    title: 'Onboarding title page 4',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
];

const meta: Meta<typeof OnboardDialog> = {
  title: 'Organisms/OnboardDialog',
  component: OnboardDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof OnboardDialog>;

export const InteractiveDemo: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [step, setStep] = React.useState(0);

    const handleOpen = () => {
      setStep(0);
      setIsOpen(true);
    };

    const handleClose = () => {
      setIsOpen(false);
    };

    return (
      <div className="flex flex-col items-center gap-4">
        <button
          className="px-4 py-2 bg-primary text-white rounded-md shadow hover:bg-primary-600 transition"
          onClick={handleOpen}
        >
          Start Onboarding
        </button>
        <OnboardDialog
          steps={steps}
          isOpen={isOpen}
          onClose={handleClose}
          onFinish={handleClose}
          onSkip={handleClose}
          _step={step}
          _setStep={setStep}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive onboarding demo. Click the button to start the onboarding flow.',
      },
    },
  },
};
