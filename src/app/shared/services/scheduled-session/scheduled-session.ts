export interface ScheduledSession {
  id: number;
  // TODO: change it after implement end-point for this in API
  instructor: string;
  startDate: Date;
  endDate: Date;
}
