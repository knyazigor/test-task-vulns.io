import { Loader } from "@progress/kendo-react-indicators";
import { TextArea } from "@progress/kendo-react-inputs";
import type { FC } from "react";
import styles from "./App.module.css";
import type { AuditResult } from "./types/form";
import type React from "react";

interface ResultProps {
  loading: boolean;
  error: string | null;
  data: AuditResult | null;
}

const Result: FC<ResultProps> = ({ data, loading, error }) => {
  let result: React.ReactNode = null;

  if (loading) result = <Loader size="medium" type={"pulsing"} />;
  if (error) result = <div>Ошибка при загрузке данных: {error}</div>;
  if (data)
    result = (
      <TextArea
        value={JSON.stringify(data, null, 2)}
        style={{ height: "100%" }}
      />
    );

  return <div className={styles.result}>{result}</div>;
};

export default Result;
