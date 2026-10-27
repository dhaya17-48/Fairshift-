import {
  HazardCategory,
  HazardReport,
  HazardStatus,
  SectorConfig,
  SectorType,
  ShiftRecord,
  Worker,
} from '../types';
import { clientStore, SECTOR_CONFIGS } from './store';

async function safeFetchJson<T>(
  url: string,
  options?: RequestInit,
  fallbackFn?: () => T
): Promise<T> {
  try {
    const res = await fetch(url, options);
    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      const json = await res.json();
      if (json && json.data !== undefined) return json.data;
      if (json && json.success !== undefined) return json;
      return json as T;
    }
  } catch (err) {
    // Backend unavailable or Vercel static route returned HTML/404
  }

  if (fallbackFn) {
    return fallbackFn();
  }
  throw new Error(`Service request failed for ${url}`);
}

export const api = {
  async getSectors(): Promise<Record<SectorType, SectorConfig>> {
    return safeFetchJson(
      '/api/sectors',
      undefined,
      () => SECTOR_CONFIGS
    );
  },

  async getWorkers(sector: SectorType): Promise<Worker[]> {
    return safeFetchJson(
      `/api/workers?sector=${sector}`,
      undefined,
      () => clientStore.getWorkers(sector)
    );
  },

  async checkInWorker(id: string, sector: SectorType): Promise<Worker> {
    return safeFetchJson(
      `/api/workers/${id}/checkin`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sector }),
      },
      () => clientStore.checkInWorker(id, sector)
    );
  },

  async checkOutWorker(
    id: string,
    sector: SectorType,
    hours?: number
  ): Promise<{ worker: Worker; shift: ShiftRecord }> {
    try {
      const res = await fetch(`/api/workers/${id}/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sector, hours }),
      });
      const contentType = res.headers.get('content-type') || '';
      if (res.ok && contentType.includes('application/json')) {
        const json = await res.json();
        if (json.success) return { worker: json.data, shift: json.shift };
      }
    } catch {
      // fallback
    }
    return clientStore.checkOutWorker(id, sector, hours);
  },

  async addManualShift(
    id: string,
    sector: SectorType,
    hours: number,
    date?: string
  ): Promise<{ worker: Worker; shift: ShiftRecord }> {
    try {
      const res = await fetch(`/api/workers/${id}/shifts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sector, hours, date }),
      });
      const contentType = res.headers.get('content-type') || '';
      if (res.ok && contentType.includes('application/json')) {
        const json = await res.json();
        if (json.success) return { worker: json.data, shift: json.shift };
      }
    } catch {
      // fallback
    }
    return clientStore.addManualShift(id, sector, hours, date);
  },

  async getHazards(sector?: SectorType): Promise<HazardReport[]> {
    const url = sector ? `/api/hazards?sector=${sector}` : '/api/hazards';
    return safeFetchJson(
      url,
      undefined,
      () => clientStore.getHazards(sector)
    );
  },

  async createHazard(data: {
    sector: SectorType;
    category: HazardCategory;
    description: string;
    voiceTranscript?: string;
    isAnonymous: boolean;
    workerId?: string | null;
    reporterName: string;
    locationNote?: string;
  }): Promise<HazardReport> {
    return safeFetchJson(
      '/api/hazards',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      },
      () => clientStore.createHazard(data)
    );
  },

  async updateHazardStatus(
    id: string,
    status: HazardStatus
  ): Promise<HazardReport> {
    return safeFetchJson(
      `/api/hazards/${id}/status`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      },
      () => clientStore.updateHazardStatus(id, status)
    );
  },

  async verifyAdminPin(pin: string): Promise<boolean> {
    try {
      const res = await fetch('/api/admin/verify-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin }),
      });
      const contentType = res.headers.get('content-type') || '';
      if (res.ok && contentType.includes('application/json')) {
        const json = await res.json();
        return Boolean(json.authorized);
      }
    } catch {
      // fallback
    }
    return clientStore.verifyAdminPin(pin);
  },

  async resetData(): Promise<void> {
    try {
      await fetch('/api/reset', { method: 'POST' });
    } catch {
      // fallback
    }
    clientStore.resetStore();
  },
};
