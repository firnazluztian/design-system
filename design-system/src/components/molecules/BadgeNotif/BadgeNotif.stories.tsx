import { BadgeNotif } from "./BadgeNotif";
import { Card } from '../../atoms/Card/Card';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from "../../../components/atoms/Button/Button";

const meta: Meta<typeof BadgeNotif> = {
    title: 'Molecules/BadgeNotif',
    component: BadgeNotif,
    parameters: {
        layout: 'centered',
      },
    tags: ['autodocs'],
    argTypes: {
        icon: {
            control: 'text',
            description: 'The icon name from Iconify',
        },
        color: {
            control: 'text',
            description: 'Color of the icon. Accepts a color name (primary, secondary, etc.) or a custom color value.',
        },
        value: {
            control: 'number',
            description: 'Content of badge (number only)',
        },
        maxValue: {
            control: 'number',
            description: 'Maximum number to display before showing maxValue+',
        },
        children: {
            control: false,
            description: 'Custom node to wrap (icon, card, etc)',
        },
    },
  };
  
  export default meta;
  type Story = StoryObj<typeof BadgeNotif>;

  export const WithIcon: Story = {
    args: {
      icon: 'mdi:bell-outline',
      color: 'primary',
      value: 10,
    }
  };

  export const WithCard: Story = {
    render: () => (
      <BadgeNotif value={5}>
        <Card style={{ width: 120, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span>Card Content</span>
        </Card>
      </BadgeNotif>
    )
  };

  export const DotOnly: Story = {
    args: {
      icon: 'mdi:bell-outline',
      color: 'primary',
      value: undefined,
    }
  };

  export const LongContent: Story = {
    args: {
      icon: 'mdi:bell-outline',
      color: 'primary',
      value: 12345,
    }
  };

  export const MaxValue: Story = {
    args: {
      icon: 'mdi:bell-outline',
      color: 'primary',
      value: 150,
      maxValue: 99,
    }
  };

  export const CustomNode: Story = {
    render: () => (
      <BadgeNotif value={100}>
        <Button>Click me</Button>
      </BadgeNotif>
    )
  };

  export const ColorVariants: Story = {
    render: () => {
      const variants = ['primary', 'secondary', 'danger', 'warning', 'info', 'success', 'disabled'] as const;
      return (
        <div className="flex gap-8">
          {variants.map((variant) => (
            <BadgeNotif
              key={variant}
              icon="mdi:bell-outline"
              color={variant}
              value={10}
            />
          ))}
        </div>
      );
    }
  };

