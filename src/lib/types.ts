// src/lib/types.ts

export interface VulnerableObject {
  name: string;
  version: string;
  arch: string;
  vulns: Array<{
    id: string;
    type: string;
    related: string[] | null;
    reason: string;
    affecteds: Array<{
      affectedId: string;
      source: string;
      reason: string;
    }>;
  }>;
  updates: Array<{
    to_version: string;
    for_versions: string[];
    source: string;
  }> | null;
  patches: unknown | null;
  exploits: unknown | null;
}

export interface AuditResult {
  isVulnerable: boolean;
  vulnerableObjects: VulnerableObject[];
  cumulativeData: {
    metrics: Array<{
      cvss: { score: string; vector: string } | null;
      cwe: Record<string, { id: string; name: string }> | null;
      source: string;
      severity: string;
    }> | null;
    vulns: Record<
      string,
      {
        id: string;
        type: string;
        title: string;
        description: string;
        date: { published: string; modified: string };
        metrics: unknown | null;
      }
    > | null;
  };
  IS_DEBUG_MODE: boolean;
  IS_CACHE_ENABLED: boolean;
}
