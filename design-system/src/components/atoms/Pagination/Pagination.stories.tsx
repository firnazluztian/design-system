import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pagination } from './Pagination';
import { useState } from 'react';

const meta: Meta<typeof Pagination> = {
  title: 'Atoms/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    currentPage: { control: 'number' },
    totalPages: { control: 'number' },
    siblingCount: { control: 'number' },
    onPageChange: { action: 'pageChanged' },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    siblingCount: 1,
    totalData: 100,
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    siblingCount: 1,
    totalData: 100,
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
    siblingCount: 1,
    totalData: 100,
  },
};

export const ManyPages: Story = {
  args: {
    currentPage: 1,
    totalPages: 20,
    siblingCount: 1,
    totalData: 100,
  },
};

export const CustomSiblingCount: Story = {
  args: {
    currentPage: 5,
    totalPages: 20,
    siblingCount: 2,
    totalData: 100,
  },
};

export const FewPages: Story = {
  args: {
    currentPage: 1,
    totalPages: 3,
    siblingCount: 1,
    totalData: 100,
  },
};

export const WithPerPageSelector: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const perPageOptions = [5, 10, 20, 50, 100];
    return (
      <Pagination
        {...args}
        currentPage={currentPage}
        totalPages={10}
        totalData={100}
        perPage={perPage}
        label="user"
        perPageOptions={perPageOptions}
        onPageChange={setCurrentPage}
        onPerPageChange={(val) => {
          setPerPage(val);
          setCurrentPage(1); // Reset to first page on perPage change
        }}
      />
    );
  },
  args: {
    siblingCount: 1,
  },
}; 