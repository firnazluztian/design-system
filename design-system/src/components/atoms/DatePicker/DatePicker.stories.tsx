import type { Meta, StoryObj } from "@storybook/react-vite";
import { DatePicker } from "./DatePicker";
import { PrimitiveDatePicker } from "./PrimitiveDatePicker";

const meta: Meta<typeof DatePicker> = {
  title: "Atoms/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "error", "success", "ghost", "underline"],
      description: "The visual style variant of the date picker",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "The size of the date picker",
    },
    rounded: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl", "2xl", "3xl", "full"],
      description: "The border radius of the date picker",
    },
    labelPlacement: {
      control: "select",
      options: ["top", "left"],
      description: "The placement of the label",
    },
    disabled: {
      control: "boolean",
      description: "Whether the date picker is disabled",
    },
    required: {
      control: "boolean",
      description: "Whether the date picker is required",
    },
    fullWidth: {
      control: "boolean",
      description: "Whether the date picker should take full width",
    },
    monthsToShow: {
      control: "select",
      options: [1, 2],
      description: "Number of months to show in the calendar (affects positioning calculation)",
    },
    mode: {
      control: "select",
      options: ["single", "range"],
      description: "The selection mode of the date picker",
    },
    minDate: {
      control: "date",
      description: "The minimum selectable date",
    },
    maxDate: {
      control: "date",
      description: "The maximum selectable date",
    },
    leftIcon: {
      control: "text",
      description: "Icon to show on the left side of the input",
    },
    rightIcon: {
      control: "text",
      description: "Icon to show on the right side of the input",
    },
    closeOnSelect: {
      control: "boolean",
      description: "Whether to close the calendar on date selection",
    },
    format: {
      control: "select",
      options: ["DD-MM-YYYY", "YYYY-MM-DD", "MM-DD-YYYY"],
      description: "Date format for input display and parsing",
    },
    allowInput: {
      control: "boolean",
      description: "Whether to allow manual input typing",
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Examples
export const Single: Story = {
  args: {
    label: "Single Date",
    placeholder: "Select date",
    mode: "single",
    leftIcon: "mdi:calendar",
    rightIcon: "mdi:chevron-down",
  },
};

export const Range: Story = {
  args: {
    label: "Date Range",
    placeholder: "Select date range",
    mode: "range",
    leftIcon: "mdi:calendar",
    rightIcon: "mdi:chevron-down",
  },
};

// Variant Examples
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <DatePicker
        label="Default"
        variant="default"
        placeholder="Select date"
        mode="single"
      />
      <DatePicker
        label="Error"
        variant="error"
        errorText="Invalid date"
        placeholder="Select date"
        mode="single"
      />
      <DatePicker
        label="Success"
        variant="success"
        placeholder="Select date"
        mode="single"
      />
      <DatePicker
        label="Ghost"
        variant="ghost"
        placeholder="Select date"
        mode="single"
      />
      <DatePicker
        label="Underline"
        variant="underline"
        placeholder="Select date"
        mode="single"
      />
    </div>
  ),
};

// Size Examples
export const SizeVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <DatePicker label="Small" size="sm" placeholder="Select date" />
      <DatePicker label="Medium" size="md" placeholder="Select date" />
      <DatePicker label="Large" size="lg" placeholder="Select date" />
    </div>
  ),
};

// Rounded Examples
export const RoundedVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <DatePicker label="No Rounded" rounded="none" placeholder="Select date" />
      <DatePicker label="Small Rounded" rounded="sm" placeholder="Select date" />
      <DatePicker label="Medium Rounded" rounded="md" placeholder="Select date" />
      <DatePicker label="Large Rounded" rounded="lg" placeholder="Select date" />
      <DatePicker label="Extra Large Rounded" rounded="xl" placeholder="Select date" />
      <DatePicker label="2xl Rounded" rounded="2xl" placeholder="Select date" />
      <DatePicker label="3xl Rounded" rounded="3xl" placeholder="Select date" />
      <DatePicker label="Full Rounded" rounded="full" placeholder="Select date" />
    </div>
  ),
};

// Layout Examples
export const LayoutExamples: Story = {
  render: () => (
    <div className="space-y-4">
      <DatePicker label="Top Label" labelPlacement="top" placeholder="Select date" />
      <DatePicker label="Left Label" labelPlacement="left" placeholder="Select date" />
      <DatePicker label="Full Width" fullWidth placeholder="Select date" />
    </div>
  ),
};

// Calendar Examples
export const CalendarExamples: Story = {
  render: () => (
    <div className="space-y-4">
      <DatePicker
        label="Single Month"
        monthsToShow={1}
        placeholder="Select date"
      />
      <DatePicker
        label="Two Months"
        monthsToShow={2}
        placeholder="Select date"
      />
      <DatePicker
        label="With Min/Max Dates"
        minDate={new Date(2024, 0, 1)}
        maxDate={new Date(2024, 11, 31)}
        placeholder="Select date"
      />
    </div>
  ),
};

// State Examples
export const StateExamples: Story = {
  render: () => (
    <div className="space-y-4">
      <DatePicker
        label="Required"
        required
        placeholder="Select date"
      />
      <DatePicker
        label="Disabled"
        disabled
        placeholder="Select date"
      />
      <DatePicker
        label="With Error"
        error
        errorText="Please select a valid date"
        placeholder="Select date"
      />
      <DatePicker
        label="With Helper Text"
        helperText="Select a date within the next 30 days"
        placeholder="Select date"
      />
    </div>
  ),
};

// Icon Examples
export const IconExamples: Story = {
  render: () => (
    <div className="space-y-4">
      <DatePicker
        label="Left Icon Only"
        leftIcon="mdi:calendar"
        placeholder="Select date"
      />
      <DatePicker
        label="Right Icon Only"
        rightIcon="mdi:chevron-down"
        placeholder="Select date"
      />
      <DatePicker
        label="Both Icons"
        leftIcon="mdi:calendar"
        rightIcon="mdi:chevron-down"
        placeholder="Select date"
      />
    </div>
  ),
};

// Range Examples
export const RangeExamples: Story = {
  render: () => (
    <div className="space-y-4">
      <DatePicker
        label="Basic Range"
        mode="range"
        placeholder="Select date range"
      />
      <DatePicker
        label="Range with Two Months"
        mode="range"
        monthsToShow={2}
        placeholder="Select date range"
      />
      <DatePicker
        label="Range with Min/Max"
        mode="range"
        minDate={new Date(2024, 0, 1)}
        maxDate={new Date(2024, 11, 31)}
        placeholder="Select date range"
      />
      <DatePicker
        label="Range with Error"
        mode="range"
        error
        errorText="Please select a valid date range"
        placeholder="Select date range"
      />
    </div>
  ),
};

// Input Examples
export const InputExamples: Story = {
  render: () => (
    <div className="space-y-4">
      <DatePicker
        label="Manual Input - DD-MM-YYYY"
        allowInput
        format="DD-MM-YYYY"
        placeholder="DD-MM-YYYY"
      />
      <DatePicker
        label="Manual Input - YYYY-MM-DD"
        allowInput
        format="YYYY-MM-DD"
        placeholder="YYYY-MM-DD"
      />
      <DatePicker
        label="Manual Input - MM-DD-YYYY"
        allowInput
        format="MM-DD-YYYY"
        placeholder="MM-DD-YYYY"
      />
      <DatePicker
        label="Manual Input with Min/Max"
        allowInput
        format="DD-MM-YYYY"
        minDate={new Date(2024, 0, 1)}
        maxDate={new Date(2024, 11, 31)}
        placeholder="DD-MM-YYYY"
      />
    </div>
  ),
};

// Format Examples
export const FormatExamples: Story = {
  render: () => (
    <div className="space-y-4">
      <DatePicker
        label="DD-MM-YYYY Format"
        format="DD-MM-YYYY"
        placeholder="DD-MM-YYYY"
      />
      <DatePicker
        label="YYYY-MM-DD Format"
        format="YYYY-MM-DD"
        placeholder="YYYY-MM-DD"
      />
      <DatePicker
        label="MM-DD-YYYY Format"
        format="MM-DD-YYYY"
        placeholder="MM-DD-YYYY"
      />
    </div>
  ),
};

// Primitive Examples
export const PrimitiveExamples: Story = {
  render: () => (
    <div className="space-y-4">
      <PrimitiveDatePicker
        label="Basic Primitive"
        placeholder="Select date"
      />
      <PrimitiveDatePicker
        label="Primitive with Icons"
        leftIcon="mdi:calendar"
        rightIcon="mdi:chevron-down"
        placeholder="Select date"
      />
      <PrimitiveDatePicker
        label="Primitive Two Months"
        monthsToShow={2}
        placeholder="Select date"
      />
      <PrimitiveDatePicker
        label="Primitive with Input"
        allowInput
        format="DD-MM-YYYY"
        placeholder="DD-MM-YYYY"
      />
    </div>
  ),
};

// Positioning Examples
export const PositioningExamples: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="h-96 bg-gray-100 p-4 rounded">
        <h3 className="text-sm font-medium mb-2">Top of Page - Calendar Opens Below</h3>
        <DatePicker
          label="Date Picker at Top"
          placeholder="Select date"
          mode="single"
        />
      </div>
      
      <div className="h-96 bg-gray-100 p-4 rounded flex items-end">
        <h3 className="text-sm font-medium mb-2">Bottom of Page - Calendar Opens Above</h3>
        <DatePicker
          label="Date Picker at Bottom"
          placeholder="Select date"
          mode="single"
        />
      </div>
      
      <div className="h-96 bg-gray-100 p-4 rounded flex items-center">
        <h3 className="text-sm font-medium mb-2">Middle of Page - Calendar Opens Below</h3>
        <DatePicker
          label="Date Picker in Middle"
          placeholder="Select date"
          mode="single"
        />
      </div>
    </div>
  ),
};

// Range Positioning Examples
export const RangePositioningExamples: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="h-96 bg-gray-100 p-4 rounded">
        <h3 className="text-sm font-medium mb-2">Range Picker at Top - Calendar Opens Below</h3>
        <DatePicker
          label="Range Picker at Top"
          placeholder="Select date range"
          mode="range"
        />
      </div>
      
      <div className="h-96 bg-gray-100 p-4 rounded flex items-end">
        <h3 className="text-sm font-medium mb-2">Range Picker at Bottom - Calendar Opens Above</h3>
        <DatePicker
          label="Range Picker at Bottom"
          placeholder="Select date range"
          mode="range"
        />
      </div>
      
      <div className="h-96 bg-gray-100 p-4 rounded flex items-center">
        <h3 className="text-sm font-medium mb-2">Range Picker in Middle - Calendar Opens Below</h3>
        <DatePicker
          label="Range Picker in Middle"
          placeholder="Select date range"
          mode="range"
        />
      </div>
    </div>
  ),
};

// Two Months Positioning Examples
export const TwoMonthsPositioningExamples: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="h-96 bg-gray-100 p-4 rounded">
        <h3 className="text-sm font-medium mb-2">Two Months at Top - Calendar Opens Below</h3>
        <DatePicker
          label="Two Months at Top"
          placeholder="Select date"
          monthsToShow={2}
        />
      </div>
      
      <div className="h-96 bg-gray-100 p-4 rounded flex items-end">
        <h3 className="text-sm font-medium mb-2">Two Months at Bottom - Calendar Opens Above</h3>
        <DatePicker
          label="Two Months at Bottom"
          placeholder="Select date"
          monthsToShow={2}
        />
      </div>
      
      <div className="h-96 bg-gray-100 p-4 rounded flex items-center">
        <h3 className="text-sm font-medium mb-2">Two Months in Middle - Calendar Opens Below</h3>
        <DatePicker
          label="Two Months in Middle"
          placeholder="Select date"
          monthsToShow={2}
        />
      </div>
    </div>
  ),
};

// Long Page Positioning Demo
export const LongPagePositioningDemo: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="bg-blue-50 p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Smart Calendar Positioning Demo</h2>
        <p className="text-sm text-gray-600 mb-4">
          This demo shows how the DatePicker automatically positions its calendar based on available space.
          Scroll down to see the calendar flip from below to above the input when there's not enough space below.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DatePicker
            label="Single Date Picker"
            placeholder="Select date"
            mode="single"
            leftIcon="mdi:calendar"
          />
          <DatePicker
            label="Range Date Picker"
            placeholder="Select date range"
            mode="range"
            leftIcon="mdi:calendar-range"
          />
        </div>
      </div>
      
      {/* Spacer content to create a long page */}
      <div className="space-y-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="bg-gray-50 p-4 rounded">
            <h3 className="font-medium">Content Section {i + 1}</h3>
            <p className="text-sm text-gray-600">
              This is placeholder content to create a long page and demonstrate the calendar positioning behavior.
            </p>
          </div>
        ))}
      </div>
      
      {/* Date pickers at the bottom */}
      <div className="bg-green-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Date Pickers at Bottom of Page</h3>
        <p className="text-sm text-gray-600 mb-4">
          These date pickers are positioned at the bottom of the page. When opened, their calendars will appear above the inputs.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <DatePicker
            label="Single Date"
            placeholder="Select date"
            mode="single"
            leftIcon="mdi:calendar"
          />
          <DatePicker
            label="Date Range"
            placeholder="Select range"
            mode="range"
            leftIcon="mdi:calendar-range"
          />
          <DatePicker
            label="Two Months"
            placeholder="Select date"
            monthsToShow={2}
            leftIcon="mdi:calendar-multiple"
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
