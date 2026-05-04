import { useState } from "react";
import { PhoneInput } from "./PhoneInput";
import { getCountryMeta } from "../../../utils/phoneMeta";

export const PhoneInputDemo = () => {
  const [phone, setPhone] = useState("");
  const [countryMeta, setCountryMeta] = useState<any>(null);

  const handlePhoneChange = (phoneNumber: string) => {
    setPhone(phoneNumber);

    // Get country metadata using libphonenumber-js
    const meta = getCountryMeta(`+${phoneNumber}`);
    setCountryMeta(meta);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">
        Phone Input with libphonenumber-js Integration
      </h2>

      <PhoneInput
        label="Phone Number"
        placeholder="Enter phone number"
        value={phone}
        onChange={handlePhoneChange}
        autoDetect={true}
        helperText="Try typing: +12025551234 (US), +14165551234 (Canada), +18765551234 (Jamaica)"
      />

      {countryMeta && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium mb-2">Detected Country Info:</h3>
          <div className="space-y-1 text-sm">
            <p>
              <strong>Country:</strong> {countryMeta.name}
            </p>
            <p>
              <strong>ISO Code:</strong> {countryMeta.iso}
            </p>
            <p>
              <strong>Dial Code:</strong> {countryMeta.code}
            </p>
            <p>
              <strong>Formatted:</strong> {countryMeta.formatted}
            </p>
            <p>
              <strong>Valid:</strong> {countryMeta.isValid ? "Yes" : "No"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
