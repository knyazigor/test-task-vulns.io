import { Loader } from '@progress/kendo-react-indicators';
import { TextArea } from '@progress/kendo-react-inputs';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { PanelBar, PanelBarItem } from '@progress/kendo-react-layout';
import { Card, CardBody } from '@progress/kendo-react-layout';
import type { FC } from 'react';

import styles from './Result.module.css';
import type { AuditResult } from '../../lib/types';
import { StatusBadge } from './StatusBadge';

export interface ResultProps {
  loading: boolean;
  error: string | null;
  data: AuditResult | null;
}

export const Result: FC<ResultProps> = ({ data, loading, error }) => {
  if (loading) {
    return (
      <div className={styles.result}>
        <Loader
          size='medium'
          type={'pulsing'}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.result}>
        <Card>
          <CardBody>
            <div>Error: {error}</div>
          </CardBody>
        </Card>
      </div>
    );
  }

  if (!data) {
    return (
      <div className={styles.result}>
        <div style={{ textAlign: 'center' }}>No data to display</div>
      </div>
    );
  }

  return (
    <div className={styles.result}>
      <PanelBar>
        <PanelBarItem
          title='Audit status'
          expanded={true}
        >
          <div className={styles.auditBar}>
            <StatusBadge isVulnerable={data.isVulnerable} />
            <div className={styles.auditStateBarRecord}>
              <strong>Vulnerable packages found:</strong>
              {data.vulnerableObjects.length}
            </div>
          </div>
        </PanelBarItem>

        <PanelBarItem
          title='Vulnerable packages'
          expanded={true}
        >
          <div className={styles.auditBar}>
            {data.vulnerableObjects.length === 0 ? (
              <div>No vulnerable packages detected</div>
            ) : (
              <div style={{ maxHeight: '300px', overflow: 'auto' }}>
                <Grid
                  data={data.vulnerableObjects}
                  style={{ maxHeight: '300px' }}
                >
                  <GridColumn
                    field='name'
                    title='Package name'
                    width='200px'
                  />
                  <GridColumn
                    field='version'
                    title='Version'
                    width='120px'
                  />
                  <GridColumn
                    field='arch'
                    title='Architecture'
                    width='120px'
                  />
                  <GridColumn
                    field='vulns.length'
                    title='Vulnerabilities'
                    width='100px'
                  />
                </Grid>
              </div>
            )}
          </div>
        </PanelBarItem>

        <PanelBarItem
          title='Details (JSON)'
          expanded={false}
        >
          <div style={{ padding: '1rem' }}>
            <TextArea
              value={JSON.stringify(data, null, 2)}
              rows={10}
              readOnly
              style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}
            />
          </div>
        </PanelBarItem>
      </PanelBar>
    </div>
  );
};
