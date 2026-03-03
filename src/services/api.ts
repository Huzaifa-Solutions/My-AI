import type { MeetingAgenda } from '../types';

const API_BASE = '/api';

export async function fetchAgendas(): Promise<any[]> {
  const res = await fetch(`${API_BASE}/agendas`);
  if (!res.ok) throw new Error('Failed to fetch agendas');
  return res.json();
}

export async function saveAgenda(agenda: MeetingAgenda): Promise<{ id: number }> {
  const res = await fetch(`${API_BASE}/agendas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: agenda.title,
      date: agenda.date,
      data: agenda,
    }),
  });
  if (!res.ok) throw new Error('Failed to save agenda');
  return res.json();
}

export async function deleteAgenda(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/agendas/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete agenda');
}
