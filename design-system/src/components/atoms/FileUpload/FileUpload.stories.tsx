import type { Meta, StoryObj } from '@storybook/react-vite';
import { FileUpload } from './FileUpload';
import { Button } from '../Button/Button';

const meta: Meta<typeof FileUpload> = {
  title: 'Atoms/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {
  args: {
    variant: 'default',
  },
};

export const WithButton: Story = {
  args: {
    showPlaceholder: false,
    showMaxSize: false,
    children: (
      <Button variant="primary" className="w-full" leftIcon="mdi:upload">
        Upload Files
      </Button>
    ),
  },
};

export const WithCustomButton: Story = {
  args: {
    showPlaceholder: false,
    showMaxSize: false,
    children: (
      <Button variant="success" className="w-full" leftIcon="mdi:file-upload">
        Select Files
      </Button>
    ),
  },
};

export const WithIconButton: Story = {
  args: {
    showPlaceholder: false,
    showMaxSize: false,
    children: (
      <Button variant="primary" className="w-12 h-12 p-0 rounded-full" leftIcon="mdi:upload">
      </Button>
    ),
  },
};

export const WithTextButton: Story = {
  args: {
    showPlaceholder: false,
    showMaxSize: false,
    children: (
      <Button variant="secondary" className="w-full">
        Choose Files
      </Button>
    ),
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
  },
};

export const Light: Story = {
  args: {
    variant: 'light',
  },
};

export const Dark: Story = {
  args: {
    variant: 'dark',
  },
};

export const WithShadow: Story = {
  args: {
    variant: 'primary',
    shadow: 'md',
  },
};

export const RoundedNone: Story = {
  args: {
    variant: 'primary',
    rounded: 'none',
  },
};

export const RoundedSmall: Story = {
  args: {
    variant: 'primary',
    rounded: 'sm',
  },
};

export const RoundedMedium: Story = {
  args: {
    variant: 'primary',
    rounded: 'md',
  },
};

export const RoundedLarge: Story = {
  args: {
    variant: 'primary',
    rounded: 'lg',
  },
};

export const RoundedExtraLarge: Story = {
  args: {
    variant: 'primary',
    rounded: 'xl',
  },
};

export const RoundedFull: Story = {
  args: {
    variant: 'primary',
    rounded: 'full',
  },
};

export const WithoutFileList: Story = {
  args: {
    variant: 'primary',
    showFileList: false,
  },
};

export const WithoutPlaceholder: Story = {
  args: {
    variant: 'primary',
    showPlaceholder: false,
  },
};

export const WithoutMaxSize: Story = {
  args: {
    variant: 'primary',
    showMaxSize: false,
  },
};

export const CustomIcon: Story = {
  args: {
    variant: 'primary',
    icon: 'mdi:file-upload',
  },
};

export const MultipleFiles: Story = {
  args: {
    variant: 'primary',
    multiple: true,
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
  },
};

export const WithCustomAccept: Story = {
  args: {
    variant: 'primary',
    accept: ['.jpg', '.png', '.pdf'],
    placeholder: 'Upload images or PDF files',
  },
};

export const WithCustomMaxSize: Story = {
  args: {
    variant: 'primary',
    maxSize: 2 * 1024 * 1024, // 2MB
  },
}; 