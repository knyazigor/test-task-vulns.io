import styles from "./App.module.css";
import {
  TextArea,
  TextBox,
  type TextAreaHandle,
  type TextBoxHandle,
} from "@progress/kendo-react-inputs";
import { Label } from "@progress/kendo-react-labels";
import {
  DropDownList,
  type DropDownListHandle,
} from "@progress/kendo-react-dropdowns";
import { Button } from "@progress/kendo-react-buttons";
import { OS_LIST } from "./lib/constants";
import React, { useId, useRef } from "react";
import { useFetch } from "./hooks/useFetch";
import { Loader } from "@progress/kendo-react-indicators";
import type { AuditResult } from "./types/form";
import Result from "./Result";

function App() {
  const { data, loading, fetchData, error } = useFetch<AuditResult>();

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  const auditLinuxPagackesUrl = `${baseUrl}/common/v1/audit/linux/packages`;

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = JSON.stringify({
      os: {
        name: String(osNameRef.current?.value || ""),
        version: String(osVersionRef.current?.value || ""),
      },
      packages: String(packagesRef.current?.value || "")
        .trim()
        .split("\n")
        .map((el) => el.split(" ")),
    });

    await fetchData(auditLinuxPagackesUrl, {
      method: "POST",
      body,
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
      },
    });
  };
  const osNameId = useId();
  const osVersionId = useId();
  const packagesId = useId();

  const osNameRef = useRef<DropDownListHandle>(null);
  const osVersionRef = useRef<TextBoxHandle>(null);
  const packagesRef = useRef<TextAreaHandle>(null);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <fieldset className={styles.optionsContainer}>
            <Label editorId={osNameId}>OS name:</Label>
            <DropDownList data={OS_LIST} id={osNameId} ref={osNameRef} />
            <Label editorId={osVersionId}>OS version:</Label>
            <TextBox id={osVersionId} ref={osVersionRef} />
            <Label editorId={packagesId}>Packages:</Label>
            <TextArea
              id={packagesId}
              ref={packagesRef}
              style={{ flexGrow: 1 }}
            />
            <Button type="submit" disabled={loading}>
              {loading ? <Loader size="small" type={"pulsing"} /> : "Audit"}
            </Button>
          </fieldset>
          <fieldset className={styles.resultContainer}>
            <Label>Audit Result</Label>
            <Result {...{ loading, error, data }} />
          </fieldset>
        </form>
      </div>
    </main>
  );
}

export default App;
