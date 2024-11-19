export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'not_started' | 'in_progress' | 'completed';
  priority?: 'low' | 'medium' | 'high';
  recurrence_interval?: 'daily' | 'weekly' | 'monthly' | null;
  due_date?: string;
  sprint_id?: string;
  createdAt: Date;
  updatedAt: Date;
}