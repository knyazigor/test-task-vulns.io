import type { FC } from 'react';
import type { AuditResult } from '../../lib/types';
import styles from './Result.module.css';

export interface StatusBadgeProps {
  isVulnerable: AuditResult['isVulnerable'];
}

export const StatusBadge: FC<StatusBadgeProps> = ({ isVulnerable }) => (
  <div className={styles.auditStateBarRecord}>
    <strong>Status:</strong>
    <span
      className={`${styles.statusBadge} ${isVulnerable ? styles.isVulnerable : styles.isSecure}`}
    >
      {isVulnerable ? 'Vulnerable' : 'Secure'}
    </span>
  </div>
);
