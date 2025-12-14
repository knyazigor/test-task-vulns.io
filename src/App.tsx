import styles from './App.module.css';
import { TextArea, TextBox } from '@progress/kendo-react-inputs';
import { Label } from '@progress/kendo-react-labels';
import { Button } from '@progress/kendo-react-buttons';
import { Loader } from '@progress/kendo-react-indicators';
import React from 'react';
import { OS_LIST } from './lib/constants';
import { useFormValidation } from './hooks/useFormValidation';
import { useAuditSubmission } from './hooks/useAuditSubmission';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { FormField, Result } from './components';

function App() {
  const { values, errors, updateField, validate } = useFormValidation();

  const { data, loading, error, submitAudit } = useAuditSubmission();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    await submitAudit(values.osName, values.osVersion, values.packages);
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <form
          onSubmit={handleSubmit}
          className={styles.form}
        >
          <fieldset className={styles.optionsContainer}>
            <FormField
              label='OS Name:'
              inputElement={
                <DropDownList
                  data={OS_LIST}
                  value={values.osName}
                  onChange={(e) => updateField('osName', e.target.value)}
                />
              }
              error={errors.osName}
            />
            <FormField
              label='OS version:'
              inputElement={
                <TextBox
                  value={values.osVersion}
                  onChange={(e) =>
                    updateField('osVersion', String(e.target.value ?? ''))
                  }
                />
              }
              error={errors.osVersion}
            />
            <FormField
              label='Packages:'
              inputElement={
                <TextArea
                  value={values.packages}
                  onChange={(e) =>
                    updateField('packages', e.target.value ?? '')
                  }
                  style={{ flexGrow: 1 }}
                  rows={6}
                />
              }
              error={errors.packages}
            />

            <Button
              type='submit'
              disabled={loading}
              themeColor='primary'
            >
              {loading ? (
                <Loader
                  size='small'
                  type='pulsing'
                />
              ) : (
                'Audit'
              )}
            </Button>
          </fieldset>

          <fieldset className={styles.resultContainer}>
            <Label>Audit Result</Label>
            <Result
              loading={loading}
              error={error}
              data={data}
            />
          </fieldset>
        </form>
      </div>
    </main>
  );
}

export default App;
