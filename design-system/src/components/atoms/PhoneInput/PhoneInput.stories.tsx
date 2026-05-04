import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { useState } from "react";
import { PhoneInput, type CountryValue } from "./PhoneInput";
import { PhoneInputDemo } from "./PhoneInputDemo";

const meta: Meta<typeof PhoneInput> = {
  title: "Atoms/PhoneInput",
  component: PhoneInput,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "error", "success", "ghost", "underline"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    rounded: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl", "2xl", "3xl", "full"],
    },
    fullWidth: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    required: {
      control: "boolean",
    },
    error: {
      control: "boolean",
    },
    autoDetect: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof PhoneInput>;

export const Default: Story = {
  args: {
    label: "Phone Number",
    onChange: fn(),
    placeholder: "e.g. 81234567890",
  },
};

export const WithError: Story = {
  args: {
    label: "Phone Number",
    error: true,
    errorText: "Please enter a valid phone number",
    onChange: fn(),
  },
};

export const WithHelper: Story = {
  args: {
    label: "Phone Number",
    helperText: "Enter your phone number with country code",
    onChange: fn(),
  },
};

export const Required: Story = {
  args: {
    label: "Phone Number",
    required: true,
    onChange: fn(),
  },
};

export const Disabled: Story = {
  args: {
    label: "Phone Number",
    disabled: true,
    onChange: fn(),
  },
};

export const WithPlaceholder: Story = {
  args: {
    label: "Phone Number",
    onChange: fn(),
    placeholder: "Type your mobile number...",
  },
};

export const AutoDetect: Story = {
  args: {
    label: "Phone Number (Auto Detect)",
    autoDetect: true,
    onChange: (value) => {
      console.log("Phone number value (clean numeric):", value);
      fn()(value);
    },
    helperText:
      "Start typing with + and country code. Country selector (flag only) will appear after detection. Check console for clean numeric value.",
  },
};

export const AutoDetectWithValue: Story = {
  args: {
    label: "Phone Number (Auto Detect)",
    autoDetect: true,
    value: "+6281234567890",
    onChange: (value) => {
      console.log("Phone number value (clean numeric):", value);
      fn()(value);
    },
    helperText:
      "Pre-filled with Indonesian number. Country selector (flag only) is visible because country was detected. Check console for clean numeric value.",
  },
};

export const Comparison: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Manual Selection Mode</h3>
        <PhoneInput
          label="Phone Number (Manual)"
          onChange={fn()}
          helperText="Select country first, then type number"
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Auto Detect Mode</h3>
        <PhoneInput
          label="Phone Number (Auto Detect)"
          autoDetect={true}
          onChange={(value) => {
            console.log("Phone number value (clean numeric):", value);
            fn()(value);
          }}
          helperText="Start typing with + and country code. Country selector (flag only) will appear after detection. Check console for clean numeric value."
        />
      </div>
    </div>
  ),
};

export const AutoDetectExamples: Story = {
  render: () => (
    <div className="space-y-4">
      <PhoneInput
        label="US Number"
        autoDetect={true}
        value="+1234567890"
        onChange={fn()}
        helperText="Country selector (flag only) visible because United States (+1) was detected"
      />
      <PhoneInput
        label="UK Number"
        autoDetect={true}
        value="+447911123456"
        onChange={fn()}
        helperText="Country selector (flag only) visible because United Kingdom (+44) was detected"
      />
      <PhoneInput
        label="Indonesian Number"
        autoDetect={true}
        value="+6281234567890"
        onChange={fn()}
        helperText="Country selector (flag only) visible because Indonesia (+62) was detected"
      />
      <PhoneInput
        label="German Number"
        autoDetect={true}
        value="+49123456789"
        onChange={fn()}
        helperText="Country selector (flag only) visible because Germany (+49) was detected"
      />
    </div>
  ),
};

export const DifferentSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <PhoneInput label="Small" size="sm" onChange={fn()} />
      <PhoneInput label="Medium" size="md" onChange={fn()} />
      <PhoneInput label="Large" size="lg" onChange={fn()} />
    </div>
  ),
};

export const DifferentVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <PhoneInput label="Default" variant="default" onChange={fn()} />
      <PhoneInput
        label="Error"
        variant="error"
        errorText="Error message"
        onChange={fn()}
      />
      <PhoneInput label="Success" variant="success" onChange={fn()} />
      <PhoneInput label="Ghost" variant="ghost" onChange={fn()} />
      <PhoneInput label="Underline" variant="underline" onChange={fn()} />
    </div>
  ),
};

export const DifferentRounded: Story = {
  render: () => (
    <div className="space-y-4">
      <PhoneInput label="None" rounded="none" onChange={fn()} />
      <PhoneInput label="Small" rounded="sm" onChange={fn()} />
      <PhoneInput label="Medium" rounded="md" onChange={fn()} />
      <PhoneInput label="Large" rounded="lg" onChange={fn()} />
      <PhoneInput label="Extra Large" rounded="xl" onChange={fn()} />
      <PhoneInput label="2xl" rounded="2xl" onChange={fn()} />
      <PhoneInput label="3xl" rounded="3xl" onChange={fn()} />
      <PhoneInput label="Full" rounded="full" onChange={fn()} />
    </div>
  ),
};

export const Demo: Story = {
  render: () => <PhoneInputDemo />,
};

export const CleanNumericValues: Story = {
  render: () => {
    const [manualValue, setManualValue] = useState("");
    const [manualCountry, setManualCountry] = useState<{
      iso: string;
      code: string;
    } | null>(null);
    const [autoDetectValue, setAutoDetectValue] = useState("");
    const [autoDetectCountry, setAutoDetectCountry] = useState<{
      iso: string;
      code: string;
    } | null>(null);

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Manual Mode</h3>
          <PhoneInput
            label="Phone Number (Manual)"
            onChange={(value, countryValue) => {
              setManualValue(value);
              setManualCountry(countryValue || null);
            }}
            helperText="Select country first, then type number"
          />
          <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
            <strong>Value sent to API:</strong> {manualValue || "No input yet"}
            <br />
            <strong>Country Info:</strong>{" "}
            {manualCountry
              ? `${manualCountry.iso} (${manualCountry.code})`
              : "No country selected"}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Auto Detect Mode</h3>
          <PhoneInput
            label="Phone Number (Auto Detect)"
            autoDetect={true}
            onChange={(value, countryValue) => {
              setAutoDetectValue(value);
              setAutoDetectCountry(countryValue || null);
            }}
            helperText="Type full number with country code. Value will be clean numeric for API."
          />
          <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
            <strong>Value sent to API:</strong>{" "}
            {autoDetectValue || "No input yet"}
            <br />
            <strong>Country Info:</strong>{" "}
            {autoDetectCountry
              ? `${autoDetectCountry.iso} (${autoDetectCountry.code})`
              : "No country detected"}
          </div>
        </div>

        <div className="p-4 bg-blue-50 rounded">
          <h4 className="font-semibold mb-2">API Compatibility</h4>
          <p className="text-sm text-gray-700">
            Both modes now send clean numeric values (without + symbol) and
            country information (ISO + code) to the onChange callback, making
            them compatible with APIs that expect separate phone number and
            country information.
          </p>
        </div>
      </div>
    );
  },
};

export const IndonesianNumberHandling: Story = {
  render: () => {
    const [value1, setValue1] = useState("");
    const [value2, setValue2] = useState("");
    const [value3, setValue3] = useState("");
    const [value4, setValue4] = useState("");

    return (
      <div className="space-y-6">
        <div className="p-4 bg-green-50 rounded">
          <h3 className="text-lg font-semibold mb-2">
            Indonesian Number Auto-Conversion
          </h3>
          <p className="text-sm text-gray-700 mb-2">
            In autoDetect mode, Indonesian numbers starting with 0 are
            automatically converted to +62 format.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">
            Example 1: Copy-paste 081327368782
          </h4>
          <PhoneInput
            label="Phone Number"
            autoDetect={true}
            onChange={setValue1}
            helperText="Copy-paste: 081327368782 (will auto-convert to +6281327368782)"
          />
          <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
            <strong>Value sent to API:</strong> {value1 || "No input yet"}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2">
            Example 2: Type manually 081327368782
          </h4>
          <PhoneInput
            label="Phone Number"
            autoDetect={true}
            onChange={setValue2}
            helperText="Type manually: 081327368782 (will auto-convert to +6281327368782)"
          />
          <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
            <strong>Value sent to API:</strong> {value2 || "No input yet"}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Example 3: Type 081 (3 digits)</h4>
          <PhoneInput
            label="Phone Number"
            autoDetect={true}
            onChange={setValue3}
            helperText="Type: 081 (will auto-convert to +6281 after 3 digits)"
          />
          <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
            <strong>Value sent to API:</strong> {value3 || "No input yet"}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2">
            Example 4: +6281327368782 (explicit)
          </h4>
          <PhoneInput
            label="Phone Number"
            autoDetect={true}
            onChange={setValue4}
            helperText="Type: +6281327368782 (explicit format, no conversion needed)"
          />
          <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
            <strong>Value sent to API:</strong> {value4 || "No input yet"}
          </div>
        </div>

        <div className="p-4 bg-yellow-50 rounded">
          <h4 className="font-semibold mb-2">How it works:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>
              • <strong>081327368782</strong> → <strong>6281327368782</strong>{" "}
              (0 converted to 62)
            </li>
            <li>
              • <strong>081</strong> → <strong>+6281</strong> (converts after 3
              digits)
            </li>
            <li>
              • <strong>+6281327368782</strong> → <strong>6281327368782</strong>{" "}
              (explicit format)
            </li>
            <li>
              • <strong>0</strong> → waits for 3 digits before converting
            </li>
            <li>• All result in the same clean numeric value for API</li>
          </ul>
        </div>
      </div>
    );
  },
};

export const ThreeDigitConversion: Story = {
  render: () => {
    const [value, setValue] = useState("");

    return (
      <div className="space-y-6">
        <div className="p-4 bg-blue-50 rounded">
          <h3 className="text-lg font-semibold mb-2">
            3-Digit Conversion Test
          </h3>
          <p className="text-sm text-gray-700 mb-2">
            Test the 3-digit conversion behavior. Type step by step to see when
            conversion happens.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Step-by-Step Test</h4>
          <PhoneInput
            label="Phone Number"
            autoDetect={true}
            onChange={setValue}
            helperText="Type: 0 → 08 → 081 (converts at 081) → continue typing..."
          />
          <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
            <strong>Value sent to API:</strong> {value || "No input yet"}
          </div>
        </div>

        <div className="p-4 bg-green-50 rounded">
          <h4 className="font-semibold mb-2">Expected Behavior:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>
              • Type <strong>0</strong> → stays as <strong>0</strong>
            </li>
            <li>
              • Type <strong>08</strong> → stays as <strong>08</strong>
            </li>
            <li>
              • Type <strong>081</strong> → converts to <strong>+6281</strong>
            </li>
            <li>
              • Continue typing → <strong>+6281327368782</strong>
            </li>
            <li>
              • API receives: <strong>6281327368782</strong>
            </li>
          </ul>
        </div>
      </div>
    );
  },
};

export const InputValidation: Story = {
  render: () => {
    const [value1, setValue1] = useState("");
    const [value2, setValue2] = useState("");

    return (
      <div className="space-y-6">
        <div className="p-4 bg-red-50 rounded">
          <h3 className="text-lg font-semibold mb-2">Input Validation Test</h3>
          <p className="text-sm text-gray-700 mb-2">
            The phone input now only accepts digits (0-9) and the + symbol. Try
            typing letters or special characters - they will be ignored.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Auto Detect Mode</h4>
          <PhoneInput
            label="Phone Number (Auto Detect)"
            autoDetect={true}
            onChange={setValue1}
            helperText="Try typing: abc123!@# (only 123 will be accepted)"
          />
          <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
            <strong>Value sent to API:</strong> {value1 || "No input yet"}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Manual Mode</h4>
          <PhoneInput
            label="Phone Number (Manual)"
            autoDetect={false}
            onChange={setValue2}
            helperText="Try typing: abc123!@# (only 123 will be accepted)"
          />
          <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
            <strong>Value sent to API:</strong> {value2 || "No input yet"}
          </div>
        </div>

        <div className="p-4 bg-yellow-50 rounded">
          <h4 className="font-semibold mb-2">Validation Rules:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>
              • <strong>Allowed:</strong> Digits (0-9) and + symbol
            </li>
            <li>
              • <strong>Blocked:</strong> Letters (a-z, A-Z)
            </li>
            <li>
              • <strong>Blocked:</strong> Special characters (!@#$%^&* etc.)
            </li>
            <li>
              • <strong>Blocked:</strong> Spaces and other symbols
            </li>
            <li>• Invalid characters are silently ignored</li>
          </ul>
        </div>
      </div>
    );
  },
};

export const FetchedDataHandling: Story = {
  render: () => {
    const [value1, setValue1] = useState("6584046974"); // Singapore number
    const [country1, setCountry1] = useState<{
      iso: string;
      code: string;
    } | null>(null);
    const [value2, setValue2] = useState("6281327368782"); // Indonesian number
    const [country2, setCountry2] = useState<{
      iso: string;
      code: string;
    } | null>(null);
    const [value3, setValue3] = useState("1234567890"); // Unknown number
    const [country3, setCountry3] = useState<{
      iso: string;
      code: string;
    } | null>(null);

    return (
      <div className="space-y-6">
        <div className="p-4 bg-blue-50 rounded">
          <h3 className="text-lg font-semibold mb-2">
            Fetched Data Auto-Detection
          </h3>
          <p className="text-sm text-gray-700 mb-2">
            The component now automatically detects countries from fetched data
            (clean numeric format) and converts them to + format for display.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Singapore Number: 6584046974</h4>
          <PhoneInput
            label="Phone Number"
            autoDetect={true}
            value={value1}
            onChange={(value, countryValue) => {
              setValue1(value);
              setCountry1(countryValue || null);
            }}
            helperText="Fetched data: 6584046974 → Auto-detects Singapore (+65)"
          />
          <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
            <strong>Value sent to API:</strong> {value1 || "No input yet"}
            <br />
            <strong>Country Info:</strong>{" "}
            {country1
              ? `${country1.iso} (${country1.code})`
              : "No country detected"}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2">
            Indonesian Number: 6281327368782
          </h4>
          <PhoneInput
            label="Phone Number"
            autoDetect={true}
            value={value2}
            onChange={(value, countryValue) => {
              setValue2(value);
              setCountry2(countryValue || null);
            }}
            helperText="Fetched data: 6281327368782 → Auto-detects Indonesia (+62)"
          />
          <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
            <strong>Value sent to API:</strong> {value2 || "No input yet"}
            <br />
            <strong>Country Info:</strong>{" "}
            {country2
              ? `${country2.iso} (${country2.code})`
              : "No country detected"}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Unknown Number: 1234567890</h4>
          <PhoneInput
            label="Phone Number"
            autoDetect={true}
            value={value3}
            onChange={(value, countryValue) => {
              setValue3(value);
              setCountry3(countryValue || null);
            }}
            helperText="Fetched data: 1234567890 → No country detected, shows as is"
          />
          <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
            <strong>Value sent to API:</strong> {value3 || "No input yet"}
            <br />
            <strong>Country Info:</strong>{" "}
            {country3
              ? `${country3.iso} (${country3.code})`
              : "No country detected"}
          </div>
        </div>

        <div className="p-4 bg-green-50 rounded">
          <h4 className="font-semibold mb-2">How it works:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>
              • <strong>6584046974</strong> → <strong>+6584046974</strong>{" "}
              (Singapore +65)
            </li>
            <li>
              • <strong>6281327368782</strong> → <strong>+6281327368782</strong>{" "}
              (Indonesia +62)
            </li>
            <li>
              • <strong>1234567890</strong> → <strong>1234567890</strong> (No
              country detected)
            </li>
            <li>• Country selector appears when country is detected</li>
            <li>• Users can still edit the number after auto-detection</li>
          </ul>
        </div>
      </div>
    );
  },
};

export const CountryValueDemo: Story = {
  render: () => {
    const [phoneValue, setPhoneValue] = useState("");
    const [countryValue, setCountryValue] = useState<CountryValue | null>(null);

    console.log(countryValue);

    return (
      <div className="space-y-6">
        <div className="p-4 bg-purple-50 rounded">
          <h3 className="text-lg font-semibold mb-2">Country Value Demo</h3>
          <p className="text-sm text-gray-700 mb-2">
            This demonstrates the new countryValue parameter in the onChange
            callback. You can now retrieve the full phone number, country
            information (ISO and code), and the input value without the country
            code.
          </p>
        </div>

        <div>
          <PhoneInput
            label="Phone Number"
            autoDetect={true}
            onChange={(value, countryInfo) => {
              setPhoneValue(value);
              setCountryValue(countryInfo || null);
            }}
            helperText="Type a phone number with country code (e.g., +6281234567890)"
          />

          <div className="mt-4 space-y-2">
            <div className="p-3 bg-blue-50 rounded">
              <h4 className="font-semibold text-sm mb-1">
                onChange Callback Values:
              </h4>
              <div className="text-sm space-y-1">
                <div>
                  <strong>Phone Value (1st parameter):</strong>{" "}
                  <code className="bg-white px-1 rounded">
                    {phoneValue || "No input yet"}
                  </code>
                </div>
                <div>
                  <strong>Country Value (2nd parameter):</strong>
                  {countryValue ? (
                    <div className="mt-1">
                      <code className="bg-white px-1 rounded block">
                        {JSON.stringify(countryValue, null, 2)}
                      </code>
                    </div>
                  ) : (
                    <code className="bg-white px-1 rounded">
                      No country detected
                    </code>
                  )}
                </div>
              </div>
            </div>

            <div className="p-3 bg-green-50 rounded">
              <h4 className="font-semibold text-sm mb-1">Example Usage:</h4>
              <pre className="text-xs bg-white p-2 rounded overflow-x-auto">
                {`// In your component
const handlePhoneChange = (phone, countryInfo) => {
  console.log('Full phone:', phone);           // "6281234567890"
  console.log('Country ISO:', countryInfo?.iso); // "id"
  console.log('Country code:', countryInfo?.code); // "62"
  console.log('Input value (without country code):', countryInfo?.value); // "81234567890"
  
  // Send to API
  api.updateUser({
    phoneNumber: phone,
    countryIso: countryInfo?.iso,
    countryCode: countryInfo?.code,
    localNumber: countryInfo?.value // Input without country code
  });
};`}
              </pre>
            </div>
          </div>
        </div>

        <div className="p-4 bg-yellow-50 rounded">
          <h4 className="font-semibold mb-2">Use Cases:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>
              • <strong>API Integration:</strong> Send phone number, country
              ISO, country code, and local number (without country code) as
              separate fields
            </li>
            <li>
              • <strong>Validation:</strong> Validate country ISO and code
              separately from phone number, and validate local number format
              using the value property
            </li>
            <li>
              • <strong>Display:</strong> Show country flag/name based on ISO
              code
            </li>
            <li>
              • <strong>Formatting:</strong> Format phone numbers differently
              based on country ISO
            </li>
            <li>
              • <strong>Analytics:</strong> Track usage by country ISO and code
            </li>
            <li>
              • <strong>Localization:</strong> Use ISO code for
              language/currency selection
            </li>
          </ul>
        </div>
      </div>
    );
  },
};
