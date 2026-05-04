import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { COUNTRIES } from '../components/atoms/PhoneInput/constant';

export interface CountryMeta {
  name: string;
  code: string;
  iso: string;
  flag: string;
  formatted: string;
  isValid: boolean;
}

export function getCountryMeta(phone: string): CountryMeta | null {
  const phoneNumber = parsePhoneNumberFromString(phone);
  if (!phoneNumber) return null;

  const iso = phoneNumber.country?.toLowerCase();
  const countryMeta = COUNTRIES.find((c) => c.iso === iso);

  return countryMeta
    ? {
        ...countryMeta,
        formatted: phoneNumber.formatInternational(),
        isValid: phoneNumber.isValid(),
      }
    : null;
}

export function getCountryFromPhone(phone: string) {
  const phoneNumber = parsePhoneNumberFromString(phone);
  if (!phoneNumber) return null;

  const iso = phoneNumber.country?.toLowerCase();
  return COUNTRIES.find((c) => c.iso === iso) || null;
}

export function formatPhoneNumber(phone: string, format: 'international' | 'national' | 'e164' = 'international') {
  const phoneNumber = parsePhoneNumberFromString(phone);
  if (!phoneNumber) return phone;

  switch (format) {
    case 'international':
      return phoneNumber.formatInternational();
    case 'national':
      return phoneNumber.formatNational();
    case 'e164':
      return phoneNumber.format('E.164');
    default:
      return phoneNumber.formatInternational();
  }
}

export function isValidPhoneNumber(phone: string) {
  const phoneNumber = parsePhoneNumberFromString(phone);
  return phoneNumber ? phoneNumber.isValid() : false;
}
