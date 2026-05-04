import type { Meta, StoryObj } from "@storybook/react-vite";
import { InfiniteScroll } from "./InfiniteScroll";
import {
  useInfiniteQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Card } from "../../atoms/Card/Card";
import { Button } from "../../atoms/Button/Button";
import { Icon } from "../../atoms/Icons/Icons";
import { Dialog, DialogBody, DialogHeader, DialogTitle } from "../../atoms/Dialog/Dialog";
import { useState } from "react";

interface Item {
  id: number;
  title: string;
  description: string;
}

interface PageData {
  data: Item[];
  nextPage?: number;
}

// Create a client
const queryClient = new QueryClient();

// Create a decorator to wrap stories with QueryClientProvider
const withQueryClient = (Story: React.ComponentType) => (
  <QueryClientProvider client={queryClient}>
    <Story />
  </QueryClientProvider>
);

const meta: Meta<typeof InfiniteScroll> = {
  title: "Molecules/InfiniteScroll",
  component: InfiniteScroll,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [withQueryClient],
};

export default meta;
type Story = StoryObj<typeof InfiniteScroll>;

// Mock data generator
const generateMockData = (page: number): Item[] => {
  const items = Array.from({ length: 10 }, (_, i) => ({
    id: page * 10 + i,
    title: `Item ${page * 10 + i + 1}`,
    description: `This is a description for item ${page * 10 + i + 1}`,
  }));
  return items;
};

// Mock API function
const fetchItems = async ({ pageParam = 0 }): Promise<PageData> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const data = generateMockData(pageParam);
  return {
    data,
    nextPage: pageParam < 4 ? pageParam + 1 : undefined,
  };
};

// Example component using React Query
const InfiniteScrollWithReactQuery = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["items"],
      queryFn: fetchItems,
      getNextPageParam: (lastPage: PageData) => lastPage.nextPage,
      initialPageParam: 0,
    });

  const [open, setOpen] = useState(false);

  const items = data?.pages.flatMap((page: PageData) => page.data) ?? [];

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog isOpen={open} onClose={() => setOpen(false)}>
        <DialogHeader onClose={() => setOpen(false)}>
          <DialogTitle>Infinite Scroll Example</DialogTitle>
        </DialogHeader>
        <DialogBody className="max-h-[80vh] overflow-y-auto">
          <div className="">
            <InfiniteScroll
              data={items}
              hasNextPage={!!hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              fetchNextPage={() => fetchNextPage()}
              renderItem={(item: Item) => (
                <Card key={item.id} className="mb-4 hover:bg-primary-50">
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-neutral-600">{item.description}</p>
                  </div>
                </Card>
              )}
            />
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};

export const Default: Story = {
  render: () => <InfiniteScrollWithReactQuery />,
};

// Example with custom components
export const CustomComponents: Story = {
  render: () => {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
      useInfiniteQuery({
        queryKey: ["items-custom"],
        queryFn: fetchItems,
        getNextPageParam: (lastPage: PageData) => lastPage.nextPage,
        initialPageParam: 0,
      });

    const items = data?.pages.flatMap((page: PageData) => page.data) ?? [];

    const customLoadingComponent = (
      <div className="flex items-center justify-center gap-2 py-4">
        <Button variant="ghost" size="sm" isLoading>
          Loading more items...
        </Button>
      </div>
    );

    const customEmptyComponent = (
      <div className="flex flex-col items-center justify-center gap-4 py-8">
        <Icon
          icon="mdi:package-variant"
          size={48}
          className="text-primary"
        />
        <span className="text-lg font-medium text-neutral-700">
          No items available
        </span>
        <Button variant="outline" size="sm">
          Refresh
        </Button>
      </div>
    );

    const customEndComponent = (
      <div className="flex items-center justify-center gap-2 py-4">
        <Icon icon="mdi:check-circle" size={24} className="text-primary" />
        <span className="text-sm font-medium text-primary">
          You've reached the end
        </span>
      </div>
    );

    return (
      <div className="w-[400px]">
        <InfiniteScroll
          data={items}
          hasNextPage={!!hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={() => fetchNextPage()}
          renderItem={(item: Item) => (
            <Card key={item.id} className="mb-4">
              <div className="p-4">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-neutral-600">{item.description}</p>
              </div>
            </Card>
          )}
          loadingComponent={customLoadingComponent}
          emptyComponent={customEmptyComponent}
          endComponent={customEndComponent}
        />
      </div>
    );
  },
};
