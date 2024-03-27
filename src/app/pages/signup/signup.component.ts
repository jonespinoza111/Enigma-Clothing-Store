import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NotificationService } from '../../notification.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private notificationService: NotificationService) { }

  triggerNotification() {
    this.notificationService.triggerNotification({ 
      message: 'Added to Cart', 
      details: 'Success', 
      options: { timeOut: 3000 },
      type: "success"
    });
  }
}
