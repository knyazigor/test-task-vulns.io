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
      <div
        className={styles.result}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Loader
          size='medium'
          type={'pulsing'}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={styles.result}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Card>
          <CardBody>
            <div>Ошибка: {error}</div>
          </CardBody>
        </Card>
      </div>
    );
  }

  if (!data) {
    return (
      <div
        className={styles.result}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          Заполните форму и нажмите "Audit"
        </div>
      </div>
    );
  }

  return (
    <div className={styles.result}>
      <PanelBar>
        <PanelBarItem
          title='Статус аудита'
          expanded={true}
        >
          <div className={styles.auditBar}>
            <StatusBadge isVulnerable={data.isVulnerable} />
            <div className={styles.auditStateBarRecord}>
              <strong>Найдено уязвимых пакетов:</strong>
              {data.vulnerableObjects.length}
            </div>
          </div>
        </PanelBarItem>

        <PanelBarItem
          title='Уязвимые пакеты'
          expanded={true}
        >
          <div className={styles.auditBar}>
            {data.vulnerableObjects.length === 0 ? (
              <div>Уязвимых пакетов не обнаружено</div>
            ) : (
              <div style={{ maxHeight: '300px', overflow: 'auto' }}>
                <Grid
                  data={data.vulnerableObjects}
                  style={{ maxHeight: '300px' }}
                >
                  <GridColumn
                    field='name'
                    title='Имя пакета'
                    width='200px'
                  />
                  <GridColumn
                    field='version'
                    title='Версия'
                    width='120px'
                  />
                  <GridColumn
                    field='arch'
                    title='Архитектура'
                    width='120px'
                  />
                  <GridColumn
                    field='vulns.length'
                    title='Уязвимости'
                    width='100px'
                  />
                </Grid>
              </div>
            )}
          </div>
        </PanelBarItem>

        <PanelBarItem
          title='Подробности (JSON)'
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
