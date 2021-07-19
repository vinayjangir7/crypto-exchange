import { Component, OnInit } from '@angular/core';
import { NotificationModel } from 'src/app/shared/models/notification.model';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  notifications: NotificationModel[] = [
    {
      heading: 'Joe liked your post',
      details: '',
      type: 'Like',
      icon: 'thumb_up',
      timeStamp: new Date(),
    },
    {
      heading: 'Smith commented on your post',
      details: '',
      type: 'Comment',
      icon: '3p',
      timeStamp: new Date(),
    },
    {
      heading: 'Marie shared your post',
      details: '',
      type: 'Share',
      icon: 'share',
      timeStamp: new Date(),
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
