import React from 'react';
import { Card } from '../Card/Card';

interface ColorSwatchProps {
  name: string;
  value: string;
  colorClass: string;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ name, value, colorClass }) => (
  <Card variant="outline" padding="sm" rounded="lg">
    <div className="flex flex-col items-center gap-2">
      <div 
        className={`w-full h-20 rounded-lg ${colorClass}`}
      />
      <div className="text-sm font-medium text-neutral-700">{name}</div>
      <div className="text-xs text-neutral">{value}</div>
    </div>
  </Card>
);

interface PalleteProps {
  className?: string;
}

export const Pallete: React.FC<PalleteProps> = ({ className }) => {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 ${className}`}>
      {/* Primary Colors */}
      <div className="col-span-full">
        <h3 className="text-lg font-semibold mb-4">Primary Colors</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <ColorSwatch name="Primary 50" value="#E6F7FA" colorClass="bg-primary-50" />
          <ColorSwatch name="Primary 100" value="#B3E6F0" colorClass="bg-primary-100" />
          <ColorSwatch name="Primary 200" value="#80D5E6" colorClass="bg-primary-200" />
          <ColorSwatch name="Primary 300" value="#4DC4DC" colorClass="bg-primary-300" />
          <ColorSwatch name="Primary 400" value="#1AB3D2" colorClass="bg-primary-400" />
          <ColorSwatch name="Primary 500" value="#007C99" colorClass="bg-primary-500" />
          <ColorSwatch name="Primary 600" value="#006B80" colorClass="bg-primary-600" />
          <ColorSwatch name="Primary 700" value="#005A66" colorClass="bg-primary-700" />
          <ColorSwatch name="Primary 800" value="#00494D" colorClass="bg-primary-800" />
          <ColorSwatch name="Primary 900" value="#003833" colorClass="bg-primary-900" />
        </div>
      </div>

      {/* Secondary Colors */}
      <div className="col-span-full">
        <h3 className="text-lg font-semibold mb-4">Secondary Colors</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <ColorSwatch name="Secondary 50" value="#F5FCFB" colorClass="bg-secondary-50" />
          <ColorSwatch name="Secondary 100" value="#E8F7F5" colorClass="bg-secondary-100" />
          <ColorSwatch name="Secondary 200" value="#DCF2EF" colorClass="bg-secondary-200" />
          <ColorSwatch name="Secondary 300" value="#CEEAE7" colorClass="bg-secondary-300" />
          <ColorSwatch name="Secondary 400" value="#B8DCD9" colorClass="bg-secondary-400" />
          <ColorSwatch name="Secondary 500" value="#A2CECB" colorClass="bg-secondary-500" />
          <ColorSwatch name="Secondary 600" value="#8CC0BD" colorClass="bg-secondary-600" />
          <ColorSwatch name="Secondary 700" value="#76B2AF" colorClass="bg-secondary-700" />
          <ColorSwatch name="Secondary 800" value="#60A4A1" colorClass="bg-secondary-800" />
          <ColorSwatch name="Secondary 900" value="#4A9693" colorClass="bg-secondary-900" />
        </div>
      </div>

      {/* Success Colors */}
      <div className="col-span-full">
        <h3 className="text-lg font-semibold mb-4">Success Colors</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <ColorSwatch name="Success 50" value="#E6F9F0" colorClass="bg-success-50" />
          <ColorSwatch name="Success 100" value="#B3EED9" colorClass="bg-success-100" />
          <ColorSwatch name="Success 200" value="#80E3C2" colorClass="bg-success-200" />
          <ColorSwatch name="Success 300" value="#4DD8AB" colorClass="bg-success-300" />
          <ColorSwatch name="Success 400" value="#1ACD94" colorClass="bg-success-400" />
          <ColorSwatch name="Success 500" value="#00B37D" colorClass="bg-success-500" />
          <ColorSwatch name="Success 600" value="#009966" colorClass="bg-success-600" />
          <ColorSwatch name="Success 700" value="#00804D" colorClass="bg-success-700" />
          <ColorSwatch name="Success 800" value="#006633" colorClass="bg-success-800" />
          <ColorSwatch name="Success 900" value="#004D1A" colorClass="bg-success-900" />
        </div>
      </div>

      {/* Warning Colors */}
      <div className="col-span-full">
        <h3 className="text-lg font-semibold mb-4">Warning Colors</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <ColorSwatch name="Warning 50" value="#FFF9E6" colorClass="bg-warning-50" />
          <ColorSwatch name="Warning 100" value="#FFEEB3" colorClass="bg-warning-100" />
          <ColorSwatch name="Warning 200" value="#FFE380" colorClass="bg-warning-200" />
          <ColorSwatch name="Warning 300" value="#FFD84D" colorClass="bg-warning-300" />
          <ColorSwatch name="Warning 400" value="#FFCD1A" colorClass="bg-warning-400" />
          <ColorSwatch name="Warning 500" value="#FF9319" colorClass="bg-warning-500" />
          <ColorSwatch name="Warning 600" value="#CC9000" colorClass="bg-warning-600" />
          <ColorSwatch name="Warning 700" value="#996D00" colorClass="bg-warning-700" />
          <ColorSwatch name="Warning 800" value="#664A00" colorClass="bg-warning-800" />
          <ColorSwatch name="Warning 900" value="#332700" colorClass="bg-warning-900" />
        </div>
      </div>

      {/* Danger Colors */}
      <div className="col-span-full">
        <h3 className="text-lg font-semibold mb-4">Danger Colors</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <ColorSwatch name="Danger 50" value="#FFE6E6" colorClass="bg-danger-50" />
          <ColorSwatch name="Danger 100" value="#FFB3B3" colorClass="bg-danger-100" />
          <ColorSwatch name="Danger 200" value="#FF8080" colorClass="bg-danger-200" />
          <ColorSwatch name="Danger 300" value="#FF4D4D" colorClass="bg-danger-300" />
          <ColorSwatch name="Danger 400" value="#FF1A1A" colorClass="bg-danger-400" />
          <ColorSwatch name="Danger 500" value="#CA0000" colorClass="bg-danger-500" />
          <ColorSwatch name="Danger 600" value="#B30000" colorClass="bg-danger-600" />
          <ColorSwatch name="Danger 700" value="#800000" colorClass="bg-danger-700" />
          <ColorSwatch name="Danger 800" value="#4D0000" colorClass="bg-danger-800" />
          <ColorSwatch name="Danger 900" value="#1A0000" colorClass="bg-danger-900" />
        </div>
      </div>

      {/* Info Colors */}
      <div className="col-span-full">
        <h3 className="text-lg font-semibold mb-4">Info Colors</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <ColorSwatch name="Info 50" value="#E6F2FF" colorClass="bg-info-50" />
          <ColorSwatch name="Info 100" value="#B3D9FF" colorClass="bg-info-100" />
          <ColorSwatch name="Info 200" value="#80C0FF" colorClass="bg-info-200" />
          <ColorSwatch name="Info 300" value="#4DA6FF" colorClass="bg-info-300" />
          <ColorSwatch name="Info 400" value="#1A8DFF" colorClass="bg-info-400" />
          <ColorSwatch name="Info 500" value="#0073E6" colorClass="bg-info-500" />
          <ColorSwatch name="Info 600" value="#0059B3" colorClass="bg-info-600" />
          <ColorSwatch name="Info 700" value="#004080" colorClass="bg-info-700" />
          <ColorSwatch name="Info 800" value="#00264D" colorClass="bg-info-800" />
          <ColorSwatch name="Info 900" value="#000D1A" colorClass="bg-info-900" />
        </div>
      </div>

      {/* Neutral Colors */}
      <div className="col-span-full">
        <h3 className="text-lg font-semibold mb-4">Neutral Colors</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <ColorSwatch name="Neutral 50" value="#F8F9FA" colorClass="bg-neutral-50" />
          <ColorSwatch name="Neutral 100" value="#E9ECEF" colorClass="bg-neutral-100" />
          <ColorSwatch name="Neutral 200" value="#DEE2E6" colorClass="bg-neutral-200" />
          <ColorSwatch name="Neutral 300" value="#CED4DA" colorClass="bg-neutral-300" />
          <ColorSwatch name="Neutral 400" value="#ADB5BD" colorClass="bg-neutral-400" />
          <ColorSwatch name="Neutral 500" value="#6C757D" colorClass="bg-neutral-500" />
          <ColorSwatch name="Neutral 600" value="#495057" colorClass="bg-neutral-600" />
          <ColorSwatch name="Neutral 700" value="#343A40" colorClass="bg-neutral-700" />
          <ColorSwatch name="Neutral 800" value="#212529" colorClass="bg-neutral-800" />
          <ColorSwatch name="Neutral 900" value="#121416" colorClass="bg-neutral-900" />
        </div>
      </div>

      {/* Light Theme Colors */}
      <div className="col-span-full">
        <h3 className="text-lg font-semibold mb-4">Light Theme Colors</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <ColorSwatch name="Light 50" value="#FFFFFF" colorClass="bg-light-50" />
          <ColorSwatch name="Light 100" value="#F8F9FA" colorClass="bg-light-100" />
          <ColorSwatch name="Light 200" value="#F1F3F5" colorClass="bg-light-200" />
          <ColorSwatch name="Light 300" value="#E9ECEF" colorClass="bg-light-300" />
          <ColorSwatch name="Light 400" value="#DEE2E6" colorClass="bg-light-400" />
          <ColorSwatch name="Light 500" value="#CED4DA" colorClass="bg-light-500" />
          <ColorSwatch name="Light 600" value="#ADB5BD" colorClass="bg-light-600" />
          <ColorSwatch name="Light 700" value="#6C757D" colorClass="bg-light-700" />
          <ColorSwatch name="Light 800" value="#495057" colorClass="bg-light-800" />
          <ColorSwatch name="Light 900" value="#343A40" colorClass="bg-light-900" />
        </div>
      </div>

      {/* Dark Theme Colors */}
      <div className="col-span-full">
        <h3 className="text-lg font-semibold mb-4">Dark Theme Colors</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <ColorSwatch name="Dark 50" value="#343A40" colorClass="bg-dark-50" />
          <ColorSwatch name="Dark 100" value="#212529" colorClass="bg-dark-100" />
          <ColorSwatch name="Dark 200" value="#1A1D20" colorClass="bg-dark-200" />
          <ColorSwatch name="Dark 300" value="#16181A" colorClass="bg-dark-300" />
          <ColorSwatch name="Dark 400" value="#141618" colorClass="bg-dark-400" />
          <ColorSwatch name="Dark 500" value="#121416" colorClass="bg-dark-500" />
          <ColorSwatch name="Dark 600" value="#0F1113" colorClass="bg-dark-600" />
          <ColorSwatch name="Dark 700" value="#0C0E10" colorClass="bg-dark-700" />
          <ColorSwatch name="Dark 800" value="#090B0D" colorClass="bg-dark-800" />
          <ColorSwatch name="Dark 900" value="#06080A" colorClass="bg-dark-900" />
        </div>
      </div>
    </div>
  );
}; 