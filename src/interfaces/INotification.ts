export enum NotificationType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
}

export interface INotification {
  id: number;
  title: string;
  message: string;
  type: NotificationType;
}