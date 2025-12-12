import { Hint, Label } from "@progress/kendo-react-labels";
import type React from "react";
import type { FC } from "react";
import styles from "./App.module.css";

interface FormFieldProps {
  label: string;
  inputElement: React.ReactNode;
  error?: string | null;
}

const FormField: FC<FormFieldProps> = ({ label, inputElement, error }) => (
  <>
    <Label>{label}</Label>
    {inputElement}
    {error && <Hint className={styles.errorHint}>{error}</Hint>}
  </>
);

export default FormField;
