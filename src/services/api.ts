import {
  HazardCategory,
  HazardReport,
  HazardStatus,
  SectorConfig,
  SectorType,
  ShiftRecord,
  Worker,
} from '../types';

export const api = {
  async getSectors(): Promise<Record<SectorType, SectorConfig>> {
    const res = await fetch('/api/sectors');
    const json = await res.json();
    return json.data;
  },

  async getWorkers(sector: SectorType): Promise<Worker[]> {
    const res = await fetch(`/api/workers?sector=${sector}`);
    const json = await res.json();
    return json.data;
  },

  async checkInWorker(id: string, sector: SectorType): Promise<Worker> {
    const res = await fetch(`/api/workers/${id}/checkin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sector }),
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to check in');
    return json.data;
  },

  async checkOutWorker(
    id: string,
    sector: SectorType,
    hours?: number
  ): Promise<{ worker: Worker; shift: ShiftRecord }> {
    const res = await fetch(`/api/workers/${id}/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sector, hours }),
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to check out');
    return { worker: json.data, shift: json.shift };
  },

  async addManualShift(
    id: string,
    sector: SectorType,
    hours: number,
    date?: string
  ): Promise<{ worker: Worker; shift: ShiftRecord }> {
    const res = await fetch(`/api/workers/${id}/shifts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sector, hours, date }),
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to log shift');
    return { worker: json.data, shift: json.shift };
  },

  async getHazards(sector?: SectorType): Promise<HazardReport[]> {
    const url = sector ? `/api/hazards?sector=${sector}` : '/api/hazards';
    const res = await fetch(url);
    const json = await res.json();
    return json.data;
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
    const res = await fetch('/api/hazards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to submit hazard');
    return json.data;
  },

  async updateHazardStatus(
    id: string,
    status: HazardStatus
  ): Promise<HazardReport> {
    const res = await fetch(`/api/hazards/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to update hazard status');
    return json.data;
  },

  async verifyAdminPin(pin: string): Promise<boolean> {
    const res = await fetch('/api/admin/verify-pin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin }),
    });
    const json = await res.json();
    return Boolean(json.authorized);
  },

  async resetData(): Promise<void> {
    await fetch('/api/reset', { method: 'POST' });
  },
};
