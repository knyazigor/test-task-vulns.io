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
import { API_KEY, AUDIT_URL, OS_LIST } from "./lib/constants";
import React, { useRef, useState } from "react";
import { useFetch } from "./hooks/useFetch";
import { Loader } from "@progress/kendo-react-indicators";
import type { AuditResult } from "./lib/types";
import Result from "./Result";
import { mapRequestBody } from "./lib/utils";
import FormField from "./FormField";
import {
  nameValidator,
  versionValidator,
  packagesValidator,
} from "./lib/validators";

function App() {
  const { data, loading, fetchData, error } = useFetch<AuditResult>();
  const [formErrors, setFormErrors] = useState({
    osName: "",
    osVersion: "",
    packages: "",
  });

  const osNameRef = useRef<DropDownListHandle>(null);
  const osVersionRef = useRef<TextBoxHandle>(null);
  const packagesRef = useRef<TextAreaHandle>(null);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const osName = String(osNameRef.current?.value || "");
    const osVersion = String(osVersionRef.current?.value || "");
    const packages = String(packagesRef.current?.value || "");

    const errors = {
      osName: nameValidator(osName),
      osVersion: versionValidator(osVersion),
      packages: packagesValidator(packages),
    };

    setFormErrors(errors);

    const hasErrors = Object.values(errors).some((error) => error !== "");
    if (hasErrors) {
      return;
    }

    const body = mapRequestBody(osName, osVersion, packages);

    await fetchData(AUDIT_URL, {
      method: "POST",
      body,
      headers: {
        "content-type": "application/json",
        "x-api-key": API_KEY,
      },
    });
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <fieldset className={styles.optionsContainer}>
            <FormField
              label="OS Name:"
              inputElement={<DropDownList data={OS_LIST} ref={osNameRef} />}
              error={formErrors.osName}
            />
            <FormField
              label="OS version:"
              inputElement={<TextBox ref={osVersionRef} />}
              error={formErrors.osVersion}
            />
            <FormField
              label="Packages:"
              inputElement={
                <TextArea ref={packagesRef} style={{ flexGrow: 1 }} />
              }
              error={formErrors.packages}
            />

            <Button type="submit" disabled={loading} themeColor="primary">
              {loading ? <Loader size="small" type="pulsing" /> : "Audit"}
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
