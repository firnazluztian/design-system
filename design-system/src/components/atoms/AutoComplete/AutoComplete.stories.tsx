import type { Meta, StoryObj } from '@storybook/react-vite';
import { AutoComplete } from './AutoComplete';
import { Icon } from '../../atoms/Icons/Icons';

const meta = {
  title: 'Atoms/AutoComplete',
  component: AutoComplete,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error', 'success', 'ghost', 'underline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    rounded: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'full'],
    },
    searchType: {
      control: 'select',
      options: ['include', 'startsWith'],
    },
    initialItemsToShow: {
      control: { type: 'number', min: 0, max: 100 },
    },
    itemsToLoad: {
      control: { type: 'number', min: 1, max: 50 },
    },
    maxDropdownHeight: {
      control: { type: 'number', min: 100, max: 600 },
    },
    noOptionsMessage: {
      control: 'text',
    },
    scrollMoreMessage: {
      control: 'text',
    },
    allOptionsShownMessage: {
      control: 'text',
    },
    resetInvalidOnBlur: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof AutoComplete>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'mango', label: 'Mango' },
  { value: 'strawberry', label: 'Strawberry' },
];

const countryOptions = [
  { value: 'india', label: 'India' },
  { value: 'indonesia', label: 'Indonesia' },
  { value: 'iran', label: 'Iran' },
  { value: 'iraq', label: 'Iraq' },
  { value: 'ireland', label: 'Ireland' },
  { value: 'israel', label: 'Israel' },
  { value: 'italy', label: 'Italy' },
  { value: 'ivory-coast', label: 'Ivory Coast' },
  { value: 'china', label: 'China' },
  { value: 'chile', label: 'Chile' },
  { value: 'canada', label: 'Canada' },
  { value: 'cambodia', label: 'Cambodia' },
  { value: 'brazil', label: 'Brazil' },
  { value: 'belgium', label: 'Belgium' },
  { value: 'bangladesh', label: 'Bangladesh' },
  { value: 'australia', label: 'Australia' },
  { value: 'austria', label: 'Austria' },
  { value: 'argentina', label: 'Argentina' },
];

// Large dataset for virtual scrolling demo
const largeCountryOptions = Array.from({ length: 200 }, (_, index) => ({
  value: `country-${index}`,
  label: `Country ${String.fromCharCode(65 + (index % 26))}${Math.floor(index / 26) + 1}`,
}));

// Basic Examples
export const Default: Story = {
  args: {
    options: countryOptions,
    placeholder: 'Search fruits...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Fruit Search',
    options: defaultOptions,
    placeholder: 'Search fruits...',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Fruit Search',
    options: defaultOptions,
    placeholder: 'Search fruits...',
    helperText: 'Type to search for fruits',
  },
};

// Variant Examples
export const WithError: Story = {
  args: {
    label: 'Fruit Search',
    options: defaultOptions,
    placeholder: 'Search fruits...',
    error: true,
    errorText: 'Please select a valid fruit',
  },
};

export const WithSuccess: Story = {
  args: {
    label: 'Fruit Search',
    options: defaultOptions,
    placeholder: 'Search fruits...',
    variant: 'success',
    value: 'apple',
  },
};

export const WithGhost: Story = {
  args: {
    label: 'Fruit Search',
    options: defaultOptions,
    placeholder: 'Search fruits...',
    variant: 'ghost',
  },
};

export const WithUnderline: Story = {
  args: {
    label: 'Fruit Search',
    options: defaultOptions,
    placeholder: 'Search fruits...',
    variant: 'underline',
  },
};

// Rounded Examples
export const RoundedVariants: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Search fruits...',
  },
  render: (args) => (
    <div className="space-y-4">
      <AutoComplete
        {...args}
        label="No Rounded"
        rounded="none"
      />
      <AutoComplete
        {...args}
        label="Small Rounded"
        rounded="sm"
      />
      <AutoComplete
        {...args}
        label="Medium Rounded"
        rounded="md"
      />
      <AutoComplete
        {...args}
        label="Large Rounded"
        rounded="lg"
      />
      <AutoComplete
        {...args}
        label="Extra Large Rounded"
        rounded="xl"
      />
      <AutoComplete
        {...args}
        label="2xl Rounded"
        rounded="2xl"
      />
      <AutoComplete
        {...args}
        label="3xl Rounded"
        rounded="3xl"
      />
      <AutoComplete
        {...args}
        label="Full Rounded"
        rounded="full"
      />
    </div>
  ),
};

// Size Examples
export const Small: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Search fruits...',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Search fruits...',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Search fruits...',
    size: 'lg',
  },
};

// Icon Examples
export const WithLeftIcon: Story = {
  args: {
    label: 'Fruit Search',
    options: defaultOptions,
    placeholder: 'Search fruits...',
    leftIcon: 'mdi:magnify',
  },
};

export const WithClearButton: Story = {
  args: {
    label: 'Fruit Search',
    options: defaultOptions,
    placeholder: 'Search fruits...',
    showClear: true,
  },
};

export const WithCustomOption: Story = {
  args: {
    label: 'Fruit Search',
    options: defaultOptions,
    placeholder: 'Search fruits...',
    renderOption: (option) => (
      <div className="flex items-center gap-2">
        <Icon icon="mdi:fruit-watermelon" className="h-4 w-4" />
        <span>{option.label}</span>
      </div>
    ),
  },
};

// State Examples
export const Loading: Story = {
  args: {
    label: 'Fruit Search',
    options: defaultOptions,
    placeholder: 'Search fruits...',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Fruit Search',
    options: defaultOptions,
    placeholder: 'Search fruits...',
    disabled: true,
  },
};

export const Required: Story = {
  args: {
    label: 'Fruit Search',
    options: defaultOptions,
    placeholder: 'Search fruits...',
    required: true,
  },
};

// Dropdown Position Examples
export const WithTopDropdown: Story = {
  args: {
    label: 'Fruit Search',
    options: defaultOptions,
    placeholder: 'Search fruits...',
  },
  render: (args) => (
    <div className="h-96 bg-gray-100 p-4 rounded flex items-end">
      <AutoComplete
        {...args}
        label="AutoComplete at Bottom (Will Flip to Top)"
      />
    </div>
  ),
};

// Form Example
export const FormExample: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Search fruits...',
  },
  render: (args) => (
    <div className="space-y-4 w-[400px]">
      <AutoComplete
        {...args}
        label="Fruit Search"
        variant="underline"
        showClear
      />
      <AutoComplete
        {...args}
        label="Vegetable Search"
        options={[
          { value: 'carrot', label: 'Carrot' },
          { value: 'broccoli', label: 'Broccoli' },
          { value: 'spinach', label: 'Spinach' },
        ]}
        placeholder="Search vegetables..."
        variant="underline"
        showClear
      />
    </div>
  ),
};

// Search Type Examples
export const SearchTypeInclude: Story = {
  args: {
    label: 'Country Search (Include)',
    options: countryOptions,
    placeholder: 'Search countries...',
    searchType: 'include',
    helperText: 'Searches for countries that contain the input anywhere in the name',
  },
};

export const SearchTypeStartsWith: Story = {
  args: {
    label: 'Country Search (Starts With)',
    options: countryOptions,
    placeholder: 'Search countries...',
    searchType: 'startsWith',
    helperText: 'Searches for countries that start with the input',
  },
};

export const SearchTypeComparison: Story = {
  args: {
    options: countryOptions,
    placeholder: 'Search countries...',
  },
  render: (args) => (
    <div className="space-y-4 w-[400px]">
      <AutoComplete
        {...args}
        label="Include Search"
        searchType="include"
        helperText="Type 'i' to see all countries containing 'i'"
      />
      <AutoComplete
        {...args}
        label="Starts With Search"
        searchType="startsWith"
        helperText="Type 'i' to see only countries starting with 'i'"
      />
    </div>
  ),
};

// Virtual Scrolling Examples
export const VirtualScrollingDefault: Story = {
  args: {
    label: 'Large Dataset (Virtual Scrolling)',
    options: largeCountryOptions,
    placeholder: 'Search countries...',
    initialItemsToShow: 10,
    itemsToLoad: 10,
    maxDropdownHeight: 200,
    helperText: 'Shows 10 items initially, loads 10 more when scrolling',
  },
};

export const VirtualScrollingCustom: Story = {
  args: {
    label: 'Custom Virtual Scrolling',
    options: largeCountryOptions,
    placeholder: 'Search countries...',
    initialItemsToShow: 5,
    itemsToLoad: 5,
    maxDropdownHeight: 150,
    helperText: 'Shows 5 items initially, loads 5 more when scrolling',
  },
};

export const VirtualScrollingComparison: Story = {
  args: {
    options: largeCountryOptions,
    placeholder: 'Search countries...',
  },
  render: (args) => (
    <div className="space-y-4 w-[400px]">
      <AutoComplete
        {...args}
        label="All Items (No Virtual Scrolling)"
        initialItemsToShow={0}
        helperText="Shows all 200 items at once (may be slow)"
      />
      <AutoComplete
        {...args}
        label="Virtual Scrolling (10 items)"
        initialItemsToShow={10}
        itemsToLoad={10}
        maxDropdownHeight={200}
        helperText="Shows 10 items initially, loads more on scroll"
      />
      <AutoComplete
        {...args}
        label="Virtual Scrolling (5 items)"
        initialItemsToShow={5}
        itemsToLoad={5}
        maxDropdownHeight={150}
        helperText="Shows 5 items initially, loads more on scroll"
      />
    </div>
  ),
};

// Custom Messages Examples
export const CustomMessages: Story = {
  args: {
    label: 'Custom Messages',
    options: countryOptions,
    placeholder: 'Search countries...',
    initialItemsToShow: 5,
    itemsToLoad: 5,
    maxDropdownHeight: 200,
    noOptionsMessage: '😔 No countries found matching your search',
    scrollMoreMessage: 'Load more countries ({current}/{total})',
    allOptionsShownMessage: '✨ All {total} countries displayed',
    helperText: 'Custom messages for different states',
  },
};

export const CustomNoOptionsMessage: Story = {
  args: {
    label: 'Custom No Options Message',
    options: [],
    placeholder: 'Search countries...',
    noOptionsMessage: (
      <div className="flex flex-col items-center gap-2 py-4">
        <div className="text-4xl">🌍</div>
        <div className="text-sm font-medium">No countries available</div>
        <div className="text-xs text-neutral-500">Try a different search term</div>
      </div>
    ),
    helperText: 'Custom React node for no options message',
  },
};

export const LocalizedMessages: Story = {
  args: {
    label: 'Localized Messages (Spanish)',
    options: countryOptions,
    placeholder: 'Buscar países...',
    initialItemsToShow: 5,
    itemsToLoad: 5,
    maxDropdownHeight: 200,
    noOptionsMessage: 'No se encontraron países',
    scrollMoreMessage: 'Cargar más países ({current} de {total})',
    allOptionsShownMessage: 'Todos los {total} países mostrados',
    helperText: 'Messages in Spanish',
  },
};

// Positioning Examples
export const PositioningExamples: Story = {
  args: {
    options: countryOptions,
    placeholder: 'Search countries...',
  },
  render: (args) => (
    <div className="space-y-4">
      <div className="h-96 bg-gray-100 p-4 rounded">
        <h3 className="text-sm font-medium mb-2">Top of Page - Dropdown Opens Below</h3>
        <AutoComplete
          {...args}
          label="AutoComplete at Top"
        />
      </div>
      
      <div className="h-96 bg-gray-100 p-4 rounded flex items-end">
        <h3 className="text-sm font-medium mb-2">Bottom of Page - Dropdown Opens Above</h3>
        <AutoComplete
          {...args}
          label="AutoComplete at Bottom"
        />
      </div>
      
      <div className="h-96 bg-gray-100 p-4 rounded flex items-center">
        <h3 className="text-sm font-medium mb-2">Middle of Page - Dropdown Opens Below</h3>
        <AutoComplete
          {...args}
          label="AutoComplete in Middle"
        />
      </div>
    </div>
  ),
};

// Smart Positioning Demo
export const SmartPositioningDemo: Story = {
  args: {
    options: countryOptions,
    placeholder: 'Search countries...',
  },
  render: (args) => (
    <div className="space-y-8">
      <div className="bg-blue-50 p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Smart Dropdown Positioning Demo</h2>
        <p className="text-sm text-gray-600 mb-4">
          This demo shows how the AutoComplete automatically positions its dropdown based on available space.
          Scroll down to see the dropdown flip from below to above the input when there's not enough space below.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AutoComplete
            {...args}
            label="Country Search"
            leftIcon="mdi:magnify"
            showClear
          />
          <AutoComplete
            label="Fruit Search"
            options={defaultOptions}
            placeholder="Search fruits..."
            leftIcon="mdi:fruit-watermelon"
            showClear
          />
        </div>
      </div>
      
      {/* Spacer content to create a long page */}
      <div className="space-y-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="bg-gray-50 p-4 rounded">
            <h3 className="font-medium">Content Section {i + 1}</h3>
            <p className="text-sm text-gray-600">
              This is placeholder content to create a long page and demonstrate the dropdown positioning behavior.
            </p>
          </div>
        ))}
      </div>
      
      {/* AutoComplete components at the bottom */}
      <div className="bg-green-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">AutoComplete at Bottom of Page</h3>
        <p className="text-sm text-gray-600 mb-4">
          These AutoComplete components are positioned at the bottom of the page. When opened, their dropdowns will appear above the inputs.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AutoComplete
            {...args}
            label="Country Search"
            leftIcon="mdi:earth"
            showClear
          />
          <AutoComplete
            label="Fruit Search"
            options={defaultOptions}
            placeholder="Search fruits..."
            leftIcon="mdi:fruit-watermelon"
            showClear
          />
          <AutoComplete
            label="Large Dataset"
            options={largeCountryOptions}
            placeholder="Search countries..."
            leftIcon="mdi:database"
            initialItemsToShow={10}
            itemsToLoad={10}
            maxDropdownHeight={200}
            showClear
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        inline: false,
        height: '800px',
        iframeHeight: 800,
      },
    },
  },
};

// Positioning with Different Heights
export const PositioningWithDifferentHeights: Story = {
  args: {
    options: countryOptions,
    placeholder: 'Search countries...',
  },
  render: (args) => (
    <div className="space-y-4">
      <div className="h-96 bg-gray-100 p-4 rounded">
        <h3 className="text-sm font-medium mb-2">Small Dropdown (150px) at Top</h3>
        <AutoComplete
          {...args}
          label="Small Dropdown"
          maxDropdownHeight={150}
        />
      </div>
      
      <div className="h-96 bg-gray-100 p-4 rounded flex items-end">
        <h3 className="text-sm font-medium mb-2">Large Dropdown (400px) at Bottom</h3>
        <AutoComplete
          {...args}
          label="Large Dropdown"
          maxDropdownHeight={400}
        />
      </div>
      
      <div className="h-96 bg-gray-100 p-4 rounded flex items-center">
        <h3 className="text-sm font-medium mb-2">Medium Dropdown (250px) in Middle</h3>
        <AutoComplete
          {...args}
          label="Medium Dropdown"
          maxDropdownHeight={250}
        />
      </div>
    </div>
  ),
};

// Keyboard Navigation Examples
export const KeyboardNavigation: Story = {
  args: {
    label: 'Keyboard Navigation Demo',
    options: countryOptions,
    placeholder: 'Type to search, then use Tab/Enter...',
    helperText: 'Use Tab/Enter to select single option, Escape to close',
  },
  parameters: {
    docs: {
      description: {
        story: `
## Keyboard Navigation Features

This AutoComplete component supports simplified keyboard navigation:

- **Enter**: Select the single matching option (if only one option matches)
- **Tab**: Select the single matching option (if only one option matches)
- **Escape**: Close dropdown

### Behavior:
- If only one option matches the search, pressing Tab/Enter will select it automatically
- If multiple options match, use mouse to click on the desired option
- Simple and intuitive keyboard interaction
        `,
      },
    },
  },
};

export const KeyboardNavigationSingleOption: Story = {
  args: {
    label: 'Single Option Auto-Selection',
    options: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'orange', label: 'Orange' },
    ],
    placeholder: 'Type "a" to see single option auto-selection...',
    helperText: 'When only one option matches, Tab/Enter will select it automatically',
  },
  parameters: {
    docs: {
      description: {
        story: `
## Single Option Auto-Selection

When the search results in only one matching option, the component will automatically select that option when you press Tab or Enter.

Try typing "a" in this example - you'll see only "Apple" matches, and pressing Tab or Enter will select it immediately.
        `,
      },
    },
  },
};

export const KeyboardNavigationLargeDataset: Story = {
  args: {
    label: 'Keyboard Navigation with Large Dataset',
    options: largeCountryOptions,
    placeholder: 'Search countries and use Tab/Enter...',
    initialItemsToShow: 10,
    itemsToLoad: 10,
    maxDropdownHeight: 200,
    helperText: 'Use Tab/Enter to select single option with virtual scrolling',
  },
  parameters: {
    docs: {
      description: {
        story: `
## Keyboard Navigation with Virtual Scrolling

This example demonstrates simplified keyboard navigation working with virtual scrolling:

- Use Tab/Enter to select the single matching option
- When multiple options match, use mouse to select
- Virtual scrolling still works for large datasets
- Simple and efficient interaction
        `,
      },
    },
  },
};

export const InvalidInputReset: Story = {
  args: {
    label: 'Invalid Input Reset on Blur',
    options: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'cherry', label: 'Cherry' },
      { value: 'date', label: 'Date' },
      { value: 'elderberry', label: 'Elderberry' },
    ],
    placeholder: 'Type a fruit name...',
    resetInvalidOnBlur: true,
    helperText: 'Try typing something not in the list, then click outside - it will reset to empty',
  },
  parameters: {
    docs: {
      description: {
        story: `
## Invalid Input Reset on Blur

This example demonstrates the \`resetInvalidOnBlur\` feature:

- Type a value that doesn't match any option (e.g., "grape")
- Click outside the input or press Tab to blur
- The input will automatically reset to empty
- This prevents users from submitting invalid values
- Useful for edit forms where you want to ensure only valid options are selected

**Use case**: When editing existing data, users might type invalid values thinking they've changed the selection, but the form would still submit the old value. This feature prevents that confusion.
        `,
      },
    },
  },
};
