import type { FC } from 'react';
import type { AuditResult } from '../../lib/types';
import styles from './Result.module.css';

export interface StatusBadgeProps {
  isVulnerable: AuditResult['isVulnerable'];
}

export const StatusBadge: FC<StatusBadgeProps> = ({ isVulnerable }) => (
  <div className={styles.auditStateBarRecord}>
    <strong>Статус:</strong>
    <span
      className={`${styles.statusBadge} ${isVulnerable ? styles.isVulnerable : styles.isSecure}`}
    >
      {isVulnerable ? 'Уязвимый' : 'Безопасный'}
    </span>
  </div>
);
