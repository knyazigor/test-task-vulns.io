import { MAX_FIELD_LENGTH } from './constants';

export const nameValidator = (value: string) => {
  const trimmedValue = value.trim();
  if (!trimmedValue) return 'Fill in the OS name';
  if (trimmedValue.length > MAX_FIELD_LENGTH) return 'Too long OS name';
  return '';
};

export const versionValidator = (value: string) => {
  const versionPattern = /^\d+(?:\.\d+)*(?:\.\d+)?$/;
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return 'Fill in the OS version';
  } else if (trimmedValue.length > MAX_FIELD_LENGTH) {
    return 'Too long version';
  } else if (!versionPattern.test(trimmedValue)) {
    return 'Invalid version format';
  } else {
    return '';
  }
};

export const packagesValidator = (value: string) => {
  const trimmedValue = value.trim();
  if (!trimmedValue) {
    return 'Fill in the package list';
  } else if (!/^(?:[^\s]+\s+[^\s]+\s+[^\s]+(?:\n|$))+$/.test(trimmedValue)) {
    return 'Each line should contain: Package_Name Version Architecture';
  } else {
    return '';
  }
};
