import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject, throttleTime } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationSubject = new Subject<any>();

  constructor(private toastr: ToastrService) {
    this.notificationSubject
      .pipe(throttleTime(2000))
      .subscribe((notification: any) => {
        this.showNotification(notification);
      });
  }

  showNotification(notification: any) {
    const { message, details, options, type } = notification;

    if (type == "success") {
      this.toastr.success(message, details, options);
    } else if (type == "error") {
      this.toastr.error(message, details, options);
    } else if (type == "info") {
      this.toastr.info(message, details, options);
    } else if (type == "warning") {
      this.toastr.warning(message, details, options);
    }
  }

  triggerNotification(notification: any) {
    this.notificationSubject.next(notification);
  }
}
