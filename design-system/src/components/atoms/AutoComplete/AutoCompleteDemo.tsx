import React, { useState } from "react";
import { AutoComplete } from "./AutoComplete";

const fruitOptions = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "date", label: "Date" },
  { value: "elderberry", label: "Elderberry" },
];

export const AutoCompleteDemo: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<string>("apple");
  const [selectedValueWithReset, setSelectedValueWithReset] =
    useState<string>("apple");
  const [resetCount, setResetCount] = useState<number>(0);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
  };

  const handleSelectWithReset = (value: string) => {
    setSelectedValueWithReset(value);
  };

  const handleInvalidReset = () => {
    setResetCount((prev) => prev + 1);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        AutoComplete Invalid Input Reset Demo
      </h1>

      {/* Without reset functionality */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Without Reset (Original Behavior)
        </h2>
        <p className="text-sm text-gray-600">
          Try typing "grape" (not in the list) and then clicking outside. The
          input will keep the invalid value.
        </p>
        <AutoComplete
          label="Select a fruit"
          options={fruitOptions}
          value={selectedValue}
          onSelect={handleSelect}
          placeholder="Type a fruit name..."
          helperText="Current value will be kept even if invalid"
        />
        <div className="text-sm text-gray-600">
          <strong>Current value:</strong> {selectedValue}
        </div>
      </div>

      {/* With reset functionality */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">
          With Reset on Invalid Input
        </h2>
        <p className="text-sm text-gray-600">
          Try typing "grape" (not in the list) and then clicking outside. The
          input will reset to empty.
        </p>
        <AutoComplete
          label="Select a fruit"
          options={fruitOptions}
          value={selectedValueWithReset}
          onSelect={handleSelectWithReset}
          placeholder="Type a fruit name..."
          resetInvalidOnBlur={true}
          onInvalidReset={handleInvalidReset}
          helperText="Invalid input will be reset to empty on blur"
        />
        <div className="text-sm text-gray-600">
          <strong>Current value:</strong> {selectedValueWithReset || "(empty)"}
        </div>
        <div className="text-sm text-gray-600">
          <strong>Invalid resets:</strong> {resetCount}
        </div>
      </div>

      {/* Usage example */}
      <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-md font-semibold text-gray-800">Usage Example</h3>
        <pre className="text-sm text-gray-700 bg-white p-3 rounded border overflow-x-auto">
          {`<AutoComplete
  label="Select a fruit"
  options={fruitOptions}
  value={selectedValue}
  onSelect={handleSelect}
  resetInvalidOnBlur={true}  // Enable reset on invalid input
  onInvalidReset={() => {
    // Optional: Handle when invalid input is reset
    console.log('Invalid input was reset');
  }}
  helperText="Invalid input will be reset to empty on blur"
/>`}
        </pre>
      </div>
    </div>
  );
};
