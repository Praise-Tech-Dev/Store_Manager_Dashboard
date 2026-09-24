export interface SuspendUserPayload {
  id: number;
  reason: string;
  notifyUser: boolean;
  userName?: string;
}
