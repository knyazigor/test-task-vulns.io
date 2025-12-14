import { useCallback } from 'react';
import { useFetch } from './useFetch';
import type { AuditResult } from '../lib/types';
import { mapRequestBody } from '../lib/utils';
import { AUDIT_URL, API_KEY } from '../lib/constants';

export const useAuditSubmission = () => {
  const { data, loading, error, fetchData } = useFetch<AuditResult>();

  const submitAudit = useCallback(
    async (osName: string, osVersion: string, packages: string) => {
      const body = mapRequestBody(osName, osVersion, packages);

      await fetchData(AUDIT_URL, {
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': API_KEY,
        },
      });
    },
    [fetchData],
  );

  return {
    data,
    loading,
    error,
    submitAudit,
  };
};
