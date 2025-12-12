export interface Vulnerability {
  [key: string]: string;
}

export interface CumulativeData {
  metrics: string | null;
  vulns: string | null;
}

export interface AuditResult {
  isVulnerable: boolean;
  vulnerableObjects: Vulnerability[];
  cumulativeData: CumulativeData;
  IS_DEBUG_MODE: boolean;
  IS_CACHE_ENABLED: boolean;
}
