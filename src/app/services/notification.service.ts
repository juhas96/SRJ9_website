import { Injectable } from '@angular/core';
import {NzNotificationService} from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private notification: NzNotificationService) {
  }

  /**
   * @param type - Type of notification
   * @param title - Title of notification
   * @param content - Full message of notification
   * 'success' - Green message
   * 'info' - Blue message
   * 'warning' - Yellow message
   * 'error' - Red message
   */
  createNotification(type: string, title: string, content: string): void {
    this.notification.create(
        type,
        title,
        content
    );
  }
}
