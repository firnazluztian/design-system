import type { Meta, StoryObj } from '@storybook/react-vite';
import { HorizontalCarousel } from './HorizontalCarousel';
import { Card } from '../../atoms/Card/Card';
import { Icon } from '../../atoms/Icons/Icons';

const meta: Meta<typeof HorizontalCarousel> = {
  title: 'Molecules/HorizontalCarousel',
  component: HorizontalCarousel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof HorizontalCarousel>;

const cardData = [
  {
    from: 'Jakarta',
    to: 'Denpasar',
    date: '24 Mei 2025',
    type: 'Economy',
    people: '1 Orang',
    icon: 'mdi:airplane',
  },
  {
    from: 'Jakarta',
    to: 'Denpasar',
    date: '05 Mei 2025 - 05 Mei 2025',
    type: 'Economy',
    people: '1 Orang',
    icon: 'mdi:airplane',
  },
  {
    from: 'Jakarta',
    to: 'Denpasar',
    date: '10 Mei 2025',
    type: 'Economy',
    people: '1 Orang',
    icon: 'mdi:airplane',
  },
  {
    from: 'Jakarta',
    to: 'Denpasar',
    date: '15 Mei 2025',
    type: 'Economy',
    people: '1 Orang',
    icon: 'mdi:airplane',
  },
];

const cards = cardData.map((item, idx) => (
  <Card key={idx} className="flex flex-col h-full min-h-[120px]">
    <div className="flex items-center justify-between p-4 pb-2">
      <Icon icon={item.icon} size={24} className="text-primary-900" />
      <Icon icon={item.icon} size={24} className="text-primary-900" />
    </div>
    <div className="px-4 pb-2">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-primary-900">{item.from}</span>
        <Icon icon="mdi:swap-horizontal" size={20} className="text-primary-900" />
        <span className="font-semibold text-primary-900">{item.to}</span>
      </div>
      <div className="text-sm text-neutral-600 mt-1">{item.type}</div>
    </div>
    <div className="flex items-center gap-2 px-4 pb-4 pt-2 text-xs text-neutral-700">
      <span>{item.date}</span>
      <span className="mx-1">•</span>
      <Icon icon="mdi:account" size={16} className="text-neutral-700" />
      <span>{item.people}</span>
    </div>
  </Card>
));

export const Default: Story = {
  render: () => <HorizontalCarousel>{cards}</HorizontalCarousel>,
}; 