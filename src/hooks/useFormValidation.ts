import { useState, useCallback } from 'react';
import {
  nameValidator,
  versionValidator,
  packagesValidator,
} from '../lib/validators';

export type FormValues = {
  osName: string;
  osVersion: string;
  packages: string;
};

export type FormErrors = {
  osName: string;
  osVersion: string;
  packages: string;
};

const initialFormValues: FormValues = {
  osName: '',
  osVersion: '',
  packages: '',
};

const initialFormErrors: FormErrors = {
  osName: '',
  osVersion: '',
  packages: '',
};

export const useFormValidation = () => {
  const [values, setValues] = useState<FormValues>(initialFormValues);
  const [errors, setErrors] = useState<FormErrors>(initialFormErrors);

  const updateField = useCallback((field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  }, []);

  const validate = useCallback((): boolean => {
    const newErrors: FormErrors = {
      osName: nameValidator(values.osName),
      osVersion: versionValidator(values.osVersion),
      packages: packagesValidator(values.packages),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((err) => err !== '');
  }, [values]);

  const reset = useCallback(() => {
    setValues(initialFormValues);
    setErrors(initialFormErrors);
  }, []);

  return {
    values,
    errors,
    updateField,
    validate,
    reset,
  };
};
